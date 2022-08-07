import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './styles.scss';

const Sort = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleChangeSelect = (e) => {
    navigate(e.target.value);
  };

  return (
    <select className="select-main" name="sort" id="" onChange={handleChangeSelect} value={location.search || ''}>
      <option value="" type="text" className="select-field">
        ----Sắp xếp----
      </option>
      <option value={`?sort=-createdAt`} type="text" className="select-field">
        1. Bài hát mới
      </option>
      <option value={`?sort=slug`} type="text" className="select-field">
        2. Tên từ A-Z
      </option>
      <option value={`?sort=-slug`} type="text" className="select-field">
        3. Tên từ Z-A
      </option>
      <option value={`?sort=views`} type="text" className="select-field">
        4. Views tăng dần
      </option>
      <option value={`?sort=-views`} type="text" className="select-field">
        5. Views giảm dần
      </option>
    </select>
  );
};

export default Sort;
