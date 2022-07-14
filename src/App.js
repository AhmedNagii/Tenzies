import Die from './Die.js';
import React , {useState} from "react"
import './App.css';


export default  function App() {

  function allNewDice (){
    let newDice = []
    for(let i = 0; i < 10; i++){
      let randomNum = Math.floor(Math.random() * 6 ) + 1
      newDice.push(randomNum)
    }
      return newDice
    }

    
const [dice , setDice] = useState(allNewDice())



const diceElements = dice.map(die => <Die value={die}/>)

  return (
    
     <main>
    <div className='dice-container'>
      {diceElements}
     
    </div>
    <button onClick={() =>  setDice(allNewDice ())}>Roll</button>
     </main>
  
  );
}

