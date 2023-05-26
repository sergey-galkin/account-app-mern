import React, { useMemo, useState } from 'react';
import css from './Account.module.css';
import PageTemplate from '../../common/PageTemplate/PageTemplate';
import H1 from '../../common/H1/H1';
import AccountCard from '../../features/AccountCard/AccountCard';
import { useIdentificationQuery } from '../../../api/authApiSlice';
import Button from '../../common/Button/Button';
import EditUserForm from '../../features/Forms/EditUserForm/EditUserForm';

const Account = () => {
  const {data: user} = useIdentificationQuery();
  const [editMode, setEditMode] = useState(false);

  const buttonsHandlers = useMemo(() => {
    return {
      enableEditMode: () => setEditMode(true),
      disableEditMode: () => setEditMode(false),
    }
  }, [])

  return (
    <>
      <PageTemplate>
        <H1>Account</H1>
        <main className={css.main}>
          {editMode 
            ?
            <EditUserForm hideForm={buttonsHandlers.disableEditMode} />
            : 
            <>
              <AccountCard {...user}/>
              <Button classesArr={[css.editBtn]} kind='positive' onClick={buttonsHandlers.enableEditMode}>Edit</Button>
            </>
          }
        </main>
      </PageTemplate>
    </>
 )
}

export default Account