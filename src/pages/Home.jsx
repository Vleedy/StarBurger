import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import BurgerBlock from '../components/BurgerBlock';
import Skeleton from '../components/BurgerBlock/Skeleton';
import Categories from '../components/Categories';
import Search from '../components/Search';
import Pagination from '../components/Pagination';
import noResults from '../assets/img/no-results.svg';

import { fetchBurgers } from '../redux/slices/burgerSlice';
import { selectFilter, setCategory } from '../redux/slices/filterSlice';

const Home = () => {
  const dispatch = useDispatch();
  const { category, searchValue, page } = useSelector(selectFilter);
  const { items, status } = useSelector((state) => state.burger);

  const onChangeCategory = (category) => {
    dispatch(setCategory(category));
  };
  const getBurgers = async () => {
    dispatch(
      fetchBurgers({
        category,
        searchValue,
        page,
      })
    );
  };

  useEffect(() => {
    getBurgers();
  }, [category, searchValue, page]);

  const burgers = items?.map((obj) => (
    <Link key={obj.id} to={`/burger/${obj.id}`}>
      <BurgerBlock {...obj} />
    </Link>
  ));
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={category} onChangeCategory={onChangeCategory} />
        <Search />
      </div>
      <h2 className="content__title">{category} Burgers</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Download error 😕</h2>
          <p>Failed to upload. Try again later.</p>
        </div>
      ) : (
        <div>
          <div className="content__items">
            {status === 'loading' ? (
              skeletons
            ) : burgers.length > 0 ? (
              burgers
            ) : (
              <div className="nothing-found__wrapper">
                <h2>
                  No results for "<span>{searchValue}</span>"
                </h2>
                <h4>Try checking your spelling please.</h4>
                <img width={100} src={noResults} alt="no-results" />
              </div>
            )}
          </div>
          {status === 'loading' || category !== 'All' || searchValue !== '' ? null : <Pagination />}
        </div>
      )}
    </div>
  );
};

export default Home;
