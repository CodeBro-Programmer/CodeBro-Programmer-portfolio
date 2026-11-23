import React from "react";
import "./LegalPages.css";

const TermsOfService = () => {
  const sections = [
    ["acceptance", "Acceptance of Terms"],
    ["website", "About This Website"],
    ["accounts", "User Accounts"],
    ["messaging", "Messaging Feature"],
    ["conduct", "Acceptable Use"],
    ["content", "User Content"],
    ["intellectual", "Intellectual Property"],
    ["third-party", "Third-Party Services"],
    ["availability", "Availability"],
    ["liability", "Limitation of Liability"],
    ["termination", "Suspension & Termination"],
    ["changes", "Changes to These Terms"],
    ["contact", "Contact"],
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
        <span className="legal-eyebrow">LEGAL / TERMS</span>

        <h1>
          Terms of <em>Service.</em>
        </h1>

        <p>
          These terms explain the rules and conditions that apply when
          you visit this website, create an account, or use its messaging
          functionality.
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
            {sections.map(([id, title]) => (
              <a key={id} href={`#${id}`}>
                {title}
              </a>
            ))}
          </nav>
        </aside>

        <article className="legal-content">

          <section id="acceptance">
            <span className="legal-number">01</span>
            <h2>Acceptance of Terms</h2>

            <p>
              Welcome to the CodeBro Digital portfolio website. By accessing
              or using this website, you agree to comply with these Terms
              of Service and our Privacy Policy.
            </p>

            <p>
              If you do not agree with these terms, you should discontinue
              using the website and its messaging features.
            </p>
          </section>

          <section id="website">
            <span className="legal-number">02</span>
            <h2>About This Website</h2>

            <p>
              This website serves as a personal portfolio and professional
              platform for showcasing development projects, skills,
              services, and relevant professional information.
            </p>

            <p>
              It also provides a built-in messaging feature through which
              visitors, recruiters, clients, and other interested persons
              may communicate with the website owner.
            </p>
          </section>

          <section id="accounts">
            <span className="legal-number">03</span>
            <h2>User Accounts</h2>

            <p>
              Certain features, including the built-in messaging service,
              require you to create an account.
            </p>

            <p>When creating an account, you agree to:</p>

            <ul>
              <li>Provide accurate and truthful information.</li>
              <li>Use an email address that you are authorised to access.</li>
              <li>Keep your authentication links and account access secure.</li>
              <li>Use only your own account.</li>
              <li>Notify the website owner if you suspect unauthorised
                access to your account.</li>
            </ul>

            <p>
              The website uses passwordless email authentication.
              You may receive a secure link to verify your email address
              and access your account.
            </p>
          </section>

          <section id="messaging">
            <span className="legal-number">04</span>
            <h2>Messaging Feature</h2>

            <p>
              The built-in messaging feature allows registered users
              to communicate directly with the website owner.
            </p>

            <p>
              You agree to use this feature for legitimate communication,
              including professional enquiries, recruitment discussions,
              project enquiries, and other appropriate conversations.
            </p>

            <p>
              Messages may be stored so that conversations can remain
              available when you sign in again.
            </p>

            <p>
              The messaging feature is not guaranteed to be continuously
              available and may occasionally experience interruptions
              or technical limitations.
            </p>
          </section>

          <section id="conduct">
            <span className="legal-number">05</span>
            <h2>Acceptable Use</h2>

            <p>You agree not to use this website to:</p>

            <ul>
              <li>Harass, threaten, abuse, or intimidate another person.</li>
              <li>Send spam, unsolicited advertisements, or misleading messages.</li>
              <li>Impersonate another person or misrepresent your identity.</li>
              <li>Distribute malicious software, harmful links, or malicious code.</li>
              <li>Attempt to gain unauthorised access to accounts, systems,
                or data.</li>
              <li>Interfere with the operation, security, or availability
                of the website.</li>
              <li>Use the website for unlawful activities.</li>
              <li>Submit content that infringes another person's rights.</li>
            </ul>

            <p>
              Activities that compromise the security or proper operation
              of the website may result in restricted access or account
              suspension.
            </p>
          </section>

          <section id="content">
            <span className="legal-number">06</span>
            <h2>User Content</h2>

            <p>
              You remain responsible for the messages and other content
              you submit through the website.
            </p>

            <p>
              By submitting content, you confirm that you have the right
              to share it and that doing so does not violate applicable
              laws or another person's rights.
            </p>

            <p>
              You grant the website owner permission to receive, store,
              and display your submitted content as necessary to operate
              the messaging feature and respond to your communication.
            </p>

            <p>
              You should not submit passwords, financial credentials,
              government identification numbers, or other highly sensitive
              information through the messaging feature.
            </p>
          </section>

          <section id="intellectual">
            <span className="legal-number">07</span>
            <h2>Intellectual Property</h2>

            <p>
              Unless otherwise stated, the website's original design,
              branding, written content, graphics, and other materials
              are owned by or used with permission by CodeBro Digital.
            </p>

            <p>
              You may view and use the website for personal and professional
              reference. You must not reproduce, redistribute, modify,
              or commercially exploit website materials without
              appropriate permission.
            </p>

            <p>
              Third-party names, trademarks, technologies, and project
              materials remain the property of their respective owners.
            </p>
          </section>

          <section id="third-party">
            <span className="legal-number">08</span>
            <h2>Third-Party Services</h2>

            <p>
              Some website features rely on external service providers,
              including hosting, authentication, database, realtime
              communication, and email delivery services.
            </p>

            <p>
              These services may have their own terms, privacy policies,
              technical requirements, and availability limitations.
            </p>

            <p>
              The website owner is not responsible for independent
              interruptions or changes made by third-party providers,
              subject to applicable law.
            </p>
          </section>

          <section id="availability">
            <span className="legal-number">09</span>
            <h2>Availability & Changes</h2>

            <p>
              The website is provided on an availability basis.
              Continuous, uninterrupted, or error-free operation
              is not guaranteed.
            </p>

            <p>
              Features, content, services, and functionality may be
              modified, suspended, or discontinued when necessary.
            </p>
          </section>

          <section id="liability">
            <span className="legal-number">10</span>
            <h2>Limitation of Liability</h2>

            <p>
              To the extent permitted by applicable law, the website
              is provided without guarantees that it will always be
              available, secure, accurate, or free from errors.
            </p>

            <p>
              The website owner will not be liable for indirect or
              consequential losses arising from the use of, or inability
              to use, the website, except where such liability cannot
              lawfully be excluded.
            </p>

            <p>
              Nothing in these terms excludes rights or protections
              that cannot legally be excluded under applicable law.
            </p>
          </section>

          <section id="termination">
            <span className="legal-number">11</span>
            <h2>Suspension & Termination</h2>

            <p>
              Access to the messaging feature may be restricted or
              suspended where there is reasonable evidence of abuse,
              security risks, unlawful activity, or violation of these
              terms.
            </p>

            <p>
              You may stop using the website at any time. If you want
              to request account or personal-data deletion, contact
              the website owner through the portfolio contact section.
            </p>
          </section>

          <section id="changes">
            <span className="legal-number">12</span>
            <h2>Changes to These Terms</h2>

            <p>
              These Terms of Service may be updated as the website,
              its features, or applicable requirements change.
            </p>

            <p>
              Updated terms will be published on this page with a
              revised date. Where a change materially affects users,
              reasonable notice will be provided where appropriate.
            </p>
          </section>

          <section id="contact">
            <span className="legal-number">13</span>
            <h2>Contact</h2>

            <p>
              If you have questions about these Terms of Service,
              please use the contact section of the portfolio website.
            </p>

            <a href="/#contact" className="legal-contact-link">
              Contact CodeBro Digital <span>↗</span>
            </a>
          </section>

          <div className="legal-end">
            <span>THANK YOU FOR USING THIS WEBSITE.</span>
            <p>Designed &amp; Developed by CodeBro Digital</p>
          </div>

        </article>
      </div>
    </main>
  );
};

export default TermsOfService;