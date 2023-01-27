import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addItem, selectCartItemById } from '../../redux/slices/cartSlice';

const sizes = ['Standart', 'Large'];

function BurgerBlock({ desc, id, images, ingredients, name, price, veg }) {
  const dispatch = useDispatch();
  const [activeSize, setActiveSize] = React.useState('Standart');
  const cartItem = useSelector(selectCartItemById(id, activeSize));
  const addedCount = cartItem ? cartItem.count : 0;

  const onClickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const item = {
      id,
      images,
      name,
      price,
      activeSize,
    };
    dispatch(addItem(item));
  };

  const chooseSize = (e, size) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveSize(size);
  };

  return (
    <div className="burger-block-wrapper">
      <div className="burger-block">
        <img className="burger-block__image" src={images[1].lg} alt="burger" />
        <h4 className="burger-block__title">{name}</h4>
        <div className="burger-block__selector">
          <ul>
            {sizes.map((size) => (
              <li
                key={size}
                onClick={(e) => chooseSize(e, size)}
                className={activeSize === size ? 'active' : ''}>
                {size}
              </li>
            ))}
          </ul>
        </div>
        <div className="burger-block__bottom">
          <div className="burger-block__price">
            {' '}
            {activeSize === 'Standart' ? price : (price * 1.5).toFixed(2)} $
          </div>
          <button onClick={(e) => onClickAdd(e)} className="button button--outline button--add">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Add to cart</span>
            {addedCount > 0 && <i>{addedCount}</i>}
          </button>
        </div>
      </div>
    </div>
  );
}

export default BurgerBlock;
