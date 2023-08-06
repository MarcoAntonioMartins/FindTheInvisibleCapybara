import React from "react"
import logo_capybara from '../img/capybara.png';

function Index({ startGame }) {
  return (
    <div className="container">
        <header className="box">
            <img src={logo_capybara} className="logo_capybara" alt="Random Capybara" />
            <h1>Find the Invisible Capybara</h1>
            <button className="ready_link" onClick={startGame}>Start</button>
        </header>
    </div>
  );
}

export default Index;
