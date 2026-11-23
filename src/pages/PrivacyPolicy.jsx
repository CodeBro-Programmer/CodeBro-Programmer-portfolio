import React from "react";
import "./LegalPages.css";

const PrivacyPolicy = () => {
  const sections = [
    { id: "introduction", title: "Introduction" },
    { id: "information", title: "Information We Collect" },
    { id: "usage", title: "How We Use Your Information" },
    { id: "authentication", title: "Account & Authentication" },
    { id: "messaging", title: "Private Messaging" },
    { id: "sharing", title: "Data Sharing & Third Parties" },
    { id: "security", title: "Data Security" },
    { id: "retention", title: "Data Retention" },
    { id: "rights", title: "Your Privacy Rights" },
    { id: "children", title: "Children's Privacy" },
    { id: "changes", title: "Changes to This Policy" },
    { id: "contact", title: "Contact" },
  ];

  return (
    <main className="legal-page">
      <header className="legal-header">
        <a href="/" className="legal-brand">
          &lt;<b>CodeBro</b><span>/&gt;</span>
        </a>

        <a href="/" className="legal-back">
          ← Back to portfolio
        </a>
      </header>

      <section className="legal-hero">
        <span className="legal-eyebrow">LEGAL / PRIVACY</span>
        <h1>Privacy <em>Policy.</em></h1>
        <p>
          Your privacy matters. This policy explains what information we
          collect, why we collect it, and how it is handled when you use
          this website.
        </p>

        <div className="legal-updated">
          <span>LAST UPDATED</span>
          <strong>22 November 2026</strong>
        </div>
      </section>

      <div className="legal-layout">
        <aside className="legal-sidebar">
          <span className="legal-sidebar-title">ON THIS PAGE</span>

          <nav>
            {sections.map((section) => (
              <a key={section.id} href={`#${section.id}`}>
                {section.title}
              </a>
            ))}
          </nav>
        </aside>

        <article className="legal-content">
          <section id="introduction">
            <span className="legal-number">01</span>
            <h2>Introduction</h2>

            <p>
              Welcome to the CodeBro Digital portfolio website. This website
              provides information about my development work, projects,
              services, and a built-in messaging feature that allows visitors
              and recruiters to communicate with me.
            </p>

            <p>
              This Privacy Policy explains how personal information is
              collected, used, stored, and protected when you visit the
              website or create an account to use its messaging feature.
            </p>

            <p>
              By using the website, you acknowledge that you have read
              this policy. Where consent is required by applicable law,
              it will be requested separately.
            </p>
          </section>

          <section id="information">
            <span className="legal-number">02</span>
            <h2>Information We Collect</h2>

            <p>
              The information we collect depends on how you interact
              with the website.
            </p>

            <h3>Information you provide</h3>
            <ul>
              <li>Your name when creating a messaging account.</li>
              <li>Your email address for account verification and access.</li>
              <li>Messages and other content you voluntarily send through
                the built-in chat.</li>
              <li>Any information you voluntarily provide when contacting me.</li>
            </ul>

            <h3>Technical information</h3>
            <p>
              When you visit the website, certain technical information
              may be processed by the website hosting and infrastructure
              providers. This may include your IP address, browser type,
              device information, and basic request information needed
              to deliver and secure the website.
            </p>
          </section>

          <section id="usage">
            <span className="legal-number">03</span>
            <h2>How We Use Your Information</h2>

            <p>Your information may be used to:</p>

            <ul>
              <li>Create and manage your messaging account.</li>
              <li>Verify your email address and authenticate your identity.</li>
              <li>Allow you to send and receive messages through the website.</li>
              <li>Respond to enquiries, recruitment discussions, and other
                messages.</li>
              <li>Maintain website functionality and security.</li>
              <li>Investigate abuse, suspicious activity, or technical problems.</li>
              <li>Comply with applicable legal obligations.</li>
            </ul>

            <p>
              Your information is not intentionally collected for sale
              to third parties.
            </p>
          </section>

          <section id="authentication">
            <span className="legal-number">04</span>
            <h2>Account & Authentication</h2>

            <p>
              The built-in messaging feature uses passwordless email
              authentication. When you register or sign in, you provide
              your email address and may receive a secure authentication
              link.
            </p>

            <p>
              Your email address is used to verify access to your account.
              You are responsible for keeping access to your email account
              secure and for not sharing authentication links with others.
            </p>

            <p>
              You should not attempt to access another person's account
              or use another person's identity.
            </p>
          </section>

          <section id="messaging">
            <span className="legal-number">05</span>
            <h2>Private Messaging</h2>

            <p>
              The website includes a messaging feature that allows registered
              users to communicate with the website owner.
            </p>

            <p>
              Messages you send may be stored in the website's database
              so that conversations can be retrieved when you sign in
              again.
            </p>

            <p>
              Messages are intended for communication between you and
              the website owner. They are not intended to be publicly
              displayed.
            </p>

            <p>
              Please avoid sending passwords, payment card information,
              government identification numbers, or other highly sensitive
              information through the chat.
            </p>

            <p>
              The messaging feature should not be treated as an end-to-end
              encrypted communication service. Access to stored messages
              may be necessary for the operation, maintenance, and security
              of the service.
            </p>
          </section>

          <section id="sharing">
            <span className="legal-number">06</span>
            <h2>Data Sharing & Third Parties</h2>

            <p>
              The website relies on third-party infrastructure providers
              to operate certain features. These providers may process
              information as necessary to provide their services.
            </p>

            <h3>Supabase</h3>
            <p>
              Supabase provides services used for authentication, database
              storage, and realtime messaging functionality. Account
              information and chat messages may be processed through
              Supabase infrastructure.
            </p>

            <h3>Vercel</h3>
            <p>
              Vercel hosts the portfolio website and may process technical
              information necessary to deliver, monitor, and secure
              website requests.
            </p>

            <h3>Email delivery providers</h3>
            <p>
              An email delivery provider may process your email address
              and related delivery information to send authentication
              messages.
            </p>

            <p>
              We do not sell your personal information. Information may
              also be disclosed where required by law or where reasonably
              necessary to protect the website, its users, or legal rights.
            </p>

            <p>
              These providers may process information in countries outside
              Nigeria, depending on their infrastructure and service
              configuration. Where applicable, such processing and transfers
              are subject to relevant data-protection requirements.
            </p>
          </section>

          <section id="security">
            <span className="legal-number">07</span>
            <h2>Data Security</h2>

            <p>
              Reasonable technical and organisational measures are used
              to protect information against unauthorised access, loss,
              misuse, alteration, or disclosure.
            </p>

            <p>
              However, no internet-based service or electronic storage
              system can be guaranteed to be completely secure. You
              should use the website with this limitation in mind.
            </p>
          </section>

          <section id="retention">
            <span className="legal-number">08</span>
            <h2>Data Retention</h2>

            <p>
              Personal information may be retained for as long as reasonably
              necessary to provide the messaging service, maintain account
              records, respond to enquiries, resolve disputes, maintain
              security, and comply with applicable legal obligations.
            </p>

            <p>
              Retention periods may vary depending on the type of
              information and the reason it was collected.
            </p>

            <p>
              You may contact me to request the deletion of your account
              or personal information. Some information may need to be
              retained where required or permitted by law.
            </p>
          </section>

          <section id="rights">
            <span className="legal-number">09</span>
            <h2>Your Privacy Rights</h2>

            <p>
              Subject to applicable data-protection laws, including the
              Nigeria Data Protection Act 2023, you may have the right to:
            </p>

            <ul>
              <li>Request access to personal information held about you.</li>
              <li>Request correction of inaccurate or incomplete information.</li>
              <li>Request deletion of your personal information where applicable.</li>
              <li>Object to certain forms of processing.</li>
              <li>Request restriction of processing in certain circumstances.</li>
              <li>Request a copy of your information where data portability applies.</li>
              <li>Withdraw consent where processing is based on consent.</li>
              <li>Lodge a complaint with the relevant data-protection authority.</li>
            </ul>

            <p>
              To exercise a privacy right, use the contact options available
              on the portfolio website. A request may require reasonable
              identity verification before action is taken.
            </p>
          </section>

          <section id="children">
            <span className="legal-number">10</span>
            <h2>Children's Privacy</h2>

            <p>
              This website and its messaging feature are not designed
              specifically for children. If you believe a child has
              provided personal information without appropriate
              authorisation, please contact me so the matter can be reviewed.
            </p>
          </section>

          <section id="changes">
            <span className="legal-number">11</span>
            <h2>Changes to This Policy</h2>

            <p>
              This Privacy Policy may be updated when website features,
              data practices, or legal requirements change. The latest
              version will be published on this page with an updated
              revision date.
            </p>

            <p>
              You are encouraged to review this page periodically.
            </p>
          </section>

          <section id="contact">
            <span className="legal-number">12</span>
            <h2>Contact</h2>

            <p>
              If you have questions about this Privacy Policy, how your
              information is handled, or wish to exercise your privacy
              rights, please contact me through the contact section
              of the portfolio website.
            </p>

            <a href="/#contact" className="legal-contact-link">
              Contact CodeBro Digital <span>↗</span>
            </a>
          </section>

          <div className="legal-end">
            <span>YOUR PRIVACY MATTERS.</span>
            <p>Designed &amp; Developed by CodeBro Digital</p>
          </div>
        </article>
      </div>
    </main>
  );
};

export default PrivacyPolicy;