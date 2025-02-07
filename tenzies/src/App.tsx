import Dice from "./Dice"

export default function App() {
  	return (
		<main>
			<span className="title">Tenzies</span>
			<span className="description">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</span>
			<div className="grid">
				<Dice value={Math.floor(Math.random() * 6) + 1} />
				<Dice value={Math.floor(Math.random() * 6) + 1} />
				<Dice value={Math.floor(Math.random() * 6) + 1} />
				<Dice value={Math.floor(Math.random() * 6) + 1} />
				<Dice value={Math.floor(Math.random() * 6) + 1} />
				<Dice value={Math.floor(Math.random() * 6) + 1} />
				<Dice value={Math.floor(Math.random() * 6) + 1} />
				<Dice value={Math.floor(Math.random() * 6) + 1} />
				<Dice value={Math.floor(Math.random() * 6) + 1} />
				<Dice value={Math.floor(Math.random() * 6) + 1} />
			</div>
			<button>Roll</button>
		</main>
	)
}
