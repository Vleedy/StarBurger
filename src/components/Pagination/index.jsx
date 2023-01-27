import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectFilter, setPage } from '../../redux/slices/filterSlice';
import styles from './Pagination.module.scss';

const Pagination = () => {
  const dispatch = useDispatch();
  const { page } = useSelector(selectFilter);

  const onClickForward = () => {
    dispatch(setPage(1));
  };
  const onClickBack = () => {
    dispatch(setPage(-1));
  };
  return (
    <div className={styles.wrapper}>
      <button disabled={page === 1} onClick={() => onClickBack()} className={styles.back}></button>
      <div className={styles.page}>
        <h2>{page}</h2>
      </div>
      <button
        disabled={page === 3}
        onClick={() => onClickForward()}
        className={styles.forward}></button>
    </div>
  );
};

export default Pagination;
