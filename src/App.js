import Die from "./Die.js";
import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import "./App.css";

export default function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [counter, setCounter] = useState(0);
  const [bestScore, setBestScore] = useState(
    localStorage.getItem("bestSocre") || 0
  );

  useEffect(() => {
    localStorage.setItem("bestSocre", 0);
  }, []);

  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);

    if (allHeld && allSameValue) {
      setTenzies(true);
      updateBestScore();
      setCounter(0);
    }
  }, [dice ]);

  function updateBestScore() {
    const currentBestScore = JSON.parse(localStorage.getItem("bestSocre"));
    if (currentBestScore === 0) {
  
      localStorage.setItem("bestSocre", counter);
      setBestScore(localStorage.getItem("bestSocre"));
    } else if (currentBestScore > counter) {
     
      localStorage.setItem("bestSocre", counter);
      setBestScore(localStorage.getItem("bestSocre"));
    }
  }

  function generateNewDie() {
    return {
      value: Math.floor(Math.random() * 6) + 1,
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    let newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }

    return newDice;
  }

  function rollDice() {
    setCounter(counter + 1);
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.isHeld ? { ...die } : generateNewDie();
      })
    );
  }

  function holdDice(dieId) {
    setDice((prevDice) =>
      prevDice.map((die) => {
        return die.id === dieId ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }
  function resetGame() {
    setDice(allNewDice());
    setTenzies(false);
  }
  const diceElements = dice.map((die) => {
    return (
      <Die
        key={die.id}
        id={die.id}
        holdDice={holdDice}
        value={die.value}
        isHeldState={die.isHeld}
      />
    );
  });

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies {tenzies}</h1>
      <p className="counter">Current Score: {counter}</p>
      <p className="best-score">Best Score: {bestScore}</p>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{diceElements}</div>
      <button onClick={tenzies ? resetGame : rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
}
