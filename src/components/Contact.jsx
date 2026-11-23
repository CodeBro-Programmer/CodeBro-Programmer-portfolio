const whatsappNumber = "2348136308576";
const whatsappMessage = encodeURIComponent("Hello Eruchi, I found your portfolio and would like to get in touch.");

function Contact() {
  return (
    <section className="contact section" id="contact">
      <div className="section-title">
        <span>GET IN TOUCH</span>
        <h2>Choose how you'd like to connect.</h2>
        <p className="contact-section-intro">Whether you prefer a quick WhatsApp message or a conversation right here on my website, there's a way to reach me.</p>
      </div>
      <div className="contact-options">
        <article className="contact-option whatsapp-option">
          <div className="contact-option-icon" aria-hidden="true">↗</div>
          <span className="contact-option-kicker">EXTERNAL MESSAGING</span>
          <h3>Chat on WhatsApp</h3>
          <p>This option takes you out of this portfolio and opens a direct WhatsApp conversation with me. It's best for quick messages.</p>
          <a className="primary-btn whatsapp-button" href={`https://wa.me/2348136308576?text=${whatsappMessage}`}
  target="_blank"
  rel="noopener noreferrer"
>
  Continue to WhatsApp <span>↗</span>
</a>
<small>You'll continue in the WhatsApp app or website.</small>
          <small>You'll continue in the WhatsApp app or website.</small>
        </article>
        <article className="contact-option onsite-option">
          <div className="contact-option-icon chat-icon" aria-hidden="true">•••</div>
          <span className="contact-option-kicker">BUILT-IN WEBSITE CHAT</span>
          <h3>Chat with me here</h3>
          <p>Start a private conversation without leaving my portfolio. Create an account with your name and email, or sign in with your existing email to continue.</p>
          <a className="primary-btn onsite-chat-button" href="/chat">Start an on-site chat <span>↗</span></a>
          <small>Your conversation stays connected to this website.</small>
        </article>
      </div>
    </section>
  );
}

export default Contact;
