import { Link } from "react-router-dom";

import styles from "./HomePage.module.css";

export default function HomePage() {
  return (
    <div className={styles.container}>
      <div className={styles.loadingDots}>
        <div className={styles.dot}>.</div>
        <div className={styles.dot}>.</div>
        <div className={styles.dot}>.</div>
      </div>
      <nav>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link
              to="/Hangman"
              className={styles.link}
              aria-label="Play Hangman game"
            >
              Hangman
            </Link>
          </li>

          <li className={styles.navItem}>
            <Link
              to="/Mastermind"
              className={styles.link}
              aria-label="Play Mastermind game"
            >
              Mastermind
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link
              to="/TicTacToe"
              className={styles.link}
              aria-label="Play TicTacToe game"
            >
              TicTacToe
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
