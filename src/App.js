import React from 'react';

import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Cart from './pages/Cart';
import AboutBurger from './pages/AboutBurger/AboutBurger';
import NotFound from './pages/NotFound';
import MainLayout from './layouts/MainLayout';
import OrderConfirmation from './pages/OrderConfirmation';

import './scss/app.scss';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="burger/:id" element={<AboutBurger />} />
        <Route path="confirm" element={<OrderConfirmation />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
