import { useState } from "react"
import Dice from "./Dice"
import Confetti from 'react-confetti'

export default function App() {
	const { innerWidth, innerHeight } = window;
	
	const [diceObjs, setDiceObjs] = useState(() => generateAllNewDice())

    const allHeld = diceObjs.every(dieObj => dieObj.isHeld === true)
    const allTheSame = diceObjs.every(dieObj => dieObj.value === diceObjs[0].value)
    
    const gameWon = allHeld && allTheSame

	function generateAllNewDice() {
        const diceArray = []
        for (let i = 0; i < 10; i++)
            diceArray.push({
				value: Math.floor(Math.random() * 6) + 1, 
				isHeld: false,
				id: i
			});
        return diceArray
    }

	const dice = diceObjs.map((diceObj) => (
		<Dice key={diceObj.id} id={diceObj.id} value={diceObj.value} isHeld={diceObj.isHeld} toggleHold={toggleHold} />
	))

	function rollDice() {
		setDiceObjs(prevDice =>
            prevDice.map(dieObj =>
                dieObj.isHeld ? dieObj : {...dieObj, value: Math.ceil(Math.random() * 6)}
            )
        )
	}

	function toggleHold(diceID: number) {
		setDiceObjs(prevDice =>
			prevDice.map((diceObj) => 
				diceObj.id === diceID ? {...diceObj, isHeld: !diceObj.isHeld} : diceObj
			)
		)
	}

  	return (
		<main>
			{gameWon && <Confetti width={innerWidth} height={innerHeight} />}
			<span className="title">Tenzies</span>
			<span className="description">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</span>
			<div className="grid">
				{dice}
			</div>
			<button onClick={rollDice}>{gameWon ? "New Game" : "Roll"}</button>
		</main>
	)
}
