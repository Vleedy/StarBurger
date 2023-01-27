import React from 'react';
import { Link } from 'react-router-dom';

import cartEmptyImg from '../assets/img/empty-cart.png';

const CartEmpty = () => {
  return (
    <>
      <div className="cart cart--empty">
        <h2>
          Your Cart is empty <icon>😕</icon>
        </h2>
        <p>
          Most likely, you have not chosen anything.
          <br />
          To order burgers, go to the main page.
        </p>
        <img src={cartEmptyImg} alt="Empty cart" />
        <Link to="/" className="button button--black">
          <span>To main page</span>
        </Link>
      </div>
    </>
  );
};

export default CartEmpty;
