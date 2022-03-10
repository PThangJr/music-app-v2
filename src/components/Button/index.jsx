import classnames from "classnames";
import React from "react";
import "./styles.scss";
const Button = (props) => {
  const {
    value = "",
    children,
    type = "default",
    style = {},
    fullWidth,
    disabled = false,
    className = "",
    onClick = () => {},
    styles = {},
  } = props;
  return (
    <button
      type={type}
      style={styles}
      className={classnames(
        "btn",
        { "btn--full-width": fullWidth },
        { "btn--disabled": disabled },
        { [className]: className }
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {children || value}
    </button>
  );
};

export default Button;
