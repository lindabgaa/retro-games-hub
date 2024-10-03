// tools
import PropTypes from "prop-types";

// styles
import styles from "./HangmanFigure.module.css";

export default function HangmanFigure({ failedAttempts }) {
  return (
    <div className={styles.figureWrapper}>
      <div
        className={styles.pole}
        style={{ display: failedAttempts >= 1 ? "block" : "none" }}
      ></div>
      <div
        className={styles.crossbeam}
        style={{ display: failedAttempts >= 3 ? "block" : "none" }}
      ></div>
      <div
        className={styles.rope}
        style={{ display: failedAttempts >= 4 ? "block" : "none" }}
      ></div>
      <div className={styles.body} style={{ display: failedAttempts >= 5 ? "flex" : "none" }}>
        <div
          className={styles.head}
          style={{ display: failedAttempts >= 5 ? "block" : "none" }}
        ></div>
        <div
          className={styles.torso}
          style={{ display: failedAttempts >= 6 ? "block" : "none" }}
        ></div>
        <div className={styles.arms} style={{ display: failedAttempts >= 7 ? "flex" : "none" }}>
          <div
            className={styles.leftArm}
            style={{ display: failedAttempts >= 7 ? "block" : "none" }}
          ></div>
          <div
            className={styles.rightArm}
            style={{ display: failedAttempts >= 8 ? "block" : "none" }}
          ></div>
        </div>
        <div className={styles.legs} style={{ display: failedAttempts >= 9 ? "flex" : "none" }}>
          <div
            className={styles.leftLeg}
            style={{ display: failedAttempts >= 9 ? "block" : "none" }}
          ></div>
          <div
            className={styles.rightLeg}
            style={{ display: failedAttempts >= 10 ? "block" : "none" }}
          ></div>
        </div>
      </div>
      <div
        className={styles.base}
        style={{ display: failedAttempts >= 2 ? "block" : "none" }}
      ></div>
    </div>
  );
}

HangmanFigure.propTypes = {
  failedAttempts: PropTypes.number.isRequired,
};
