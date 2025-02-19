import { useState } from "react"
import { languages } from "./languages"

export default function Hangman() {
  
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
  const keyboardLetters = alphabet.split("").map(letter => (
    <button key={letter}>{letter.toUpperCase()}</button>
  ))

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
