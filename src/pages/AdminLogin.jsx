import { useEffect, useState } from "react";
import { isSupabaseConfigured, supabase } from "../lib/supabase";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [checking, setChecking] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [selected, setSelected] = useState(null);
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState("");

  const checkAdmin = async (user) => {
    if (!user || !supabase) {
      setIsAdmin(false);
      setChecking(false);
      return;
    }
    const { data, error: profileError } = await supabase
      .from("profiles")
      .select("role,full_name,email")
      .eq("id", user.id)
      .single();
    setChecking(false);
    if (profileError || data?.role !== "admin") {
      setError(
        "This account does not have administrator access. Please use the designated admin email.",
      );
      setIsAdmin(false);
      return;
    }
    setIsAdmin(true);
    setError("");
  };

  const loadConversations = async () => {
    if (!supabase) return;
    const { data, error: listError } = await supabase
      .from("conversations")
      .select("*, profiles!conversations_recruiter_id_fkey(full_name,email)")
      .order("last_message_at", { ascending: false });
    if (listError) setError(listError.message);
    else setConversations(data || []);
  };

  useEffect(() => {
    document.title = "Admin | Eruchi";
    if (!supabase) {
      setChecking(false);
      return undefined;
    }
    supabase.auth
      .getSession()
      .then(({ data }) => checkAdmin(data.session?.user));
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => checkAdmin(session?.user),
    );
    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (isAdmin) loadConversations();
  }, [isAdmin]);

  useEffect(() => {
    if (!selected || !supabase) return undefined;
    supabase
      .from("messages")
      .select("*")
      .eq("conversation_id", selected.id)
      .order("created_at", { ascending: true })
      .then(({ data, error: readError }) => {
        if (readError) setError(readError.message);
        else setMessages(data || []);
      });
    const channel = supabase
      .channel(`admin-chat-${selected.id}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${selected.id}`,
        },
        (payload) =>
          setMessages((current) =>
            current.some((item) => item.id === payload.new.id)
              ? current
              : [...current, payload.new],
          ),
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [selected]);

  const submit = async (event) => {
    event.preventDefault();
    setMessage("");
    setError("");
    if (!isSupabaseConfigured) {
      setError(
        "Supabase is not configured. Add the project URL and anon key first.",
      );
      return;
    }
    setBusy(true);
    const { error: authError } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        shouldCreateUser: false,
        emailRedirectTo: `${window.location.origin}/admin`,
      },
    });
    setBusy(false);
    if (authError) setError(authError.message);
    else
      setMessage(
        "If this email belongs to your existing admin account, a secure login link has been sent.",
      );
  };

  const sendReply = async (event) => {
    event.preventDefault();
    if (!selected || !draft.trim() || !supabase) return;
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { data, error: sendError } = await supabase
      .from("messages")
      .insert({
        conversation_id: selected.id,
        sender_id: user.id,
        content: draft.trim(),
      })
      .select()
      .single();
    if (sendError) setError(sendError.message);
    else {
      setMessages((current) => [...current, data]);
      setDraft("");
      loadConversations();
    }
  };

  if (checking)
    return (
      <main className="access-page">
        <p className="chat-loading">Checking administrator access…</p>
      </main>
    );

  if (isAdmin)
    return (
      <main className="admin-dashboard">
        <header className="admin-topbar">
          <a className="access-brand" href="/">
            &lt;<b>CodeBro</b>
            <span>/&gt;</span>
          </a>
          <div>
            ADMIN INBOX <span className="chat-secure-dot" />
          </div>
          <button onClick={(event) => {
            event.currentTarget.textContent = "Signing out...";
            supabase.auth.signOut();  
          }}>Sign out</button>
        </header>
        <div className="admin-workspace">
          <aside className="admin-inbox">
            <div className="admin-inbox-title">
              <div>
                <span>MESSAGES</span>
                <h1>Conversations</h1>
              </div>
              <button onClick={loadConversations}>↻</button>
            </div>
            {conversations.length === 0 && (
              <p className="admin-empty">
                No conversations yet. New recruiter messages will appear here.
              </p>
            )}
            {conversations.map((item) => (
              <button
                key={item.id}
                className={`admin-conversation ${selected?.id === item.id ? "selected" : ""}`}
                onClick={() => setSelected(item)}
              >
                <span className="chat-avatar">
                  {(item.profiles?.full_name || item.profiles?.email || "R")
                    .slice(0, 1)
                    .toUpperCase()}
                </span>
                <span>
                  <b>{item.profiles?.full_name || "Recruiter"}</b>
                  <small>{item.profiles?.email || "Email unavailable"}</small>
                  <small>{item.status || "open"}</small>
                </span>
              </button>
            ))}
          </aside>
          <section className="admin-chat-view">
            {selected ? (
              <>
                <div className="admin-chat-heading">
                  <div>
                    <span>RECRUITER CONVERSATION</span>
                    <h2>{selected.profiles?.full_name || "Recruiter"}</h2>
                    <p>{selected.profiles?.email}</p>
                  </div>
                  <span className="chat-status">
                    {selected.status || "OPEN"}
                  </span>
                </div>
                <div className="admin-chat-messages">
                  {messages.map((item) => (
                    <article
                      key={item.id}
                      className={`chat-message ${item.sender_id === selected.recruiter_id ? "theirs" : "mine"}`}
                    >
                      <p>{item.content}</p>
                      <time>{new Date(item.created_at).toLocaleString()}</time>
                    </article>
                  ))}
                </div>
                <form className="chat-composer" onSubmit={sendReply}>
                  <textarea
                    rows="2"
                    value={draft}
                    onChange={(event) => setDraft(event.target.value)}
                    placeholder="Write your reply…"
                  />
                  <button disabled={!draft.trim()}>Send reply ↗</button>
                </form>
              </>
            ) : (
              <div className="admin-empty-state">
                <span>✉</span>
                <h2>Your inbox, in one place.</h2>
                <p>Select a recruiter conversation to read and reply.</p>
              </div>
            )}
            {error && <p className="chat-inline-error">{error}</p>}
          </section>
        </div>
        <p className="chat-page-credit">
          Designed &amp; Developed by CodeBro Digital
        </p>
      </main>
    );

  return (
    <main className="access-page admin-access-page">
      <a className="access-brand" href="/">
        &lt;<b>CodeBro</b>
        <span>/&gt;</span>
      </a>
      <section className="access-card admin-access-card">
        <div className="access-kicker">PRIVATE ADMIN AREA</div>
        <h1>
          Welcome
          <br />
          <em>back.</em>
        </h1>
        <p className="access-intro">
          Administrator sign-in for managing recruiter conversations. This area
          is not available to visitors.
        </p>
        <form className="access-form" onSubmit={submit}>
          <label>
            Administrator email
            <input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Your admin email"
              required
            />
          </label>
          <button className="access-submit" disabled={busy}>
            {busy ? "Sending secure link…" : "Send admin login link"}
            <span>↗</span>
          </button>
        </form>
        {message && (
          <p className="form-notice success" role="status">
            {message}
          </p>
        )}
        {error && (
          <p className="form-notice error" role="alert">
            {error}
          </p>
        )}
        <p className="access-privacy">
          Admin privileges are checked against the role stored in the database.
          Knowing an email address alone does not grant access.
        </p>
      </section>
      <div className="access-bottom">
        <a href="/">← Back to portfolio</a>
        <span>CodeBro Digital</span>
      </div>
    </main>
  );
}

export default AdminLogin;

