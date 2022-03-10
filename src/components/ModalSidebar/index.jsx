import classNames from "classnames";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./styles.scss";
const ModalSidebar = ({
  children,
  direction = "left-to-right",
  isOpen,
  onClose,
  className,
}) => {
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    setIsActive(isOpen);
  }, [isOpen]);

  if (isOpen === null) {
    return null;
  }
  const handleClose = () => {
    if (onClose) {
      setIsActive(false);
      onClose();
    }
  };
  const handleTransitionEnd = () => {
    // console.log("end");
  };
  return ReactDOM.createPortal(
    <div
      className={classNames("modal-sidebar", {
        active: isActive,
        [`${direction}`]: direction,
        [className]: className,
      })}
    >
      <div className="modal-sidebar-overlay" onClick={handleClose}></div>
      <div
        className={classNames("modal-sidebar-main", { active: isActive })}
        onTransitionEnd={handleTransitionEnd}
      >
        <span className="modal-sidebar-main-close" onClick={handleClose}>
          <i className="fa-solid fa-xmark"></i>
        </span>
        {children}
      </div>
    </div>,
    document.querySelector("#root")
  );
};

export default ModalSidebar;
