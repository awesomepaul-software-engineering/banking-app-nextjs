import HeaderBox from '@/components/HeaderBox'
import RightSideBar from '@/components/RightSideBar';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import React from 'react'

const Home = async () => {

  // const loggedIn = {
  //   firstName: 'Ifeoluwa',
  //   lastName: 'Paul',
  //   email: 'awesomepaul007@gmail.com'
  // };

  const loggedIn = await getLoggedInUser();



  return (

    <section className='home'>
      <div className='home-content'>
        <header className='home-header'>
          <HeaderBox 
            type='greeting' title='Welcome' 
            user={`${loggedIn?.name.split(' ')[1] || 'Guest'}`} 
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
