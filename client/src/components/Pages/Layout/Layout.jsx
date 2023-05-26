import React from 'react';
import { Outlet } from 'react-router-dom';
import { useIdentificationQuery } from '../../../api/authApiSlice';
import Loader from '../../features/Loader/Loader';
import Header from '../../features/Header/Header';
import Footer from '../../features/Footer/Footer';

const Layout = () => {
  const { isLoading } = useIdentificationQuery();
  return (
    <>
      <Header />
      {isLoading 
        ? <Loader />
        : <Outlet />
      }
      <Footer />
    </>
  );
}

export default Layout;
