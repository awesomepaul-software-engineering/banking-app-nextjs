import HeaderBox from '@/components/HeaderBox'
import RecentTransactions from '@/components/RecentTransactions';
import RightSideBar from '@/components/RightSideBar';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import { getAccount, getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import React from 'react'

const Home = async ({ searchParams: {id, page}}: SearchParamProps ) => {
  const currentPage =  Number(page as string) || 1;

  const loggedIn = await getLoggedInUser();
  console.log('loggedInloggedIn', loggedIn)
  if (!loggedIn) return;

  const accounts = await getAccounts({ userId: loggedIn.$id});
  // console.log('Accountsss', accounts);

  if(!accounts) return;

  const accountsData = accounts?.data;
  const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;
  console.log('appwriteItemId', appwriteItemId)
  // Only fetch account if we have a valid appwriteItemId
  const account = appwriteItemId ? await getAccount({ appwriteItemId }) : null;
  // console.log({accountsData, account})

  return (

    <section className='home'>
      <div className='home-content'>
        <header className='home-header'>
          <HeaderBox 
            type='greeting' title='Welcome' 
            user={`${loggedIn?.firstName || 'Guest'}`} 
            subtext='Access and manage your account and transactions efficiently'
          />
          <TotalBalanceBox 
            accounts={accountsData} totalBanks={accounts?.totalBanks} 
            totalCurrentBalance={accounts?.totalCurrentBalance} 
          />
        </header>
        
        <RecentTransactions 
          accounts={accountsData}
          transactions={account?.transactions}
          appwriteItemId={appwriteItemId}
          page={currentPage}
        />
      </div>

      <RightSideBar 
        user={loggedIn} transactions={account?.transactions} 
        banks={accountsData?.slice(0,2)} 
      />

    </section>



    

  )
}

export default Home
