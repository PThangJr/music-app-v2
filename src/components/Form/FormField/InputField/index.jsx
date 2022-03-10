import classNames from "classnames";
import React from "react";
import "./styles.scss";
const InputField = (props) => {
  const {
    placeholder,
    type = "text",
    name,
    onChange = () => {},
    onFocus,
    className,
    disabled = false,
    selectedAllText,
    debounce,
    value,
    fullWidth,
    id,
    label,
    error = "",
    register = {},
  } = props;
  const handleChangeInput = (e) => {
    const { name, value } = e.target;

    onChange({ [name]: value }, e);
  };
  const handleFocus = (e) => {
    if (typeof onFocus === "function") {
      onFocus(e);
    }
  };
  return (
    <div className="input-group">
      {label && (
        <label className="input-label" htmlFor={(!disabled && id) || ""}>
          {label}
        </label>
      )}
      <input
        {...register}
        type={type}
        placeholder={placeholder}
        id={id}
        name={name}
        disabled={disabled}
        className={classNames(
          "input-field",
          { [className]: className },
          { "input-field--error": error },
          { "input-field--full-width": fullWidth }
        )}
        onChange={handleChangeInput}
        value={value}
        onFocus={handleFocus}
      />
      {error && (
        <small className={classNames("input-error")}>{`(*) ${error}`}</small>
      )}
    </div>
  );
};

export default InputField;
