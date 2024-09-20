import PropTypes from "prop-types";
import { useEffect, useState } from "react";

import {
  checkAllCellsFilled,
  checkValidCombination,
  randomPlayer,
} from "./utils.js";

import ExitButton from "../../components/ExitButton/ExitButton.jsx";
import RestartButton from "../../components/RestartButton/RestartButton.jsx";
import StartButton from "../../components/StartButton/StartButton.jsx";

import styles from "./TicTacToe.module.css";

export default function TicTacToe({ gameStarted, onGameStart }) {
  const [gameBoard, setGameBoard] = useState([
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "],
  ]);

  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [hasFirstMoveBeenMade, setHasFirstMoveBeenMade] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState(null);

  // Start Game Button - initializes the game
  const handleGameStart = () => {
    onGameStart();

    // Randomly assigns the first player to start
    const player = randomPlayer();
    setCurrentPlayer(player);
  };

  // Restart Game Button - resets the game board and game states
  const handleGameRestart = () => {
    setGameFinished(false);
    setHasFirstMoveBeenMade(false);
    setFeedbackMessage(null);

    // Reset game board to its initial empty state
    setGameBoard(
      gameBoard.map((row) => {
        return row.map(() => " ");
      })
    );

    // Assign a new random player to start after restarting the game
    const player = randomPlayer();
    setCurrentPlayer(player);
  };

  // Check if the game is finished (win or draw)
  const checkGameFinished = (gameBoard, currentPlayer) => {
    const isWinner = checkValidCombination(gameBoard, currentPlayer);
    const isDraw = checkAllCellsFilled(gameBoard, currentPlayer) && !isWinner;

    if (isWinner || isDraw) {
      setGameFinished(true);

      if (isWinner) {
        setFeedbackMessage(
          `Congratulations! Player ${currentPlayer} wins the game!`
        );
      } else {
        setFeedbackMessage(`It's a draw!`);
      }
    }
  };

  // Function to update the game board when a player makes a move
  const updateBoard = (gameBoard, targetRow, targetColumn) => {
    return gameBoard.map((row, rIndex) => {
      if (rIndex === targetRow) {
        return row.map((cell, cIndex) => {
          return cIndex === targetColumn ? currentPlayer : cell;
        });
      }
      return row;
    });
  };

  // Handle player's move on the board
  const handlePlayerMove = (e) => {
    // Only allow moves if the game is still ongoing
    if (!gameFinished) {
      if (!hasFirstMoveBeenMade) {
        setHasFirstMoveBeenMade(true);
      }

      // Get the row and column of the clicked cell
      const targetRow = parseInt(e.target.getAttribute("data-r"));
      const targetColumn = parseInt(e.target.getAttribute("data-c"));

      // Ensure the clicked cell is empty
      if (gameBoard[targetRow][targetColumn] === " ") {
        const newBoard = updateBoard(gameBoard, targetRow, targetColumn);

        setGameBoard(newBoard);

        checkGameFinished(newBoard, currentPlayer);

        // If the game isn't finished, switch to the next player
        if (!gameFinished) {
          setCurrentPlayer((prevPlayer) => (prevPlayer === "X" ? "O" : "X"));
        }
      }
    }
  };

  useEffect(() => {
    if (gameStarted) {
      if (!gameFinished) {
        if (!hasFirstMoveBeenMade) {
          setFeedbackMessage(`Game On! Player ${currentPlayer} is starting`);
        } else {
          setFeedbackMessage(`Player ${currentPlayer}'s turn`);
        }
      }
    }
  }, [gameStarted, hasFirstMoveBeenMade, currentPlayer, gameFinished]);

  return (
    <>
      <div className={styles.buttonContainer}>
        <ExitButton />
        {!gameStarted ? (
          <>
            <StartButton onClick={handleGameStart} />
          </>
        ) : gameFinished ? (
          <>
            <RestartButton onClick={handleGameRestart} />
          </>
        ) : null}
      </div>

      <div className={styles.feedback}>
        <p className={styles.feedbackText}>
          {feedbackMessage ? `> ${feedbackMessage} <` : null}
        </p>
      </div>

      {gameStarted ? (
        <div className={styles.gameBoard} onClick={handlePlayerMove}>
          {gameBoard.map((row, rIndex) => {
            return row.map((cell, cIndex) => {
              return (
                <div
                  key={`${rIndex}-${cIndex}`}
                  data-r={`${rIndex}`}
                  data-c={`${cIndex}`}
                  className={styles.gameCell}
                >
                  <span>{cell}</span>
                </div>
              );
            });
          })}
        </div>
      ) : null}
    </>
  );
}

TicTacToe.propTypes = {
  gameStarted: PropTypes.bool.isRequired,
  onGameStart: PropTypes.func.isRequired,
};
