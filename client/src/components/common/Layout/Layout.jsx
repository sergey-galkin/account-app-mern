import React from 'react';
import { Outlet } from 'react-router-dom';
import css from './Layout.module.css'
import { useIdentificationQuery } from '../../../api/authApiSlice';
import Loader from '../../features/Loader/Loader';
import Header from '../../features/Header/Header';

const Layout = () => {
  const { isLoading } = useIdentificationQuery();
  return (
    <div className={css.container}>
      <Header />
      {isLoading 
        ? <Loader />
        : <Outlet />
      }
    </div>
  );
}

export default Layout;
