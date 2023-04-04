import React, { useState } from "react";
import Loading from "../loading";
import "./overlay.css";

const Overlay = () => {

  const [loading, setloading] = useState(true);

  return (
    <>
    {loading && <Loading /> }
      <div className="overlay">
        <video
          loop
          muted
          autoPlay
          className="landing-video"
          src="https://amechain.io/static/video/lp-light-graphics-amechain-1.mp4"
          preload={"auto"}
          type={"video/mp4"}
          onLoadedData={() => setloading(false)}
        ></video>
      </div>
      <div className="overlay-content">
        <h1 className="headertag1 focus-in-contract-bck">
          Build On Quantum Secured
          <span className="headertagspan">AME Chain</span>
        </h1>
      </div>
      <div className="imagediv">
        <img
          src="https://amechain.io/static/img-amechain/img-lp-down.png"
          alt="downImg"
        />
      </div>
    </>
  );
};
export default Overlay;
