import React from 'react';
import './css/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './components/Pages/Index/Index';
import NotFound from './components/Pages/NotFound/NotFound';
import Account from './components/Pages/Account/Account';
import People from './components/Pages/People/People';
import Layout from './components/Pages/Layout/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Index />} />
          <Route path='/account' element={<Account />} />
          <Route path='/people' element={<People />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
