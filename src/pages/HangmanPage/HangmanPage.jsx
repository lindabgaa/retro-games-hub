import { useState } from "react";

import { generateRandomWord } from "./utils";

import ExitButton from "./../../components/ExitButton/ExitButton";
import RestartButton from "./../../components/RestartButton/RestartButton";
import StartButton from "./../../components/StartButton/StartButton";
import HangmanGame from "./../../games/HangmanGame/HangmanGame";

import styles from "./HangmanPage.module.css";

export default function HangmanPage() {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [hiddenWord, setHiddenWord] = useState([]);
  const [wordCompletion, setWordCompletion] = useState([]);
  const [availableLetters, setAvailableLetters] = useState("ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""));
  const [failedAttempts, setFailedAttempts] = useState(0);

  const resetGame = () => {
    setIsGameFinished(false);
    setFeedback("Game On! Start Guessing your first letter!");

    const randomWord = generateRandomWord();
    setHiddenWord(randomWord);

    setWordCompletion(randomWord.map(() => "_"));

    setAvailableLetters("ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""));
    setFailedAttempts(0);
  };

  const handleGameStart = () => {
    setIsGameStarted(true);
    resetGame();
  };

  const handleGameRestart = () => {
    resetGame();
  };

  return (
    <div className={styles.contentWrapper}>
      {!isGameStarted ? (
        <>
          <ul className={styles.instructionsList}>
            <li>{`> A secret word is randomly generated.`}</li>
            <li>{`> Underscores (_) represent each letter in the word.`}</li>
            <li>{`> Click to guess one letter at a time.`}</li>
            <li>{`> Parts are added to the hangman for incorrect guesses.`}</li>
            <li>{`> Guess all letters before the hangman is fully drawn.`}</li>
            <li>{`> If the hangman is complete, you lose.`}</li>
            <li>{`> Click “Restart” to play again with a new word.`}</li>
          </ul>
          <div className={styles.controlsWrapper}>
            <ExitButton />
            <StartButton onClick={handleGameStart} />
          </div>
        </>
      ) : (
        <>
          <HangmanGame
            isGameFinished={isGameFinished}
            setIsGameFinished={setIsGameFinished}
            failedAttempts={failedAttempts}
            setFailedAttempts={setFailedAttempts}
            feedback={feedback}
            setFeedback={setFeedback}
            hiddenWord={hiddenWord}
            wordCompletion={wordCompletion}
            setWordCompletion={setWordCompletion}
            availableLetters={availableLetters}
            setAvailableLetters={setAvailableLetters}
          />
          <div className={styles.controlsWrapper}>
            <ExitButton />
            <RestartButton onClick={handleGameRestart} />
          </div>
        </>
      )}
    </div>
  );
}
