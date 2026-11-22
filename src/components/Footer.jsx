function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand"><span>&lt;</span>CodeBro<span>/&gt;</span></div>
        <p>Thoughtful software. Practical solutions. Better ways to work.</p>
        <div className="social-links">
          <a href="https://github.com/CodeBro-Programmer" target="_blank" rel="noreferrer">GitHub <span>↗</span></a>
          <a href="#contact">Contact <span>↗</span></a>
        </div>
        <div className="footer-bottom">
          <p className="copyright">© {year} CodeBro. All rights reserved.</p>
          <p className="credit">Designed &amp; Developed by <a href="#codebro">CodeBro Digital</a></p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
