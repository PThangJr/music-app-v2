import PropTypes from "prop-types";
import React from "react";
import "./styles.scss";

const TextareaField = (props) => {
  const handleChange = (e) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  const {
    placeholder = "",
    id = "",
    name = "",
    rows = "",
    max = "",
    cName,
    disabled,
    onChange,
    value = "",
  } = props;
  return (
    <textarea
      placeholder={placeholder}
      name={name}
      id={id}
      // maxLength={maxLength || 700}
      rows={rows || 5}
      max={max || 20}
      className={"textarea-field " + cName}
      disabled={disabled}
      value={value}
      onChange={handleChange}
    />
  );
};

TextareaField.propTypes = {
  placeholder: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  maxLength: PropTypes.string,
  rows: PropTypes.string,
  max: PropTypes.string,
  cName: PropTypes.string,
  disabled: PropTypes.bool,
};

export default TextareaField;
