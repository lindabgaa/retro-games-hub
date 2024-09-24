import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import styles from "./../Buttons.module.css";

export default function ExitButton({ className }) {
  const navigate = useNavigate();

  const handleGoToHome = () => {
    navigate("/");
  };

  return (
    <button
      type="button"
      className={`${className} ${styles.button} ${styles.exit}`}
      onClick={handleGoToHome}
      aria-label="go back to homepage"
    >
      <span className={styles.span1}>{`<-|`}</span>
      <span className={styles.span2}>Exit</span>
    </button>
  );
}

ExitButton.propTypes = {
  className: PropTypes.string,
};
