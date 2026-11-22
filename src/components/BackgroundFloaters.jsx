const floatingTech = [
  { label: "HTML5", mark: "5", className: "floater-html" },
  { label: "CSS3", mark: "3", className: "floater-css" },
  { label: "JavaScript", mark: "JS", className: "floater-js" },
  { label: "React", mark: "⚛", className: "floater-react" },
  { label: "Node.js", mark: "N", className: "floater-node" },
  { label: "Express", mark: "Ex", className: "floater-express" },
  { label: "PostgreSQL", mark: "Pg", className: "floater-postgres" },
  { label: "MongoDB", mark: "M", className: "floater-mongo" },
  { label: "API", mark: "{ }", className: "floater-api" },
];

function BackgroundFloaters() {
  return (
    <div className="site-floater-layer" aria-hidden="true">
      {floatingTech.map((item, index) => (
        <div className={`site-floater ${item.className}`} key={item.label} style={{ "--i": index }}>
          <span>{item.mark}</span>
          <small>{item.label}</small>
        </div>
      ))}
      <i className="ambient-orb ambient-orb-one" />
      <i className="ambient-orb ambient-orb-two" />
      <i className="ambient-orb ambient-orb-three" />
    </div>
  );
}

export default BackgroundFloaters;
