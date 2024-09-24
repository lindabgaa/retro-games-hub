import PropTypes from "prop-types";
import { useEffect, useState } from "react";

import { checkAllCellsFilled, checkValidCombination, randomPlayer } from "./utils.js";

import ExitButton from "./../../components/ExitButton/ExitButton";
import RestartButton from "./../../components/RestartButton/RestartButton";
import StartButton from "./../../components/StartButton/StartButton";

import styles from "./TicTacToe.module.css";

export default function TicTacToe({ gameStarted, setGameStarted }) {
  const [gameBoard, setGameBoard] = useState([
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "],
  ]);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [gameFinished, setGameFinished] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState(null);
  const [hasFirstMoveBeenMade, setHasFirstMoveBeenMade] = useState(false);

  const [hoveredCell, setHoveredCell] = useState({ r: null, c: null });
  const [winningCells, setWinningCells] = useState([]);

  // Start Game Button - initializes the game
  const handleGameStart = () => {
    setGameStarted(true);

    // Randomly assigns the first player to start
    const player = randomPlayer();
    setCurrentPlayer(player);
  };

  // Restart Game Button - resets the game board and game states
  const handleGameRestart = () => {
    setGameFinished(false);
    setHasFirstMoveBeenMade(false);
    setWinningCells([]);
    setFeedbackMessage(`Game On! Player ${currentPlayer} is starting`);

    setGameBoard(
      gameBoard.map((row) => {
        return row.map(() => " ");
      }),
    );

    const player = randomPlayer();
    setCurrentPlayer(player);
  };

  // Check if the game is finished (win or draw)
  const checkGameFinished = (gameBoard, currentPlayer) => {
    const winningCombination = checkValidCombination(gameBoard, currentPlayer);
    const isDraw = checkAllCellsFilled(gameBoard, currentPlayer) && !winningCombination;

    if (winningCombination || isDraw) {
      setGameFinished(true);
      console.log(winningCombination);

      if (winningCombination) {
        setFeedbackMessage(`Congratulations! Player ${currentPlayer} wins the game!`);

        setWinningCells(winningCombination);
      } else {
        setFeedbackMessage(`It's a draw!`);
      }
    }
  };

  //
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
    e.stopPropagation();

    // Only allow moves if the game is still ongoing
    if (!gameFinished) {
      if (!hasFirstMoveBeenMade) {
        setHasFirstMoveBeenMade(true);
      }

      // Get the row and column of the clicked cell
      const targetRow = parseInt(e.currentTarget.getAttribute("data-r"), 10);
      const targetColumn = parseInt(e.currentTarget.getAttribute("data-c"), 10);

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
    <div className={styles.gameContainer}>
      {gameStarted ? (
        <>
          <p className={styles.feedback}>{feedbackMessage ? `> ${feedbackMessage} <` : null}</p>

          <div className={styles.gameBoard}>
            {gameBoard.map((row, rIndex) => {
              return row.map((cell, cIndex) => {
                const isWinningCell = winningCells.includes(`${rIndex}-${cIndex}`);
                return (
                  <div
                    key={`${rIndex}-${cIndex}`}
                    data-r={rIndex}
                    data-c={cIndex}
                    onClick={handlePlayerMove}
                    className={`${styles.gameCell} ${
                      gameFinished
                        ? winningCells.length > 0
                          ? isWinningCell
                            ? styles.winningCell
                            : ""
                          : styles.drawCell
                        : ""
                    }`}
                    onMouseEnter={() => {
                      setHoveredCell({ r: rIndex, c: cIndex });
                    }}
                    onMouseLeave={() => {
                      setHoveredCell({ r: null, c: null });
                    }}
                  >
                    <span
                      className={
                        cell === " " && hoveredCell.r === rIndex && hoveredCell.c === cIndex
                          ? styles.prev
                          : styles.mark
                      }
                    >
                      {!gameFinished &&
                      cell === " " &&
                      hoveredCell.r === rIndex &&
                      hoveredCell.c === cIndex
                        ? currentPlayer
                        : cell}
                    </span>
                  </div>
                );
              });
            })}
          </div>
        </>
      ) : null}

      <div className={styles.buttonContainer}>
        <ExitButton />
        {!gameStarted ? (
          <StartButton onClick={handleGameStart} />
        ) : (
          <RestartButton onClick={handleGameRestart} />
        )}
      </div>
    </div>
  );
}

TicTacToe.propTypes = {
  gameStarted: PropTypes.bool.isRequired,
  setGameStarted: PropTypes.func.isRequired,
};
