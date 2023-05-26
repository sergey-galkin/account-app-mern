import React, { memo } from 'react'
import css from './AccountCard.module.css'

const AccountCard = memo(({name, birthDate, photoFileName}) => {
  return (
    <div className={css.container}>
      <div className={css.photo} style={{backgroundImage: `url(/images/accounts/${photoFileName})`}} />
      <ul className={css.list}>
        <li>{name}</li>
        <li>{new Date(birthDate).toLocaleDateString()}</li>
      </ul>
    </div>
  )
})

export default AccountCard