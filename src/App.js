import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import"./App.css"

// Array of card images (pairs)
const cardImages = [
  "/assest/2.png",
  "/assest/3.png",
  "/assest/4.png",
  "/assest/5.png",
  "/assest/6.png",
  "/assest/7.png",
  "/assest/8.png",
  "/assest/paccm.png",
];

// Shuffle function to randomize cards
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

const MemoryGame = () => {
  // Initialize game state
  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedIndices, setMatchedIndices] = useState([]);
  const [score, setScore] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  // Start a new game
  const resetGame = () => {
    const shuffledCards = shuffle([...cardImages, ...cardImages]); // Duplicate the card images for pairs
    setCards(shuffledCards);
    setFlippedIndices([]);
    setMatchedIndices([]);
    setScore(0);
    setGameWon(false);
  };

  // Effect to start the game on mount
  useEffect(() => {
    resetGame();
  }, []);

  // Handle card click
  const handleCardClick = (index) => {
    if (
      flippedIndices.length === 2 ||
      flippedIndices.includes(index) ||
      matchedIndices.includes(index)
    ) {
      return;
    }

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      checkForMatch(newFlipped);
    }
  };

  // Check if two flipped cards match
  const checkForMatch = (flipped) => {
    const [firstIndex, secondIndex] = flipped;
    if (cards[firstIndex] === cards[secondIndex]) {
      setMatchedIndices([...matchedIndices, firstIndex, secondIndex]);
      setScore(score + 1);
    }

    setTimeout(() => {
      setFlippedIndices([]);
    }, 1000);
  };

  // Check if game is won
  useEffect(() => {
    if (matchedIndices.length === cards.length && cards.length > 0) {
      setGameWon(true);
    }
  }, [matchedIndices]);

  // Render a single card
  const renderCard = (value, index) => {
    const isFlipped = flippedIndices.includes(index) || matchedIndices.includes(index);
    return (
      <div
        key={index}
        className={`card ${isFlipped ? "flipped" : ""}`}
        onClick={() => handleCardClick(index)}
      >
        {isFlipped ? (
          <img src={value} alt="card" className="card-image" />
        ) : (
          "❓"
        )}
      </div>
    );
  };

  return (
    <div className="memory-game">
      {gameWon && <Confetti />}
      <h1 className="animate-charcter  ">Memory Game</h1>
      <h1 className="animate-charcter  ">Developed By Manikandan U K I</h1>
      <div className="score">Score: {score}</div>
      <div className="cards-grid">
        {cards.map((value, index) => renderCard(value, index))}
    
      </div>
      {gameWon && (
        <div className="game-won">
          <h2 className="animate-charcter">Congratulations! You've Won!</h2>
          <button onClick={resetGame}>Play Again</button>
        </div>
      )}
          <h2 class="animate-charcter" >Manikandan U K I @ {(new Date().getFullYear())}  <span></span></h2>
    </div>
  );
};

export default MemoryGame;
