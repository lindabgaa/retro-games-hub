import { useState } from "react";

import { randomPlayer } from "./utils.js";

import HomeButton from "./../../components/HomeButton/HomeButton";
import RestartButton from "./../../components/RestartButton/RestartButton";
import StartButton from "./../../components/StartButton/StartButton";

import styles from "./TicTacToe.module.css";

export default function TicTacToe() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState(null);

  const handleStart = () => {
    setGameStarted(true);

    const player = randomPlayer();
    setCurrentPlayer(player);

    setFeedbackMessage(`Game On! Player ${player}'s turn`);
  };

  const handleRestart = () => {
    setGameFinished(false);

    const player = randomPlayer();
    setCurrentPlayer(player);

    setFeedbackMessage(`Game On! Player ${player}'s turn`);
  };

  return (
    <>
      <div className={styles.buttonContainer}>
        {!gameStarted ? (
          <>
            <StartButton onClick={handleStart} />
          </>
        ) : gameFinished ? (
          <>
            <RestartButton onClick={handleRestart} />
          </>
        ) : null}
        <HomeButton />
      </div>

      <div className={styles.feedback}>
        <p className={styles.feedbackText}>
          {feedbackMessage ? `> ${feedbackMessage} <` : null}
        </p>
      </div>

      {gameStarted ? (
        <div className={styles.grid}>
          <div className={styles.cell}></div>
          <div className={styles.cell}></div>
          <div className={styles.cell}></div>
          <div className={styles.cell}></div>
          <div className={styles.cell}></div>
          <div className={styles.cell}></div>
          <div className={styles.cell}></div>
          <div className={styles.cell}></div>
          <div className={styles.cell}></div>
        </div>
      ) : null}
    </>
  );
}
