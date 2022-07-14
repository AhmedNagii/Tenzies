import React from  "react"

export default function Main (props){

    const color =  props.isHeldState? "#59E391" : "#fff"
 
    return  (
    <div className="die" style={{backgroundColor: `${color}`}}
     onClick={(event)=>{props.holdDice(props.id)}}>
            <h2>{props.value}</h2>
        </div>)
    
}