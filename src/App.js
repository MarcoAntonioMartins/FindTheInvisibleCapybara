import './App.css';
import React,{useState} from 'react';
import Index from './screens/index';
import Game from './screens/game';

function App() {
  const [gameStarted, setGameStarted] = useState(false)

  const startGame = () => {
    setGameStarted(true)
  }

  if (!gameStarted) return <Index startGame={startGame} />
  if (gameStarted) return <Game />

  return <div className="App">Find a Capybara</div>
}

export default App