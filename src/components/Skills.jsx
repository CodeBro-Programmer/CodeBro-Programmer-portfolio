function Skills() {
  const skills = [
    {
      title: "Frontend",
      items: [
        "HTML5",
        "CSS3",
        "JavaScript (ES6+)",
        "React",
        "Responsive Design"
      ]
    },
    {
      title: "Backend",
      items: [
        "Node.js",
        "Express.js",
        "REST APIs",
        "JWT Authentication"
      ]
    },
    {
      title: "Database",
      items: [
        "PostgreSQL",
        "MongoDB",
        "SQL"
      ]
    },
    {
      title: "Tools",
      items: [
        "Git",
        "GitHub",
        "VS Code",
        "Postman"
      ]
    }
  ];

  return (
    <section className="skills section" id="skills">
      <div className="section-title">
        <span>MY SKILLS</span>
        <h2>Technologies I Use</h2>
      </div>

      <div className="skills-grid">
        {skills.map((category, index) => (
          <div className="skill-card" key={index}>
            <h3>{category.title}</h3>

            <div className="skill-list">
              {category.items.map((skill, i) => (
                <span className="skill-pill" key={i}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="skills-bottom">

        <div className="stat-card">
          <h2>01</h2>
          <p>Problem-first mindset</p>
        </div>

        <div className="stat-card">
          <h2>02</h2>
          <p>Frontend and backend thinking</p>
        </div>

        <div className="stat-card">
          <h2>03</h2>
          <p>Continuous improvement</p>
        </div>

      </div>
    </section>
  );
}

export default Skills;