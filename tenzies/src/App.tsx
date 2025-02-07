import { useState } from "react"
import Dice from "./Dice"

export default function App() {
	const [diceObjs, setDiceObjs] = useState(generateAllNewDice())

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
		setDiceObjs(generateAllNewDice())
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
			<span className="title">Tenzies</span>
			<span className="description">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</span>
			<div className="grid">
				{dice}
			</div>
			<button onClick={rollDice}>Roll</button>
		</main>
	)
}
