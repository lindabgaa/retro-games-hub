import PropTypes from "prop-types";
import { useEffect, useState } from "react";

import { checkAllCellsFilled, checkValidCombination } from "./utils.js";

import styles from "./TicTacToe.module.css";

export default function TicTacToe({
  gameStarted,
  gameFinished,
  setGameFinished,
  gameBoard,
  setGameBoard,
  currentPlayer,
  setCurrentPlayer,
  hasFirstMoveBeenMade,
  setHasFirstMoveBeenMade,
  feedback,
  setFeedback,
  winningCells,
  setWinningCells,
}) {
  const [hoveredCell, setHoveredCell] = useState({ r: null, c: null });

  // Check if the game is finished (win or draw)
  const checkGameFinished = (gameBoard, currentPlayer) => {
    const winningCombination = checkValidCombination(gameBoard, currentPlayer);
    const isDraw = checkAllCellsFilled(gameBoard, currentPlayer) && !winningCombination;

    if (winningCombination || isDraw) {
      setGameFinished(true);

      if (winningCombination) {
        setFeedback(`Congratulations! Player ${currentPlayer} wins the game!`);

        setWinningCells(winningCombination);
      } else {
        setFeedback(`It's a draw!`);
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
    if (!gameFinished) {
      setFeedback(`Player ${currentPlayer}'s turn`);
    }
  }, [currentPlayer, gameFinished, setFeedback]);

  return (
    <div className={styles.gameWrapper}>
      {gameStarted ? (
        <>
          <p className={styles.feedback}>{feedback ? `> ${feedback} <` : null}</p>

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
    </div>
  );
}

TicTacToe.propTypes = {
  gameStarted: PropTypes.bool.isRequired,
  gameFinished: PropTypes.bool.isRequired,
  setGameFinished: PropTypes.func.isRequired,
  gameBoard: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string.isRequired).isRequired)
    .isRequired,
  setGameBoard: PropTypes.func.isRequired,
  currentPlayer: PropTypes.string.isRequired,
  setCurrentPlayer: PropTypes.func.isRequired,
  hasFirstMoveBeenMade: PropTypes.bool.isRequired,
  setHasFirstMoveBeenMade: PropTypes.func.isRequired,
  feedback: PropTypes.string.isRequired,
  setFeedback: PropTypes.func.isRequired,
  winningCells: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  setWinningCells: PropTypes.func.isRequired,
};
