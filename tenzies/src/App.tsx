import { useState } from "react"
import Dice from "./Dice"

export default function App() {
	const [diceNumbers, setDiceNumbers] = useState(generateAllNewDice())

	function generateAllNewDice() {
        const diceArray = []
        for (let i = 0; i < 10; i++)
            diceArray.push(Math.floor(Math.random() * 6) + 1);
        return diceArray
    }

	const dice = diceNumbers.map((num) => (
		<Dice value={num} />
	))

  	return (
		<main>
			<span className="title">Tenzies</span>
			<span className="description">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</span>
			<div className="grid">
				{dice}
			</div>
			<button>Roll</button>
		</main>
	)
}
