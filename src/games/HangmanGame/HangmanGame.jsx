// tools
import PropTypes from "prop-types";

// components
import HangmanFigure from "./components/HangmanFigure";

//styles
import styles from "./HangmanGame.module.css";

export default function HangmanGame({
  isGameFinished,
  setIsGameFinished,
  failedAttempts,
  setFailedAttempts,
  feedback,
  setFeedback,
  hiddenWord,
  wordCompletion,
  setWordCompletion,
  availableLetters,
  setAvailableLetters,
}) {
  const checkGameFinished = () => {
    if (wordCompletion === hiddenWord) {
      setIsGameFinished(true);
      setFeedback("You won! Congratulations!");
    } else if (failedAttempts === 9) {
      setIsGameFinished(true);
      setFeedback("You lost! Try again!");
    }
  };

  const revealAllOccurrences = (letter) => {
    const updateWordCompletion = wordCompletion.map((char, index) => {
      if (hiddenWord[index] === letter) {
        return hiddenWord[index];
      }
      return char;
    });

    setWordCompletion(updateWordCompletion);
  };

  const handlePlayerMove = (e) => {
    if (!isGameFinished) {
      const userGuess = e.currentTarget.textContent;

      if (hiddenWord.includes(userGuess)) {
        revealAllOccurrences(userGuess);
      } else {
        setFailedAttempts((prevAttempts) => prevAttempts + 1);
      }

      setAvailableLetters((prevLetters) =>
        prevLetters.map((char) => (char === userGuess ? " " : char)),
      );

      checkGameFinished();
    }
  };

  return (
    <div className={styles.gameWrapper}>
      <p className={styles.feedback}>{`> ${feedback} <`}</p>

      <div className={styles.placeholderWrapper}>
        {wordCompletion.map((char, index) => {
          return (
            <span key={index} className={styles.placeholderItem}>
              {char}
            </span>
          );
        })}
      </div>

      <HangmanFigure failedAttempts={failedAttempts} />

      <div className={styles.keyboardWrapper}>
        {availableLetters.map((letter, index) => {
          return (
            <button
              key={index}
              className={styles.keyboardKey}
              onClick={handlePlayerMove}
              disabled={letter === " " || isGameFinished}
            >
              {letter}
            </button>
          );
        })}
      </div>
    </div>
  );
}

HangmanGame.propTypes = {
  isGameFinished: PropTypes.bool.isRequired,
  setIsGameFinished: PropTypes.func.isRequired,
  failedAttempts: PropTypes.number.isRequired,
  setFailedAttempts: PropTypes.func.isRequired,
  feedback: PropTypes.string,
  setFeedback: PropTypes.func.isRequired,
  hiddenWord: PropTypes.arrayOf(PropTypes.string).isRequired,
  wordCompletion: PropTypes.arrayOf(PropTypes.string).isRequired,
  setWordCompletion: PropTypes.func.isRequired,
  availableLetters: PropTypes.arrayOf(PropTypes.string).isRequired,
  setAvailableLetters: PropTypes.func.isRequired,
};
