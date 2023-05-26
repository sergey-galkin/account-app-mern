import React, { memo } from 'react'
import css from './AccountCard.module.css'

const getAge = (birthDateString) => {
  const birth = new Date(birthDateString);
  const today = new Date();

  let age = today.getFullYear() - birth.getFullYear() - 1;
  if (today.getMonth() - birth.getMonth() > 0) age++;
  if (
    today.getMonth() === birth.getMonth() &&
    today.getDate() - birth.getDate() >= 0
  ) age++;

  return age + ' year' + (age === 1 ? '' : 's');
}

const AccountCard = memo(({name, birthDate, photoFileName}) => {
  
  const imageUrl = 'url(/images/accounts/' + photoFileName;
  const age = getAge(birthDate);

  return (
    <div className={css.container}>
      <div className={css.photo} style={{backgroundImage: `${imageUrl}`}} />
      <ul className={css.list}>
        <li>{name}</li>
        <li>{age}</li>
      </ul>
    </div>
  )
})

export default AccountCard