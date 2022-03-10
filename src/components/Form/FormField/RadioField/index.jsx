import classNames from 'classnames';
import React from 'react';
import './styles.scss';

const RadioField = (props) => {
  const { name = '', id = '', className = '', label = '', value = '' } = props;
  return (
    <div className="radio-group">
      <input type="radio" name={name} id={id} className={classNames('radio-field', { [className]: className })} />
      <label className="radio-label" htmlFor={id}>
        {label}
      </label>
    </div>
  );
};

export default RadioField;
