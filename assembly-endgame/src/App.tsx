import { useState } from "react"
import clsx from "clsx";
import { languages } from "./languages"
import { getFarewellText } from "./utils"

export default function Hangman() {
  const [currentWord, setCurrentWord] = useState("react")
  const [guessedLetters, setGuessedLetters] = useState<string[]>([])

  const wrongGuessCount: number = guessedLetters.filter(letter => !currentWord.includes(letter)).length
  const isLastGuessWrong = guessedLetters.length > 0 && !currentWord.includes(guessedLetters[guessedLetters.length - 1])

  const isGameWon: boolean = currentWord.split("").every(letter => guessedLetters.includes(letter))
  const isGameLost: boolean = wrongGuessCount === languages.length - 1
  const isGameOver: boolean = isGameWon || isGameLost
  const gameStatusClass = clsx({
    win: isGameWon, 
    loss: isGameLost,
    farewell: !isGameOver && isLastGuessWrong
  })

  const alphabet: string = "abcdefghijklmnopqrstuvwxyz"

  function addGuessedLetter(letter: string) {
    setGuessedLetters(prevLetters => 
      prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter]
    )
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
    const className = clsx(guessedLetters.includes(letter) && "correct-guess")
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
        return <span>{getFarewellText(languages[wrongGuessCount - 1].name)}</span>
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

  return (
    <main>
      <header>
        <span className="title">Assembly: Endgame</span>
        <span className="description">Guess the word in under 8 attempts to keep the programming world safe from Assembly!</span>
      </header>

      <section aria-live="polite" role="status" className={`status ${gameStatusClass}`}>
        {getGameStatus()}
      </section>

      <section className="language-chips">{chips}</section>

      <section className="guess-word">{guessWord}</section>

      {/* Combined visually-hidden aria-live region for status updates */}
      <section className="sr-only" aria-live="polite" role="status">
        <p>
          {currentWord.includes(guessedLetters[guessedLetters.length - 1]) ? 
            `Correct! The letter ${guessedLetters[guessedLetters.length - 1]} is in the word.` : 
            `Sorry, the letter ${guessedLetters[guessedLetters.length - 1]} is not in the word.`
          }
          You have {languages.length - 1} attempts left.
        </p>
        <p>Current word: {currentWord.split("").map(letter => 
          guessedLetters.includes(letter) ? letter + "." : "blank.")
          .join(" ")}
        </p>      
      </section>

      <section className="keyboard">{keyboardLetters}</section>

      {isGameOver && <button>New Game</button>}
    </main>
  )
}
