import PropTypes from "prop-types";
import { useRef, useState } from "react";

import { randomPlayer } from "./utils.js";

import HomeButton from "../../components/HomeButton/HomeButton.jsx";
import RestartButton from "../../components/RestartButton/RestartButton.jsx";
import StartButton from "../../components/StartButton/StartButton.jsx";

import styles from "./TicTacToe.module.css";

export default function TicTacToe({ gameStarted, onGameStart }) {
  const [gameFinished, setGameFinished] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState(null);

  const gameBoardDisplay = useRef();

  const [gameBoard, setGameBoard] = useState([
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "],
  ]);

  const handleGameStart = () => {
    onGameStart();

    const player = randomPlayer();
    setCurrentPlayer(player);

    setFeedbackMessage(`Game On! Player ${player}'s turn`);
  };

  const handleGameRestart = () => {
    setGameFinished(false);

    //reset gameBoard
    setGameBoard(
      gameBoard.map((row) => {
        return row.map(() => " ");
      })
    );

    const player = randomPlayer();
    setCurrentPlayer(player);

    setFeedbackMessage(`Game On! Player ${player}'s turn`);
  };

  const handleGameBoardClick = (e) => {
    const targetRow = parseInt(e.target.getAttribute("data-r"));
    const targetColumn = parseInt(e.target.getAttribute("data-c"));

    if (gameBoard[targetRow][targetColumn] === " ") {
      setGameBoard((prevBoard) =>
        prevBoard.map((row, rIndex) => {
          if (rIndex === targetRow) {
            return row.map((cell, cIndex) => {
              return cIndex === targetColumn ? currentPlayer : cell;
            });
          }
          return row;
        })
      );
    }

    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  return (
    <>
      <div className={styles.buttonContainer}>
        {!gameStarted ? (
          <>
            <StartButton onClick={handleGameStart} />
          </>
        ) : gameFinished ? (
          <>
            <RestartButton onClick={handleGameRestart} />
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
        <div
          className={styles.gameBoard}
          ref={gameBoardDisplay}
          onClick={handleGameBoardClick}
        >
          <div data-r="0" data-c="0" className={styles.gameCell}>
            <span>{gameBoard[0][0]}</span>
          </div>
          <div data-r="0" data-c="1" className={styles.gameCell}>
            <span>{gameBoard[0][1]}</span>
          </div>
          <div data-r="0" data-c="2" className={styles.gameCell}>
            <span>{gameBoard[0][2]}</span>
          </div>
          <div data-r="1" data-c="0" className={styles.gameCell}>
            <span>{gameBoard[1][0]}</span>
          </div>
          <div data-r="1" data-c="1" className={styles.gameCell}>
            <span>{gameBoard[1][1]}</span>
          </div>
          <div data-r="1" data-c="2" className={styles.gameCell}>
            <span>{gameBoard[1][2]}</span>
          </div>
          <div data-r="2" data-c="0" className={styles.gameCell}>
            {gameBoard[2][0]}
          </div>
          <div data-r="2" data-c="1" className={styles.gameCell}>
            {gameBoard[2][1]}
          </div>
          <div data-r="2" data-c="2" className={styles.gameCell}>
            {gameBoard[2][2]}
          </div>
        </div>
      ) : null}
    </>
  );
}

TicTacToe.propTypes = {
  gameStarted: PropTypes.bool.isRequired,
  onGameStart: PropTypes.func.isRequired,
};
