import PropTypes from "prop-types";

import styles from "./../Buttons.module.css";

export default function RestartButton({ onClick, className }) {
  return (
    <button
      type="button"
      className={`${className} ${styles.button}`}
      onClick={onClick}
    >
      Restart
    </button>
  );
}

RestartButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
};
