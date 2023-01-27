import React from 'react';
import { useSelector } from 'react-redux';
function Categories({ value, onChangeCategory }) {
  const categories = ['All', 'Chicken', 'Vegetarian', 'Fish'];
  const { searchValue } = useSelector((state) => state.filter);
  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, i) => (
          <button
            disabled={searchValue}
            key={i}
            onClick={() => onChangeCategory(categoryName)}
            className={value === categoryName ? 'active' : ''}>
            {categoryName}
          </button>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
