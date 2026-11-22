function CodeBro() {
  const capabilities = [
    { number: "01", title: "Web Development", text: "Purpose-built websites and web applications designed around real user and business needs." },
    { number: "02", title: "Business Systems", text: "Practical digital tools that help teams organize operations and work with better visibility." },
    { number: "03", title: "Workflow Automation", text: "Reducing repetitive work through thoughtful software and connected digital workflows." },
  ];

  return (
    <section className="codebro-section section" id="codebro">
      <div className="codebro-intro">
        <div className="codebro-copy">
          <span className="section-kicker">BEYOND THE CODE</span>
          <h2>Building through<br /><em>CodeBro Digital.</em></h2>
          <p>
            CodeBro Digital is my digital solutions brand, built around a simple
            idea: technology should make work better. I use software, web
            development and automation to help businesses solve operational
            problems and bring useful ideas to life.
          </p>
          <a className="text-link" href="#contact">Have a project in mind? <span>↗</span></a>
        </div>
        <div className="codebro-mark-wrap" aria-label="CodeBro Digital brand mark">
          <div className="codebro-mark"><span>&lt;</span>CB<span>/&gt;</span></div>
          <div className="codebro-mark-caption">CODEBRO DIGITAL <i>—</i> DIGITAL SOLUTIONS</div>
          <div className="mark-orbit mark-orbit-one" /><div className="mark-orbit mark-orbit-two" />
        </div>
      </div>
      <div className="codebro-capabilities">
        {capabilities.map((item) => (
          <article className="capability" key={item.number}>
            <span className="capability-number">{item.number}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
            <span className="capability-arrow">↗</span>
          </article>
        ))}
      </div>
    </section>
  );
}

export default CodeBro;
