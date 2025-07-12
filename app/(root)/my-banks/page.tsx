import BankCard from '@/components/BankCard';
import HeaderBox from '@/components/HeaderBox'
import { getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import React from 'react'

const MyBanks = async ({}) => {

  const loggedIn = await getLoggedInUser();
  console.log('loggedInloggedIn', loggedIn)
  if (!loggedIn) return;

  const accounts = await getAccounts({ userId: loggedIn.$id});
  // console.log('Accountsss', accounts);

  if(!accounts) return;

  return (
    <section className='flex'>
      <div className='my-banks'>
        <HeaderBox 
          title='My Bank Accounts'
          subtext='Effortlessly manage your banking activities'
        />

        <div className='space-y-4'>

          <h2 className='header-2'>
            Your cards
          </h2>

          <div className= 'flex flex-wrap gap-6'>
            {
              accounts && accounts.data.map((acct: Account) => (
                <BankCard 
                  key={acct.id}
                  account={acct}
                  userName={loggedIn?.firstName}
                />
              ))
            } 
          </div>

        </div>
      </div>
    </section>
  )
}

export default MyBanks