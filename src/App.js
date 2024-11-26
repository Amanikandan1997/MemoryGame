import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import "./App.css";
import pic1 from './assest/2.png';
import pic2 from './assest/3.png';
import pic3 from './assest/4.png';
import pic4 from './assest/5.png';
import pic5 from './assest/6.png';
import pic6 from './assest/7.png';
import pic7 from './assest/8.png';
import pic8 from './assest/paccm.png';

// Array of card images (pairs)
const cardImages = [
  { src: pic1 },
  { src: pic2 },
  { src: pic3 },
  { src: pic4 },
  { src: pic5 },
  { src: pic6 },
  { src: pic7 },
  { src: pic8 }
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
    if (cards[firstIndex].src === cards[secondIndex].src) {
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
  const renderCard = (card, index) => {
    const isFlipped = flippedIndices.includes(index) || matchedIndices.includes(index);
    return (
      <div
        key={index}
        className={`card ${isFlipped ? "flipped" : ""}`}
        onClick={() => handleCardClick(index)}
      >
        {isFlipped ? (
          <img src={card.src} alt="card" className="card-image" />
        ) : (
          "❓"
        )}
      </div>
    );
  };

  return (
    <div className="memory-game">
      {gameWon && <Confetti />}
      <h1 className="animate-charcter">Memory Game</h1>
      <h1 className="animate-charcter">Developed By Manikandan U K I</h1>
      <div className="score">Score: {score}</div>
      <div className="cards-grid">
        {cards.map((card, index) => renderCard(card, index))}
      </div>
      {gameWon && (
        <div className="game-won">
          <h2 className="animate-charcter">Congratulations! You've Won!</h2>
          <button onClick={resetGame}>Play Again</button>
        </div>
      )}
      <h2 className="animate-charcter">
        Manikandan U K I @ {new Date().getFullYear()}
      </h2>
    </div>
  );
};

export default MemoryGame;
