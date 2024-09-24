import { useState } from "react";

import TicTacToe from "./../../games/TicTacToe/TicTacToe";

import styles from "./TicTacToePage.module.css";

export default function TicTacToePage() {
  const [gameStarted, setGameStarted] = useState(false);

  return (
    <div className={styles.container}>
      {!gameStarted ? (
        <ul className={styles.instructions}>
          <li>{`> Click an empty cell to place your mark (X or 0).`}</li>
          <li>{`> Take turns with your opponent.`}</li>
          <li>{`> First to get three marks in a row wins.`}</li>
          <li>{`> If the grid is full and no winner, the game is a draw.`}</li>
          <li>{`> Click “Restart” to play again.`}</li>
        </ul>
      ) : null}

      <TicTacToe gameStarted={gameStarted} setGameStarted={setGameStarted} />
    </div>
  );
}
