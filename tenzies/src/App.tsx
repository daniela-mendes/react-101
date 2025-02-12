import { useEffect, useRef, useState } from "react"
import Dice from "./Dice"
import Confetti from 'react-confetti'

export default function App() {
	const [windowSize, setWindowSize] = useState({
		width: window.innerWidth,
		height: window.innerHeight
	})

	useEffect(() => {
		function watchWindowSize() {
			setWindowSize({
				width: window.innerWidth,
				height: window.innerHeight
			})
		}
		window.addEventListener("resize", watchWindowSize)
		return function() {
			window.removeEventListener("resize", watchWindowSize)
		}
	}, [])
	
	// counter of dice rolls
	const [counter, setCounter] = useState(1)

	// game duration //
	const [tracker, setTracker] = useState(0)

	const [isRunning, setIsRunning] = useState(true)

	let interval = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		if (isRunning) {
			interval.current = setInterval(() => {
				setTracker(prevTracker => prevTracker + 1)
			}, 1000)
		}
		return () => {clearInterval(interval.current!)}
	}, [isRunning])
	///////////////////
	
	const [diceObjs, setDiceObjs] = useState(() => generateAllNewDice())

    const allHeld = diceObjs.every(dieObj => dieObj.isHeld === true)
    const allTheSame = diceObjs.every(dieObj => dieObj.value === diceObjs[0].value)
    const gameWon = allHeld && allTheSame

	const newGameButton = useRef<HTMLButtonElement>(null)

	useEffect(() => {
		if (gameWon) {
			newGameButton.current?.focus()
			setIsRunning(false)
			clearInterval(interval.current!)
		}
	}, [gameWon])

	function generateAllNewDice() {
		setCounter(1);
		setTracker(0);
		setIsRunning(true)
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
		setCounter(prevCount => prevCount + 1)
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

	function setNewGame() {
        setDiceObjs(generateAllNewDice())
    }

  	return (
		<main>
			{gameWon && <Confetti width={windowSize.width} height={windowSize.height} />}
			<div aria-live="polite" className="sr-only">
				{gameWon && <p>You won! Press "New Game" to start again.</p>}
			</div>
			<span className="title">Tenzies</span>
			<span className="description">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</span>
			<span className="description margin-top"><b>Dice rolls:</b> {counter}, <b>Time:</b> {tracker}s</span>
			<div className="grid">
				{dice}
			</div>
			<button 
				ref={newGameButton}
				onClick={gameWon ? setNewGame : rollDice}>{gameWon ? "New Game" : "Roll"}
				</button>
		</main>
	)
}
