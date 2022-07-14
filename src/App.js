import Die from "./Die.js";
import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti"
import "./App.css";

export default function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);

  useEffect(()=>{
    const allHeld = dice.every(die => die.isHeld)
    const firstNum = dice.every(die => dice[9].value === die.value) 
    if(allHeld && firstNum){
      setTenzies(true)
    }
    // for(let i = 0; i < dice.length; i++){
    //   if(dice[i].isHeld === false && dice[i] === firstNum){
    //     console.log(dice[i].isHeld === false && dice[i] === firstNum)
    //      settenzies(state)
    //      break;
    //   }  else{
    //     state = true
    //   //  console.log(state)
    //     settenzies(true)
    //   }
    // }

    // if(tenzies){
    //   console.log('you did smart guy')
    // }
     },[dice])

  function generateNewDie() {
    return {
      randomNumber: Math.floor(Math.random() * 6) + 1,
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
  //get prev array
  //get the matched ID

  function holdDice(dieId) {
    setDice((prevDice) =>
      prevDice.map((die) => {
        return die.id === dieId ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  function rollDice() {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.isHeld ? { ...die } : generateNewDie();
      })
    );
  }

  const diceElements = dice.map((die) => {
    return (
      <Die
        key={die.id}
        id={die.id}
        holdDice={holdDice}
        value={die.randomNumber}
        isHeldState={die.isHeld}
      />
    );
  });

  return (
    <main>
      <h1 className="title">Tenzies</h1>
      {tenzies && <Confetti/>}
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{diceElements}</div>
      <button onClick={rollDice}>{tenzies?"New Game":"Roll"}</button>
    </main>
  );
}
