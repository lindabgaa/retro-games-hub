// import tools
import { useState } from "react";

// import utils
import { randomPlayer } from "../../games/TicTacToe/utils";

// import components
import ExitButton from "./../../components/ExitButton/ExitButton";
import RestartButton from "./../../components/RestartButton/RestartButton";
import StartButton from "./../../components/StartButton/StartButton";
import TicTacToe from "./../../games/TicTacToe/TicTacToe";

// import styles
import styles from "./TicTacToePage.module.css";

export default function TicTacToePage() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [gameBoard, setGameBoard] = useState([
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "],
  ]);
  const [currentPlayer, setCurrentPlayer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [hasFirstMoveBeenMade, setHasFirstMoveBeenMade] = useState(false);

  const [winningCells, setWinningCells] = useState([]);

  // Start Game Button - initializes the game
  const handleGameStart = () => {
    setGameStarted(true);

    // Randomly assigns the first player to start
    const player = randomPlayer();
    setCurrentPlayer(player);

    setFeedback(`Game On! Player ${player} is starting`);
  };

  // Restart Game Button - resets game states
  const handleGameRestart = () => {
    setGameFinished(false);
    setHasFirstMoveBeenMade(false);
    setWinningCells([]);

    setGameBoard(
      gameBoard.map((row) => {
        return row.map(() => " ");
      }),
    );

    const player = randomPlayer();
    setCurrentPlayer(player);

    setFeedback(`Game On! Player ${player} is starting`);
  };

  return (
    <div className={styles.contentWrapper}>
      {!gameStarted ? (
        <>
          <ul className={styles.instructionsList}>
            <li>{`> Click an empty cell to place your mark (X or 0).`}</li>
            <li>{`> Take turns with your opponent.`}</li>
            <li>{`> First to get three marks in a row wins.`}</li>
            <li>{`> If the grid is full and no winner, the game is a draw.`}</li>
            <li>{`> Click “Restart” to play again.`}</li>
          </ul>
          <div className={styles.controlsWrapper}>
            <ExitButton />
            <StartButton onClick={handleGameStart} />
          </div>
        </>
      ) : (
        <>
          <TicTacToe
            gameStarted={gameStarted}
            gameFinished={gameFinished}
            setGameFinished={setGameFinished}
            gameBoard={gameBoard}
            setGameBoard={setGameBoard}
            currentPlayer={currentPlayer}
            setCurrentPlayer={setCurrentPlayer}
            feedback={feedback}
            setFeedback={setFeedback}
            hasFirstMoveBeenMade={hasFirstMoveBeenMade}
            setHasFirstMoveBeenMade={setHasFirstMoveBeenMade}
            winningCells={winningCells}
            setWinningCells={setWinningCells}
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
