import { useCallback, useEffect, useRef, useState } from "react";
import { isSupabaseConfigured, supabase } from "../lib/supabase";

function ChatAccess() {
  const [mode, setMode] = useState("signup");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [user, setUser] = useState(null);
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState("");
  const [loadingChat, setLoadingChat] = useState(false);
  const bottomRef = useRef(null);

  const loadConversation = useCallback(async (activeUser) => {
    if (!activeUser || !supabase) return;
    setLoadingChat(true);
    let { data: existing, error: fetchError } = await supabase
      .from("conversations")
      .select("*")
      .eq("recruiter_id", activeUser.id)
      .maybeSingle();
    if (fetchError) {
      setError(fetchError.message);
      setLoadingChat(false);
      return;
    }
    if (!existing) {
      const { data: created, error: createError } = await supabase
        .from("conversations")
        .insert({ recruiter_id: activeUser.id })
        .select()
        .single();
      if (createError) {
        const retry = await supabase
          .from("conversations")
          .select("*")
          .eq("recruiter_id", activeUser.id)
          .maybeSingle();
        if (retry.error || !retry.data) setError(createError.message);
        existing = retry.data;
      } else existing = created;
    }
    setConversation(existing || null);
    if (existing) {
      const { data, error: messagesError } = await supabase
        .from("messages")
        .select("*")
        .eq("conversation_id", existing.id)
        .order("created_at", { ascending: true });
      if (messagesError) setError(messagesError.message);
      else setMessages(data || []);
    }
    setLoadingChat(false);
  }, []);

  useEffect(() => {
    document.title = "On-site Chat | CodeBro";
    if (!supabase) return undefined;
    supabase.auth.getSession().then(({ data }) => {
      if (data.session?.user) {
        setUser(data.session.user);
        loadConversation(data.session.user);
      }
    });
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        const activeUser = session?.user || null;
        setUser(activeUser);
        if (activeUser) loadConversation(activeUser);
        else {
          setConversation(null);
          setMessages([]);
        }
      },
    );
    return () => listener.subscription.unsubscribe();
  }, [loadConversation]);

  useEffect(() => {
    if (!conversation || !supabase) return undefined;
    const channel = supabase
      .channel(`recruiter-chat-${conversation.id}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${conversation.id}`,
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
  }, [conversation]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const submitAuth = async (event) => {
    event.preventDefault();
    setError("");
    setNotice("");
    if (!isSupabaseConfigured) {
      setError(
        "Chat is not connected yet. Add your Supabase project URL and anon key to the environment file.",
      );
      return;
    }
    if (mode === "signup" && !name.trim()) {
      setError("Please enter your name.");
      return;
    }
    setBusy(true);
    const { error: authError } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        shouldCreateUser: mode === "signup",
        ...(mode === "signup"
          ? { data: { full_name: name.trim(), role: "recruiter" } }
          : {}),
        emailRedirectTo: `${window.location.origin}/chat`,
      },
    });
    setBusy(false);
    if (authError) setError(authError.message);
    else
      setNotice(
        `A secure sign-in link has been sent to ${email.trim()}. Open it to enter your private on-site conversation.`,
      );
  };

  const sendMessage = async (event) => {
    event.preventDefault();
    const content = draft.trim();
    if (!content || !conversation || !user || !supabase) return;
    setBusy(true);
    const { data, error: sendError } = await supabase
      .from("messages")
      .insert({ conversation_id: conversation.id, sender_id: user.id, content })
      .select()
      .single();
    setBusy(false);
    if (sendError) setError(sendError.message);
    else {
      setMessages((current) =>
        current.some((item) => item.id === data.id)
          ? current
          : [...current, data],
      );
      setDraft("");
    }
  };

  const signOut = async (event) => {
    event.currentTarget.textContent = "signing out...";
    await supabase?.auth.signOut();

    setUser(null);
    setConversation(null);
    setMessages([]);
  };

  if (user)
    return (
      <main className="chat-app-page">
        <header className="chat-app-header">
          <a className="access-brand" href="/">
            &lt;<b>CodeBro</b>
            <span>/&gt;</span>
          </a>
          <button onClick={signOut} className="chat-signout">
            Sign out
          </button>
        </header>

        <section className="chat-panel">

          <div className="chat-panel-heading">
            <div className="chat-panner-heading-inner">
              <span className="chat-avatar">C</span>
            <div>
              <h1>Conversation with CodeBro(Eruchi)</h1>
              <p>Send a message directly through this website.</p>
              <p>Private Conversation.</p>
            </div>
            </div>
            <span className="chat-status">ON-SITE CHAT</span>
          </div>

          <div className="chat-messages" aria-live="polite">
            <div className="chat-welcome">
              <span>WELCOME</span>
              <p>
                Thanks for reaching out. Introduce yourself and let me know what
                you'd like to discuss. I'll reply here.
              </p>
            </div>

            {loadingChat && (
              <p className="chat-loading">Preparing your conversation…</p>
            )}
            {messages.map((message) => (
              <div
                key={message.id}
                className={`chat-message ${message.sender_id === user.id ? "mine" : "theirs"}`}
              >
                <p>{message.content}</p>
                <time>{new Date(message.created_at).toLocaleString()}</time>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
          {error && <p className="chat-inline-error">{error}</p>}
          <form className="chat-composer" onSubmit={sendMessage}>
            <textarea
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Write your message…"
              rows="2"
            />
            <button disabled={busy || !draft.trim()}>
              {busy ? "Sending…" : "Send message"}
              <span>↗</span>
            </button>
          </form>
          <p className="chat-footnote">
            Your conversation is private and remains available when you sign in
            again.
          </p>
        </section>
        <footer className="chat-page-credit">
          Designed &amp; Developed by CodeBro Digital
        </footer>
      </main>
    );

  return (
    <main className="access-page">
      <div className="access-backdrop" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <a className="access-brand" href="/">
        &lt;<b>CodeBro</b>
        <span>/&gt;</span>
      </a>
      <section className="access-card">
        <div className="access-kicker">
          <span className="live-indicator" /> PRIVATE ON-SITE MESSAGING
        </div>
        <h1>
          Let's have a<br />
          <em>conversation.</em>
        </h1>
        <p className="access-intro">
          This is my website's built-in chat. Message me here without leaving
          the portfolio or switching to another messaging app.
        </p>
        <div
          className="access-tabs"
          role="tablist"
          aria-label="Choose account action"
        >
          <button
            type="button"
            className={mode === "signup" ? "active" : ""}
            onClick={() => {
              setMode("signup");
              setError("");
              setNotice("");
            }}
          >
            Create an account
          </button>
          <button
            type="button"
            className={mode === "login" ? "active" : ""}
            onClick={() => {
              setMode("login");
              setError("");
              setNotice("");
            }}
          >
            I have an account
          </button>
        </div>
        <form className="access-form" onSubmit={submitAuth}>
          {mode === "signup" && (
            <label>
              Your name
              <input
                autoComplete="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="How should I address you?"
                required
              />
            </label>
          )}
          <label>
            Email address
            <input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@company.com"
              required
            />
          </label>
          <button className="access-submit" type="submit" disabled={busy}>
            {busy ? "Sending secure link…" : "Continue to on-site chat"}
            <span>↗</span>
          </button>
        </form>
        {notice && (
          <p className="form-notice success" role="status">
            {notice}
          </p>
        )}
        {error && (
          <p className="form-notice error" role="alert">
            {error}
          </p>
        )}
        <p className="access-privacy">
          No password to remember. Your email is verified before access, and
          your conversation is kept private.
        </p>
      </section>
      <div className="access-bottom">
        <a href="/">← Back to portfolio</a>
        <span>Designed &amp; Developed by CodeBro Digital</span>
      </div>
    </main>
  );
}

export default ChatAccess;
