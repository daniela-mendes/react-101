import { useState } from "react"
import clsx from "clsx";
import { languages } from "./languages"

export default function Hangman() {
  
  const [guessedLetters, setGuessedLetters] = useState<string[]>([])
  function addGuessedLetter(letter: string) {
    setGuessedLetters(prevLetters => 
      prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter]
    )
  }

  const chips = languages.map(lang => (
    <span
      key={lang.name}
      style={{"backgroundColor": lang.backgroundColor, "color": lang.color}}
    >{lang.name}</span>
  ))

  const [currentWord, setCurrentWord] = useState("react")
  const currentWordArray = currentWord.split("")
  const guessWord = currentWordArray.map((letter, index) => (
    <span key={index}>{letter.toUpperCase()}</span>
  ))

  const alphabet = "abcdefghijklmnopqrstuvwxyz"
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

      <button>New Game</button>
    </main>
  )
}
