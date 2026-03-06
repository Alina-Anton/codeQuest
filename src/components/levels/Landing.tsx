import React from "react";
import "./landing.css";

type Props = {
  onStart: () => void;
};

const Landing: React.FC<Props> = ({ onStart }) => {
  return (
    <div className="landing-root">

      {/* Grid Background */}
      <div className="grid-bg" />

      {/* Particle Glow */}
      <div className="particles">
        {Array.from({ length: 20 }).map((_, i) => (
          <span key={i} className="particle" />
        ))}
      </div>

      {/* Content */}
      <div className="landing-content">
        <h1 className="title">CodeQuest</h1>

        <p className="subtitle">A frontend engineering experience</p>

        <div className="taglines">
          <p>Not a portfolio.</p>
          <p>A simulation.</p>
        </div>

        <button className="start-btn" onClick={onStart}>
          START CHALLENGE
        </button>

        <div className="footer">
          <p>Estimated time: 5 minutes</p>
          <p>Best experienced on desktop</p>
        </div>
      </div>
    </div>
  );
};

export default Landing;