import './App.css'
import { useState } from 'react';
import Game from './components/Game';
import logo from './assets/logo.png';

function App() {

    const [showMenu, setShowMenu] = useState(true);
    const [showGame, setShowGame] = useState(false);
    const [showHowToPlay, setShowHowToPlay] = useState(false);

    const startGameHandler = () => {
        setShowMenu(false);
        setShowGame(true);
    }

    const helpHandler = () => {
        setShowMenu(false);
        setShowHowToPlay(true);
    }

    const exitHelp = () => {
        setShowMenu(true);
        setShowHowToPlay(false);
    }

    return (
        <div className="App">
            {showHowToPlay && (
                <div className="HowModule">
                    <h2>How To Play</h2>
                    <ul>
                        <ol>You can click on cards that you didn`t click before to get points.</ol>
                        <ol>If you click on a card that you already clicked, the game will reset.</ol>
                        <ol>Try to get as many points as you can.</ol>
                    </ul>
                    <button onClick={exitHelp}>Back</button>
                </div>
            )}
            {showMenu && (
                <div className="Menu">
                    <img className="logo" src={logo} alt="pokemon-logo"></img>
                    <h1>Memory Card Game</h1>
                    <button onClick={startGameHandler}>Start Game</button>
                    <button onClick={helpHandler}>How to Play</button>
                </div>
            )}
            {/* Add the conditional statement for this */}
            {showGame &&
                <Game setShowMenu={setShowMenu} setShowGame={setShowGame} />}
        </div>
    )
}

export default App
