import React, { useCallback, useMemo } from 'react';
import css from './Pagination.module.css';
import { useGetTodosQuery } from '../../../api/todosApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../common/Button/Button';
import { setSkip } from '../Table/tableSlice';

const Pagination = () => {
  const params = useSelector(state => state.table);
  const { data, refetch } = useGetTodosQuery(params);
  const { limit, skip } = useSelector(state => state.table);
  const dispatch = useDispatch();

  const changePage = useCallback((index) => {
    dispatch(setSkip(index * limit));
    refetch();
  }, []);

  const amount = data ? data.amount : 0;
  const pagesAmount = Math.ceil(amount / limit);
  const currentPage = skip / limit;

  const buttons = useMemo(
    () => {
      const elems = Array(pagesAmount).fill(null);
      return elems.map((k ,i) => {
        const key = Math.random();
        const classNameArr = [css.page];
        let handleClick = () => changePage(i);
        if (i === currentPage) {
          classNameArr.push(css.currentPage);
          handleClick = null;
        }

        return <Button key={key} classesArr={classNameArr} caption={i + 1} handleClick={handleClick} />
      })
    }, [skip, amount]
  );

  return (
    <div className={css.pagination}>
      {buttons}
    </div>
  )
}

export default Pagination