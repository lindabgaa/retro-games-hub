import TicTacToe from "./../../games/TicTacToe/TicTacToe";

import styles from "./TicTacToePage.module.css";

export default function TicTacToePage() {
  return (
    <div className={styles.container}>
      <div className={styles.flexGroup}>
        <div className={styles.instructions}>
          <h2>Instructions:</h2>
          <ul>
            <li>
              <span className={styles.subtitle}>Objective:</span> Get three of
              your marks (X or O) in a row, column, or diagonal.
            </li>
            <li>
              <span className={styles.subtitle}>Gameplay:</span>
              <ul>
                <li>Click an empty cell to place your mark.</li>
                <li>Take turns with your opponent.</li>
              </ul>
            </li>
            <li>
              <span className={styles.subtitle}>Winning:</span>
              <ul>
                <li>First to get three in a row wins.</li>
                <li>If the grid is full and no winner, the game is a draw.</li>
              </ul>
            </li>
            <li>
              <span className={styles.subtitle}>Restart:</span> Click “Restart”
              to play again.
            </li>
          </ul>
        </div>

        <TicTacToe />
      </div>

      <p className={styles.gameTitle}>TicTacToe</p>
    </div>
  );
}
