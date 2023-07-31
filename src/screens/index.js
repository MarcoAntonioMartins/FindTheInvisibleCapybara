import React from "react"
import logo_capivara from '../img/capivara.png';

function Index({ startGame }) {
  return (
    <div className="container">
        <header className="box">
            <img src={logo_capivara} className="logo_capivara" alt="Random Capivara" />
            <h1>Find the Invisible Capivara</h1>
            <button className="ready_link" onClick={startGame}>Start</button>
        </header>
    </div>
  );
}

export default Index;
