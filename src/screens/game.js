import React, { useState, useEffect, useRef } from 'react';
import Randomcapybara from '../img/capybara.png';
import CapiSfx from '../audio/capybara.mp3';

const Game = () => {
  const audioRef = useRef(null);
  const capybaraRef = useRef(null);
  const [mouseDistance, setMouseDistance] = useState(0);
  const [endGameActive, setEndGameActive] = useState(false);
  const [imagePosition, setImagePosition] = useState({
    x: Math.random() * (window.innerWidth - 100),
    y: Math.random() * (window.innerHeight - 100),
  });

  const handleMouseMovement = (e) => {
    const capybaraRect = capybaraRef.current.getBoundingClientRect();
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const capybaraX = capybaraRect.left + capybaraRect.width / 2;
    const capybaraY = capybaraRect.top + capybaraRect.height / 2;
    const distance = Math.sqrt(
      Math.pow(mouseX - capybaraX, 2) + Math.pow(mouseY - capybaraY, 2)
    );
    setMouseDistance(distance);
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMovement);
    if (audioRef.current) {
      const maxDistance = window.innerHeight * 0.75;
      const volume = Math.max(1 - mouseDistance / maxDistance, 0);
      audioRef.current.volume = volume;
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMovement);
    };
  }, [mouseDistance]);

  useEffect(() => {
    document.getElementById("audio-element").volume = 0;
    setImagePosition({
      x: Math.random() * (window.innerWidth - 100),
      y: Math.random() * (window.innerHeight - 100),
    });
  }, 
  []);

  const redirectToOtherScreen = () => {
    setTimeout(() => {
      window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley';
    }, 5000);
  };

  const endGame = () => {
    const imageElement = capybaraRef.current;
    imageElement.onClick = '';
    imageElement.classList.add('endgame');

    const audioEl = document.getElementById("audio-element");
    audioEl.pause();
    const speed = 5;
    const centerX = window.innerWidth / 2 - 225;
    const centerY = window.innerHeight / 2 - 225;
    const moveTowardsCenter = () => {
      setImagePosition((prevPosition) => ({
        x: prevPosition.x + (centerX - prevPosition.x) / speed,
        y: prevPosition.y + (centerY - prevPosition.y) / speed,
      }));
    };

    //makeabiggerimage

    const moveInterval = setInterval(() => {
      moveTowardsCenter();
    }, 20);
    const checkReachedCenter = setInterval(() => {
      if (
        Math.abs(imagePosition.x - centerX) <= 1 &&
        Math.abs(imagePosition.y - centerY) <= 1
      ) {
        clearInterval(moveInterval);
        clearInterval(checkReachedCenter);
      }
    }, 100);
    setEndGameActive(true);
    const onAnimationEnd = () => {
      imageElement.classList.remove('endgame-animation');
    };
    imageElement.addEventListener('animationend', onAnimationEnd, { once: true });
    redirectToOtherScreen();
  };
  return (
    <div className='lake'>
      <img
        ref={capybaraRef}
        src={Randomcapybara}
        alt="Capybara"
        onClick={endGame}
        onMouseMove={handleMouseMovement}
        className={"random_capybara ${endGameActive ? 'endgame-animation' : ''}"}
        id="random_capybara"
        style={{
          top: `${imagePosition.y}px`,
          left: `${imagePosition.x}px`,
        }}
      />
      <audio ref={audioRef} src={CapiSfx} className="audio-element" id="audio-element" loop autoPlay />
    </div>
  );
};

export default Game;
