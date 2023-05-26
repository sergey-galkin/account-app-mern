import React, { useState } from 'react';
import css from './People.module.css';
import PageTemplate from '../../common/PageTemplate/PageTemplate';
import H1 from '../../common/H1/H1';
import Loader from '../../features/Loader/Loader';
import axios from 'axios';
import { createPortal } from 'react-dom';
import Modal from '../../features/Modal/Modal';
import AccountCard from '../../features/AccountCard/AccountCard';

const People = () => {
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  if (!isLoaded) {
    axios('/api/users')
      .then(res => {
        setUsers(res.data)
      })
      .catch(error => {
        console.error(error);
        setMessage('Something went wrong');
        setTimeout(() => setMessage(''), 1000);
      })
      .finally(() => {
        setIsLoaded(true);
      })
    ;
  }

  const cards = users.map(user => (
    <AccountCard key={user._id} {...user}/>
  ))  

  if (!isLoaded) return <Loader />;

  return (
    <>
      <PageTemplate>
        <H1>People</H1>
        <main className={css.main}>
          {cards}
        </main>
      </PageTemplate>
      {message && createPortal(
        <Modal>{message}</Modal>,
        document.body
      )}
    </>
 )
}

export default People