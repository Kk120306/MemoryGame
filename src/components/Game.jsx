import { useState, useEffect } from 'react';

function Game({ setShowMenu, setShowGame }) {
    const [bestScore, setBestScore] = useState(0);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [gameWon, setGameWon] = useState(false);
    const [cards, setCards] = useState([]);
    const [clickedCards, setClickedCards] = useState([]);

    const showMenuHandler = () => {
        setShowMenu(true);
        setShowGame(false);
    };

    const resetModule = () => {
        setScore(0);
        setGameOver(false);
        setGameWon(false);
        setBestScore(0);
        setClickedCards([]);
    };

    const playAgain = () => {
        setScore(0);
        setGameOver(false);
    }




    const generateRandomPokemons = () => {
        fetch('https://pokeapi.co/api/v2/pokemon?limit=10')
            .then(response => response.json())
            .then(data => {
                Promise.all(
                    data.results.map(pokemon =>
                        fetch(pokemon.url).then(res => res.json())
                    )
                ).then(details => {
                    const shuffled = [...details].sort(() => Math.random() - 0.5);
                    setCards(shuffled);
                });
            });
    };

    useEffect(() => {
        generateRandomPokemons();
    }, []);


    const verifyClick = (pokemon) => {
        if (clickedCards.includes(pokemon.id)) {
            setGameOver(true);
            if (score > bestScore) {
                setBestScore(score);
            }
            setClickedCards([]);
            setScore(0);
        } else {
            const newScore = score + 1;
            if (newScore === cards.length) {
                setGameWon(true);
                setClickedCards([]);
            }
            setClickedCards([...clickedCards, pokemon.id]);
            setScore(newScore);
            if (newScore > bestScore) {
                setBestScore(newScore);
            }
            const shuffled = [...cards].sort(() => Math.random() - 0.5);
            setCards(shuffled);
        }
    }


    return (
        <div className="PokemonCards">
            {!gameOver && !gameWon && (
                <div className="Game">
                    <button onClick={showMenuHandler}>Menu</button>
                    <button onClick={generateRandomPokemons}>Generate</button>
                    <button onClick={resetModule}>Reset</button>


                    <h2>Score: {score}</h2>
                    <h2>Best Score: {bestScore}</h2>

                    {cards.map(pokemon => (
                        <div key={pokemon.id} onClick={() => verifyClick(pokemon)}>
                            <h3>{pokemon.name}</h3>
                            <img
                                src={pokemon.sprites.front_default}
                                alt={pokemon.name}
                                width={100}
                                height={100}
                            />
                        </div>
                    ))}
                    </div>
                )}

            {gameOver && (
                <div className="GameOver">
                    <h2>Game Over</h2>
                    <p>Best score: {bestScore}</p>
                    <button onClick={playAgain}>Play Again</button>
                </div>
            )}

            {gameWon && (
                <div className="GameWon">
                    <h2>You won!</h2>
                    <p>Your score: {score}</p>
                    <button onClick={resetModule}>Play Again</button>
                </div>
            )}

        </div>
    );
}

export default Game;
