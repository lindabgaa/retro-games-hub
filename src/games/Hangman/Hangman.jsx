import PropTypes from "prop-types";
import styles from "./Hangman.module.css";

export default function Hangman({
  isGameStarted,
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
    }

    console.log(failedAttempts);
  };

  return (
    <div className={styles.gameWrapper}>
      {isGameStarted ? (
        <>
          <p className={styles.feedback}>{feedback ? `> ${feedback} <` : null}</p>

          <div className={styles.placeholderWrapper}>
            {wordCompletion.map((char, index) => {
              return (
                <span key={index} className={styles.placeholderItem}>
                  {char}
                </span>
              );
            })}
          </div>

          <div className={styles.hangmanWrapper}>
            <div className={styles.gallow}>
              <div
                className={`${styles.pole} ${failedAttempts >= 1 ? styles.show : styles.hidden}`}
              ></div>
              <div
                className={`${styles.crossbeam} ${failedAttempts >= 3 ? styles.show : styles.hidden}`}
              ></div>
              <div
                className={`${styles.rope} ${failedAttempts >= 4 ? styles.show : styles.hidden}`}
              ></div>
              <div
                className={`${styles.body} ${failedAttempts >= 5 ? styles.show : styles.hidden}`}
              >
                <div
                  className={`${styles.head} ${failedAttempts >= 5 ? styles.show : styles.hidden}`}
                ></div>
                <div
                  className={`${styles.torso} ${failedAttempts >= 6 ? styles.show : styles.hidden}`}
                ></div>
                <div
                  className={`${styles.arms} ${failedAttempts >= 7 ? styles.show : styles.hidden}`}
                >
                  <div
                    className={`${styles.leftArm} ${failedAttempts >= 7 ? styles.show : styles.hidden}`}
                  ></div>
                  <div
                    className={`${styles.rightArm} ${failedAttempts >= 8 ? styles.show : styles.hidden}`}
                  ></div>
                </div>
                <div
                  className={`${styles.legs} ${failedAttempts >= 9 ? styles.show : styles.hidden}`}
                >
                  <div
                    className={`${styles.leftLeg} ${failedAttempts >= 9 ? styles.show : styles.hidden}`}
                  ></div>
                  <div
                    className={`${styles.rightLeg} ${failedAttempts >= 10 ? styles.show : styles.hidden}`}
                  ></div>
                </div>
              </div>
              <div
                className={`${styles.base} ${failedAttempts >= 2 ? styles.show : styles.hidden}`}
              ></div>
            </div>
          </div>

          <div className={styles.keyboardWrapper}>
            {availableLetters.map((letter, index) => {
              return (
                <button
                  key={index}
                  className={styles.keyboardKey}
                  onClick={handlePlayerMove}
                  disabled={letter === " "}
                >
                  {letter}
                </button>
              );
            })}
          </div>
        </>
      ) : null}
    </div>
  );
}

Hangman.propTypes = {
  isGameStarted: PropTypes.bool.isRequired,
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
