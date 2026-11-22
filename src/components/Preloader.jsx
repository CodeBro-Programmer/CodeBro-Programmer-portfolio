import { useEffect, useState } from "react";

function Preloader() {
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let value = 0;
    let hasFinished = false;
    let safetyTimer;
    const progressTimer = window.setInterval(() => {
      value = Math.min(value + Math.ceil(Math.random() * 13), 94);
      setProgress(value);
    }, 90);

    const finish = () => {
      if (hasFinished) return;
      hasFinished = true;
      window.clearInterval(progressTimer);
      window.clearTimeout(safetyTimer);
      setProgress(100);
      setExiting(true);
      window.setTimeout(() => setVisible(false), 420);
    };
    const minimumTime = window.setTimeout(() => {
      if (document.readyState === "complete") finish();
      else window.addEventListener("load", finish, { once: true });
    }, 650);
    safetyTimer = window.setTimeout(finish, 2200);

    return () => {
      window.clearInterval(progressTimer);
      window.clearTimeout(minimumTime);
      window.clearTimeout(safetyTimer);
      window.removeEventListener("load", finish);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className={`preloader${exiting ? " is-exiting" : ""}`} role="status" aria-label="Loading portfolio">
      <div className="preloader-inner">
        <div className="preloader-mark"><span>&lt;</span>CB<span>/&gt;</span></div>
        <p className="preloader-label">CODEBRO DIGITAL</p>
        <div className="preloader-track"><span style={{ width: `${progress}%` }} /></div>
        <div className="preloader-meta"><span>Preparing experience</span><span>{progress}%</span></div>
      </div>
    </div>
  );
}

export default Preloader;
