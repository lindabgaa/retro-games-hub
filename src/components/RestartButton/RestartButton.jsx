import PropTypes from "prop-types";

export default function RestartButton({ onClick, className }) {
  return (
    <button type="button" className={className} onClick={onClick}>
      Restart
    </button>
  );
}

RestartButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
};
