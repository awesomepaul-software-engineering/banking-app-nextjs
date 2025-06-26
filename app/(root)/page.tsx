import HeaderBox from '@/components/HeaderBox'
import RightSideBar from '@/components/RightSideBar';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import React from 'react'

const Home = () => {

  const loggedIn = {
    firstName: 'Ifeoluwa',
    lastName: 'Paul',
    email: 'awesomepaul007@gmail.com'
  };

  return (

    <section className='home'>
      <div className='home-content'>
        <header className='home-header'>
          <HeaderBox 
            type='greeting' title='Welcome' 
            user={`${loggedIn?.firstName || 'Guest'}`} 
            subtext='Access and manage your account and transactions efficiently'
          />
          <TotalBalanceBox accounts={[]} totalBanks={1} totalCurrentBalance={1230.35} />
        </header> 

        RECENT TRANSACTION 
      </div>

      <RightSideBar 
        user={loggedIn} transsactions={[]} 
        banks={[{currentBalance: 123.1}, {currentBalance: 500.2}]} 
        />

    </section>



    

  )
}

export default Home
