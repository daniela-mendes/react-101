import { useEffect, useRef, useState } from "react"
import clsx from "clsx";
import { languages } from "./languages"
import { getFarewellText, chooseRandomWord } from "./utils"
import Confetti from "react-confetti"

export default function Hangman() {
  const [currentWord, setCurrentWord] = useState(() => chooseRandomWord())
  const [guessedLetters, setGuessedLetters] = useState<string[]>([])
  const [farewellText, setFarewellText] = useState<string | null>(null)
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

  const [timer, setTimer] = useState(30)
  const [isRunning, setIsRunning] = useState(true)
	let interval = useRef<NodeJS.Timeout | null>(null);

  const wrongGuessCount: number = guessedLetters.filter(letter => !currentWord.includes(letter)).length
  const isLastGuessWrong = guessedLetters.length > 0 && !currentWord.includes(guessedLetters[guessedLetters.length - 1])

  const isGameWon: boolean = currentWord.split("").every(letter => guessedLetters.includes(letter))
  const isGameLost: boolean = wrongGuessCount === languages.length - 1 || timer === 0
  const isGameOver: boolean = isGameWon || isGameLost
  const gameStatusClass = clsx({
    win: isGameWon, 
    loss: isGameLost,
    farewell: !isGameOver && isLastGuessWrong
  })

  useEffect(() => {
		if (isRunning && timer > 0 && !isGameOver) {
			interval.current = setInterval(() => {
				setTimer(prevTimer => {
          if (timer <= 1) {
            setIsRunning(false)
            return 0
          } 
          else return prevTimer - 1
        })
			}, 1000)
		}
		return () => {clearInterval(interval.current!)}
	}, [isRunning, timer, isGameOver])

  const remainingGuesses: number = languages.length - 1 - wrongGuessCount

  const alphabet: string = "abcdefghijklmnopqrstuvwxyz"

  function addGuessedLetter(letter: string) {
    setGuessedLetters(prevLetters => {
      if (prevLetters.includes(letter)) return prevLetters
      else {
        if (!currentWord.includes(letter)) 
          setFarewellText(getFarewellText(languages[wrongGuessCount].name)); 
        return [...prevLetters, letter]
      }
    })
  }

  const chips = languages.map((lang, index) => {
    const className = clsx( index < wrongGuessCount && "lost");
    return <span
      key={lang.name}
      className={className}
      style={{"backgroundColor": lang.backgroundColor, "color": lang.color}}
    >{lang.name}</span>
  })

  const guessWord = currentWord.split("").map((letter, index) => {
    const className = clsx(guessedLetters.includes(letter) && "correct-guess",
                           isGameLost && !guessedLetters.includes(letter) && "game-over")
    return <span key={index} className={className}>{letter.toUpperCase()}</span>
  })

  const keyboardLetters = alphabet.split("").map(letter => {
    const isCorrect = guessedLetters.includes(letter) && currentWord.includes(letter);
    const isWrong = guessedLetters.includes(letter) && !currentWord.includes(letter);
    const className = clsx(isCorrect && "correct-letter", isWrong && "wrong-letter")

    return <button 
      key={letter} 
      className={className}
      disabled={isGameOver}
      aria-disabled={guessedLetters.includes(letter)}
      aria-label={`Letter ${letter}`}
      onClick={() => addGuessedLetter(letter)}
    >{letter.toUpperCase()}</button>
  })

  function getGameStatus() {
    if (!isGameOver) {
      if (isLastGuessWrong) 
        return <span>{farewellText}</span>
    }
    else {
      if (isGameWon) 
        return (
          <>
            <span style={{"fontSize": "20px"}}>You win!</span>
            <span>Well done! 🎉</span>
          </>
        )
      else 
        return (
          <>
            <span style={{"fontSize": "20px"}}>Game over!</span>
            <span>You lose! Better start learning Assembly 😭</span>
          </>
        )
    }
  }

  function setNewGame() {
    setCurrentWord(chooseRandomWord())
    setGuessedLetters([])
    setTimer(30)
    setIsRunning(true)
  }

  function SadConfetti() {
    return (
      <Confetti
        width={windowSize.width} height={windowSize.height}
        gravity={0.05} 
        drawShape={(ctx) => {
          const emoji = "☠️";
          const fontSize = 25;

          ctx.font = `${fontSize}px Arial`; // Set font size & type
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";

          ctx.fillText(emoji, 0, 0); // Draw emoji at center
        }}
      />
    );
  }

  return (
    <main>
      {isGameWon && <Confetti width={windowSize.width} height={windowSize.height} />}
      {isGameLost && SadConfetti()}
      <header>
        <span className="title">Assembly: Endgame</span>
        <span className="description">Guess the word in under 8 attempts to keep the programming world safe from Assembly!</span>
      </header>

      <p style={{"marginBottom": "20px"}}><b>Time left:</b> {timer}s</p>

      <section aria-live="polite" role="status" className={`status ${gameStatusClass}`}>
        {getGameStatus()}
      </section>

      <section className="language-chips">{chips}</section>

      <p>Remaining attemps: {remainingGuesses}</p>

      <section className="guess-word">{guessWord}</section>

      {/* Combined visually-hidden aria-live region for status updates */}
      <section className="sr-only" aria-live="polite" role="status">
        <p>
          {currentWord.includes(guessedLetters[guessedLetters.length - 1]) ? 
            `Correct! The letter ${guessedLetters[guessedLetters.length - 1]} is in the word.` : 
            `Sorry, the letter ${guessedLetters[guessedLetters.length - 1]} is not in the word.`
          }
          You have {remainingGuesses} attempts left.
        </p>
        <p>Current word: {currentWord.split("").map(letter => 
          guessedLetters.includes(letter) ? letter + "." : "blank.")
          .join(" ")}
        </p>      
      </section>

      <section className="keyboard">{keyboardLetters}</section>

      {isGameOver && <button onClick={setNewGame}>New Game</button>}
    </main>
  )
}
