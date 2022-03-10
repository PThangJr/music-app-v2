import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./styles.scss";
const CardSkeletons = (props) => {
  const {
    totalItems = 0,
    className,
    // cols = { xl: 2, lg: 6, md: 4, sm: 3, xs: 2 },
    col = { xl: 2, lg: 3, md: 3, sm: 4, xs: 6 },
  } = props;
  const arr = [];
  for (let i = 0; i < totalItems; i++) {
    arr.push(i);
  }
  // const { xl, lg, md, sm, xs } = cols;
  return (
    <div
      className={classNames(
        "row"
        // { [`row-cols-xs-${xs}`]: xs },
        // { [`row-cols-sm-${sm}`]: sm },
        // { [`row-cols-md-${md}`]: md },
        // { [`row-cols-lg-${lg}`]: lg },
        // { [`row-cols-xl-${xl}`]: xl }
      )}
    >
      {arr.map((item, index) => {
        return (
          <div
            key={index + "name"}
            className={classNames(
              "col col-6",
              { [`col-sm-${col.sm}`]: col.sm },
              { [`col-md-${col.md}`]: col.md },
              { [`col-lg-${col.lg}`]: col.lg },
              { [`col-xl-${col.xl}`]: col.xl }
            )}
          >
            <div className="card-skeleton">
              <div className="card-skeleton__loader"></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

CardSkeletons.propTypes = {
  className: PropTypes.string,
  totalItems: PropTypes.number,
};

export default CardSkeletons;
