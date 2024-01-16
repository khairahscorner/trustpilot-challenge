import PropTypes from 'prop-types';

const Button = ({
  type,
  text,
  click,
  disabled,
  id,
  extraClasses,
  size,
}) => {
  return (
    <button
      id={id}
      disabled={disabled}
      onClick={click}
      className={`font-semibold rounded text-p2 text-center transition
        ${extraClasses}
        ${
          size === "big"
            ? `px-6 py-3`
            : size === "small"
            ? `px-4 py-2`
            : "px-4 py-2"
        }
        ${disabled ? `opacity-40 cursor-not-allowed` : `opacity-100`}
        ${
          type === "primary"
            ? `bg-primary text-white hover:bg-primary-bg`
            : type === "secondary"
            ? `bg-neutral-200 text-type-100 hover:bg-neutral-100`
            : "bg-primary text-white hover:bg-primary-bg"
        }`}
    >
      {text}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.oneOf(['primary', 'secondary']),
  text: PropTypes.string.isRequired,
  click: PropTypes.func,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  extraClasses: PropTypes.string,
  size: PropTypes.oneOf(['big', 'small']),
};

export default Button;
