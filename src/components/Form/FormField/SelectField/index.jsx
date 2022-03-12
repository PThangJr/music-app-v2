import React from 'react';

const SelectField = () => {
  return (
    <form className="select-group">
      <select className="select-main" name="sort" id="">
        <option value={``} type="text" className="select-field">
          --------Sắp xếp--------
        </option>
        <option value={``} type="text" className="select-field">
          - Ngày tăng dần
        </option>
        <option value={``} type="text" className="select-field">
          - Ngày giảm dần
        </option>
        <option value={``} type="text" className="select-field">
          - Tên từ A-Z
        </option>
        <option value={``} type="text" className="select-field">
          - Tên từ Z-A
        </option>
        <option value={``} type="text" className="select-field">
          - Views tăng dần
        </option>
        <option value={``} type="text" className="select-field">
          - Views giảm dần
        </option>
      </select>
    </form>
  );
};

export default SelectField;
