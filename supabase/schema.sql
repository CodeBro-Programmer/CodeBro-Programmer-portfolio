-- CodeBro portfolio recruiter chat
-- Run this in Supabase SQL Editor before enabling public chat.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default '',
  email text not null,
  role text not null default 'recruiter' check (role in ('recruiter', 'admin')),
  created_at timestamptz not null default now()
);

create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  recruiter_id uuid not null unique references public.profiles(id) on delete cascade,
  status text not null default 'open' check (status in ('open', 'archived')),
  created_at timestamptz not null default now(),
  last_message_at timestamptz not null default now()
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  sender_id uuid not null references public.profiles(id) on delete cascade,
  content text not null check (char_length(content) between 1 and 5000),
  created_at timestamptz not null default now()
);

create index if not exists messages_conversation_created_idx on public.messages(conversation_id, created_at);
create index if not exists conversations_last_message_idx on public.conversations(last_message_at desc);

create or replace function public.handle_new_portfolio_user()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email, role)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', ''), new.email, 'recruiter')
  on conflict (id) do update set email = excluded.email;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created_portfolio on auth.users;
create trigger on_auth_user_created_portfolio
after insert on auth.users
for each row execute procedure public.handle_new_portfolio_user();

-- Backfill profiles for any Auth users that existed before this trigger was installed.
insert into public.profiles (id, full_name, email, role)
select id, coalesce(raw_user_meta_data->>'full_name', ''), email, 'recruiter'
from auth.users
on conflict (id) do update set email = excluded.email;

create or replace function public.is_portfolio_admin()
returns boolean language sql stable security definer set search_path = public
as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin');
$$;

create or replace function public.touch_conversation_on_message()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  update public.conversations set last_message_at = new.created_at where id = new.conversation_id;
  return new;
end;
$$;

drop trigger if exists on_portfolio_message_created on public.messages;
create trigger on_portfolio_message_created
after insert on public.messages
for each row execute procedure public.touch_conversation_on_message();

alter table public.profiles enable row level security;
alter table public.conversations enable row level security;
alter table public.messages enable row level security;

drop policy if exists "Read own profile or admin" on public.profiles;
create policy "Read own profile or admin" on public.profiles for select to authenticated
using (id = auth.uid() or public.is_portfolio_admin());

-- Intentionally no client-side UPDATE policy on profiles: users cannot promote themselves to admin.

drop policy if exists "Recruiter reads own conversation or admin reads all" on public.conversations;
create policy "Recruiter reads own conversation or admin reads all" on public.conversations for select to authenticated
using (recruiter_id = auth.uid() or public.is_portfolio_admin());

drop policy if exists "Recruiter creates own conversation" on public.conversations;
create policy "Recruiter creates own conversation" on public.conversations for insert to authenticated
with check (recruiter_id = auth.uid());

drop policy if exists "Admin updates conversation" on public.conversations;
create policy "Admin updates conversation" on public.conversations for update to authenticated
using (public.is_portfolio_admin()) with check (public.is_portfolio_admin());

drop policy if exists "Conversation participants read messages" on public.messages;
create policy "Conversation participants read messages" on public.messages for select to authenticated
using (public.is_portfolio_admin() or exists (
  select 1 from public.conversations c where c.id = conversation_id and c.recruiter_id = auth.uid()
));

drop policy if exists "Conversation participants send messages" on public.messages;
create policy "Conversation participants send messages" on public.messages for insert to authenticated
with check (sender_id = auth.uid() and (public.is_portfolio_admin() or exists (
  select 1 from public.conversations c where c.id = conversation_id and c.recruiter_id = auth.uid()
)));

-- Enable Realtime for live message updates. If already published, skip the duplicate-table error.
alter publication supabase_realtime add table public.messages;
