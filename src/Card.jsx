import React, { useEffect, useState } from "react"
import ReactConfetti from "react-confetti";

/*
    To do:
    - Create dice comp -
    - Make the roll button functional for the dices to change their values randomly -
    - Hold the values for the dices which have been clicked on -
    - Match values when all the dices are clicked for the **confetti** -
    - Display Luck according the count value -
    - Design the dices in a way for the user to get feedback when the dice is being held or not -
    - final touch up of the design
    - Double check for edge cases
        -- padding in the dice buttons
*/

export default function Card(props){
    const [dices, setDices] = useState(() => (
        Array.from({ length: 10 }, () => (
            {
                value: Math.floor(Math.random() * 6 + 1),
                held: false,
            }
        ))
    ));

    const [count, setCount] = useState(0)

    const [gameWon, setGameWon] = useState(false)

    useEffect(() => {
        const heldDices = dices.filter(e => e.held);
        const allEqual = heldDices.every(e => dices[0].value === e.value)

        if(heldDices.length === dices.length && allEqual){
            setGameWon(prevState => !prevState)
            props.handleConfetti()
        }
    }, [dices])

    const diceValues = dices.map((e, i) => (
        <button
            key={i}
            className={`dice${e.held ? ' held' : ''}`}
            onClick={() => handleHold(i)}
        >
            {e.value}
        </button>
    ))

    function generateAllNewDices(){
        setDices(() => (Array.from({ length: 10 }, () => (
            {
                value: Math.floor(Math.random() * 6 + 1), 
                held: false,
            }
        ))))
        setCount(0)
        setGameWon(false)
        props.handleConfetti()
    }

    function handleHold(index){
        setDices(prevState => {
            return prevState.map((e, i) => index === i ? {...e, held: !e.held} : e)
        })
    }

    function handleClick(){
        if(gameWon){
            generateAllNewDices()
        }else{
            setDices(prevState => prevState.map(e => e.held ? e : {...e, value:Math.floor(Math.random() * 6 + 1)}))
            setCount(prevCount => prevCount + 1)
        }
    }

    function getLuckMessage(count) {
        if (count < 5) return "You are very lucky.";
        if (count > 20) return "You are not so lucky. You need to work hard for your goals.";
        return "You are lucky.";
    }

    return(
        <div className="game-card">
            <h1>Tenzies</h1>
            <p className="game-info">
                {gameWon ? getLuckMessage(count) : "Roll until all dice are the same. Click each die to freeze it at its current value between rolls."}
            </p>
            <p className="count">Count : {count}</p>
            {diceValues}
            <button className="roll-btn" onClick={handleClick}>{gameWon ? 'New Game' : 'Roll'}</button>
        </div>
    )
}