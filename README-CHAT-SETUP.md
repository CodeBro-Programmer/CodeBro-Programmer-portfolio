# Recruiter chat setup

The portfolio now contains the recruiter-facing `/chat` entry, magic-link authentication, a persistent one-to-one conversation view, and a separate `/admin` sign-in/inbox route. Supabase must be configured before the chat can be used in production.

## 1. Install dependencies

```bash
npm install
```

The project uses `@supabase/supabase-js`. If your package manager reports a stale lockfile, run `npm install` to refresh `package-lock.json`.

## 2. Create a Supabase project

Create a project in Supabase, then copy the Project URL and the publishable/anon key. Create `.env` in the project root using `.env.example`:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_PUBLISHABLE_OR_ANON_KEY
```

Only the publishable/anon key belongs in the browser. Never put the `service_role` key in a Vite environment variable or frontend file.

## 3. Create the database

Open Supabase Dashboard → SQL Editor and run `supabase/schema.sql`.

The schema creates profiles, conversations and messages, enables Row Level Security, and installs the profile and conversation timestamp triggers. It also enables Realtime for messages.

## 4. Configure email authentication

In Supabase Dashboard → Authentication → URL Configuration:

- Set the Site URL to your deployed portfolio origin.
- Add `https://YOUR_DOMAIN/chat` and `https://YOUR_DOMAIN/admin` to Redirect URLs.
- Configure SMTP for reliable production delivery. Supabase's built-in email sender is intended for testing and has sending restrictions.
- Use an email template that clearly identifies the secure sign-in link.

The recruiter can create an account using name + email or sign in using email only. Supabase sends a one-time magic link; the email must be verified before the chat is accessible.

## 5. Promote your own account to admin

First, create your own account through `/chat` using the email you intend to administer the inbox with. Verify the email. Then run this SQL in Supabase SQL Editor, replacing the email with your exact account email:

```sql
update public.profiles
set role = 'admin'
where lower(email) = lower('YOUR_ADMIN_EMAIL@example.com');
```

Now visit `/admin` and request an admin magic link using that same email. The admin page checks the `profiles.role` value after authentication. Recruiters cannot promote themselves because there is deliberately no client-side profile update policy.

## 6. Test before launch

1. Create a recruiter account with a test email and verify the link.
2. Send a message from `/chat`.
3. Sign in at `/admin` with the promoted admin email.
4. Confirm the conversation appears and reply from the inbox.
5. Sign back into the recruiter account and confirm the reply appears in the same conversation.
6. Test with a second recruiter account and confirm it cannot read the first recruiter's messages.

## Notes

- `/chat` is the built-in website messaging route; the WhatsApp contact remains a separate external route.
- `/admin` is the private admin entry. Knowing its URL is not sufficient to gain access; the authenticated profile must have `role = 'admin'`.
- This implementation uses one persistent conversation per recruiter email/account.
- Email notifications when you are offline are not configured yet. They should be added with a server-side Edge Function and an email provider; do not send privileged email-provider credentials from the browser.
