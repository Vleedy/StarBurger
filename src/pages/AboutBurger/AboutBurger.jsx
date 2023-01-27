import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { addItem } from '../../redux/slices/cartSlice';
import { useDispatch } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import SkeletonAboutBurger from './SkeletonAboutBurger';
import 'swiper/css';
import star from '../../assets/img/star.svg';
import styles from './AboutBurger.module.scss';

const sizes = ['Standart', 'Large'];

const AboutBurger = () => {
  const [burger, setBurger] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeSize, setActiveSize] = useState('Standart');

  const onClickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const item = {
      id: burger.id,
      images: burger.images,
      name: burger.name,
      price: burger.price,
      activeSize,
    };
    dispatch(addItem(item));
  };

  const chooseSize = (e, size) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveSize(size);
  };

  useEffect(() => {
    async function fetchBurger() {
      try {
        const { data } = await axios.get(
          'https://6374a19f48dfab73a4e42878.mockapi.io/burgers/' + id
        );
        setBurger(data);
      } catch (error) {
        alert('Error requesting data from the server.');
        navigate('/');
      }
    }
    fetchBurger();
  }, []);
  return (
    <div className="container">
      {burger ? (
        <div className={styles.wrapper}>
          <img width={'40%'} src={burger.images[1].lg} alt="burger" />
          <div className={styles.description__wrapper}>
            <div className={styles.rating}>
              <h3 className={styles.rating__number}>{burger.rating}/5</h3>
              <img className={styles.rating__star} width={18} src={star} alt="star" />
            </div>
            <h2 className={styles.title}>{burger.name}</h2>
            <h4 className={styles.subtitle}>{burger.desc}</h4>
            <Swiper slidesPerView={'auto'} spaceBetween={20} className={styles.ingredients}>
              {burger.ingredients.map((item) => (
                <SwiperSlide key={item.id} className={styles.slide}>
                  <img
                    className={styles.ingredients__image}
                    width={60}
                    src={item.img}
                    title={item.name}
                    alt={item.name}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className={styles.controlpanel}>
              <div className={styles.choosesize__wrapper}>
                <h4 className={styles.choosesize__text}>Choose size: </h4>
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
              </div>
              <div className={styles.add__wrapper}>
                <Link to="/" className={styles.button_back}>
                  <span>To main page</span>
                </Link>
                <button onClick={(e) => onClickAdd(e)} className={styles.button_add}>
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
                </button>
                <span className={styles.price}>
                  {activeSize === 'Standart' ? burger.price : (burger.price * 1.5).toFixed(2)}$
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <SkeletonAboutBurger />
      )}
    </div>
  );
};

export default AboutBurger;
