import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import exitIcon from "./../../assets/exit-icon.svg";

import styles from "./../Buttons.module.css";

export default function HomeButton({ className }) {
  const navigate = useNavigate();

  const handleGoToHome = () => {
    navigate("/");
  };

  return (
    <button
      type="button"
      className={`${className} ${styles.button}`}
      onClick={handleGoToHome}
    >
      <img
        src={exitIcon}
        alt="Exit Icon"
        aria-hidden="true"
        className={styles.icon}
      />
      <span>Home</span>
    </button>
  );
}

HomeButton.propTypes = {
  className: PropTypes.string,
};
