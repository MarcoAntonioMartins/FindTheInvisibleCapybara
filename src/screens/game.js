import React, { useState, useEffect, useRef } from 'react';
import Randomcapivara from '../img/capivara.png';
import CapiSfx from '../audio/capivara.mp3';

const Game = () => {
  const audioRef = useRef(null);
  const capivaraRef = useRef(null);
  const [mouseDistance, setMouseDistance] = useState(0);
  const [endGameActive, setEndGameActive] = useState(false);
  const [imagePosition, setImagePosition] = useState({
    x: Math.random() * (window.innerWidth - 100),
    y: Math.random() * (window.innerHeight - 100),
  });

  const handleMouseMovement = (e) => {
    const capivaraRect = capivaraRef.current.getBoundingClientRect();
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const capivaraX = capivaraRect.left + capivaraRect.width / 2;
    const capivaraY = capivaraRect.top + capivaraRect.height / 2;
    const distance = Math.sqrt(
      Math.pow(mouseX - capivaraX, 2) + Math.pow(mouseY - capivaraY, 2)
    );
    setMouseDistance(distance);
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMovement);
    if (audioRef.current) {
      const maxDistance = window.innerWidth * 0.75;
      const volume = Math.max(1 - mouseDistance / maxDistance, 0);
      audioRef.current.volume = volume;
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMovement);
    };
  }, [mouseDistance]);

  useEffect(() => {
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
    const imageElement = capivaraRef.current;
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
    <div>
      <img
        ref={capivaraRef}
        src={Randomcapivara}
        alt="Capivara"
        onClick={endGame}
        onMouseMove={handleMouseMovement}
        className={"random_capivara ${endGameActive ? 'endgame-animation' : ''}"}
        id="random_capivara"
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
