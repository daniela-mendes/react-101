import { useState } from "react"
import clsx from "clsx";
import { languages } from "./languages"

export default function Hangman() {
  const [currentWord, setCurrentWord] = useState("react")
  const [guessedLetters, setGuessedLetters] = useState<string[]>([])

  const wrongGuessCount: number = guessedLetters.filter(letter => !currentWord.includes(letter)).length

  const isGameWon: boolean = currentWord.split("").every(letter => guessedLetters.includes(letter))
  const isGameLost: boolean = wrongGuessCount === languages.length - 1
  const isGameOver: boolean = isGameWon || isGameLost

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
      onClick={() => addGuessedLetter(letter)}
    >{letter.toUpperCase()}</button>
  })

  return (
    <main>
      <header>
        <span className="title">Assembly: Endgame</span>
        <span className="description">Guess the word in under 8 attempts to keep the programming world safe from Assembly!</span>
      </header>

      <section className="status win">
        <span style={{"fontSize": "20px"}}>You win!</span>
        <span>Well done! 🎉</span>
      </section>

      <section className="language-chips">{chips}</section>

      <section className="guess-word">{guessWord}</section>

      <section className="keyboard">{keyboardLetters}</section>

      {isGameOver && <button>New Game</button>}
    </main>
  )
}
