import PropTypes from "prop-types";

export default function StartButton({ onClick, className }) {
  return (
    <button type="button" className={className} onClick={onClick}>
      Start
    </button>
  );
}

StartButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
};
