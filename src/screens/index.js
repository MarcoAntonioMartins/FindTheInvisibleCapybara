import React from "react"
import logo_capybara from '../img/capybara.png';
import logo_git from '../img/github_icon.png';


function Index({ startGame }) {
  return (
    <div className="container">
      <div class="credit">Credits: <a href="https://github.com/MarcoAntonioMartins/FindTheInvisibleCapybara" target="_blank" class="link_credit"><img src={logo_git} className="img_link_credit"/> github.com</a></div>
      <header className="box">
          <img src={logo_capybara} className="logo_capybara" alt="Random Capybara" />
          <h1>Find the Invisible Capybara</h1>
          <button className="ready_link" onClick={startGame}>Start</button>
          <p className="details_info">Move the mouse around the screen to find the Capybara. The closer you get, the louder the music will be.</p>
      </header>
    </div>
  );
}

export default Index;
