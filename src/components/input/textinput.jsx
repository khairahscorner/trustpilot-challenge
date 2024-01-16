import PropTypes from 'prop-types';

export const Textinput = ({
  autocomplete,
  label,
  inputid,
  message,
  iserror,
  disabled,
  rowType,
  labelClasses,
  inputClasses,
  ...rest
}) => {
  return (
    <div
      className={`${
        rowType ? "grid grid-cols-5 gap-2 items-center" : "flex flex-col"
      }`}
    >
      <label
        className={`text-sm font-medium text-type mb-1 capitalize ${
          rowType && `${labelClasses ? labelClasses : "col-span-1"} mr-2`
        }`}
        htmlFor={inputid}
      >
        {label}
      </label>
      <input
        className={`rounded placeholder-type-200 text-sm font-normal px-2 py-3 transition focus:border-type focus:ring-0
        ${iserror ? "border-status-danger" : "border-neutral-200"} ${
          disabled
            ? "border-gray-100 bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-neutral-300 text-type"
        }
        ${rowType && (inputClasses ? inputClasses : "col-span-4")}`}
        id={inputid}
        disabled={disabled}
        autoComplete={autocomplete || "off"}
        {...rest}
      />
      {iserror ? (
        <small className="text-[10px] text-left text-danger mt-1 col-span-5">{message}</small>
      ) : null}
    </div>
  );
};

Textinput.propTypes = {
  autocomplete: PropTypes.string,
  label: PropTypes.string.isRequired,
  inputid: PropTypes.string.isRequired,
  message: PropTypes.string,
  iserror: PropTypes.bool,
  disabled: PropTypes.bool,
  rowType: PropTypes.bool,
  labelClasses: PropTypes.string,
  inputClasses: PropTypes.string,
};