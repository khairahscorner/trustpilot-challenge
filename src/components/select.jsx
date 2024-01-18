import PropTypes from "prop-types";

export const Select = ({
  label,
  selected,
  options,
  onChange,
  error,
  message,
  id,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700" htmlFor={id}>
        {label}
      </label>
      <select
        id={id}
        value={selected}
        onChange={onChange}
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-red-500">{message}</p>}
    </div>
  );
};

Select.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  selected: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.bool,
  message: PropTypes.string,
};
