import { useState } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <a className="logo" href="#home" aria-label="Eruchi home"><span>&lt;</span>CodeBro<span>/&gt;</span></a>
      <ul className={menuOpen ? "nav-links active" : "nav-links"}>
        <li><a href="#home" onClick={closeMenu}>Home</a></li>
        <li><a href="#about" onClick={closeMenu}>About</a></li>
        <li><a href="#skills" onClick={closeMenu}>Expertise</a></li>
        <li><a href="#projects" onClick={closeMenu}>Projects</a></li>
        <li><a href="#codebro" onClick={closeMenu}>CodeBro Digital</a></li>
      </ul>
      <a className="nav-contact" href="/chat">Start a chat <span>↗</span></a>
      <button className={menuOpen ? "hamburger active" : "hamburger"} onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>
        <span /><span /><span />
      </button>
    </nav>
  );
}

export default Navbar;
