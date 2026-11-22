import { useEffect, useRef } from "react";
import profile from "../assets/profile.png";

function Hero() {
  const visualRef = useRef(null);

  useEffect(() => {
    const hero = visualRef.current;
    if (!hero || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const updateDepth = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const bounds = hero.getBoundingClientRect();
        const progress = Math.max(-1, Math.min(1, (window.innerHeight - bounds.top) / (window.innerHeight + bounds.height)));
        hero.style.setProperty("--scroll-depth", `${progress * 115}px`);
      });
    };
    updateDepth();
    window.addEventListener("scroll", updateDepth, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateDepth);
    };
  }, []);

  const handlePointerMove = (event) => {
    if (!visualRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const bounds = visualRef.current.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    visualRef.current.style.setProperty("--tilt-x", `${-y * 9}deg`);
    visualRef.current.style.setProperty("--tilt-y", `${x * 11}deg`);
  };

  const resetPointer = () => {
    if (!visualRef.current) return;
    visualRef.current.style.setProperty("--tilt-x", "0deg");
    visualRef.current.style.setProperty("--tilt-y", "0deg");
  };

  return (
    <section className="hero" id="home">
      <div className="hero-atmosphere" aria-hidden="true">
        <span className="orbit orbit-one" /><span className="orbit orbit-two" />
        <span className="ambient-dot dot-one" /><span className="ambient-dot dot-two" /><span className="ambient-dot dot-three" />
      </div>

      <div className="hero-text">
        <p className="eyebrow"><span className="status-dot" /> AVAILABLE FOR OPPORTUNITIES</p>
        <p className="greeting">Hello, I'm</p>
        <h1>Eruchi<span className="name-period">.</span></h1>
        <h2>Full-Stack Developer <span>&amp;</span> Problem Solver</h2>
        <p className="description">
          I build thoughtful digital products, web applications and software
          solutions that solve real problems. I enjoy turning complex ideas into
          reliable, useful experiences for people and businesses.
        </p>
        <div className="hero-buttons">
          <a href="#projects" className="primary-btn">Explore my work <span>↗</span></a>
          <a href="/chat" className="secondary-btn">Start an on-site chat <span>↗</span></a>
        </div>
        <p className="talk-hint">Start an on-site chat to create an account or sign in and message me without leaving this website.</p>
        <div className="hero-note"><span className="note-line" /> Building with purpose, one solution at a time.</div>
      </div>

      <div className="hero-image" ref={visualRef} onPointerMove={handlePointerMove} onPointerLeave={resetPointer}>
        <div className="portrait-stage">
          <div className="portrait-grid" /><div className="portrait-halo" />
          <div className="portrait-frame"><img src={profile} alt="Portrait of Eruchi" fetchPriority="high" /></div>
          <div className="portrait-orbit orbit-a" /><div className="portrait-orbit orbit-b" />
          <div className="floating-label label-top"><span>01</span> DESIGN MINDED</div>
          <div className="floating-label label-bottom"><span>02</span> ENGINEERING FOCUSED</div>
          <div className="tech-chip chip-left">&lt;/&gt; <span>BUILD</span></div>
          <div className="tech-chip chip-right"><span className="chip-pulse" /> DIGITAL THINKING</div>
        </div>
      </div>
      <a className="scroll-cue" href="#about"><span /> SCROLL TO EXPLORE</a>
    </section>
  );
}

export default Hero;
