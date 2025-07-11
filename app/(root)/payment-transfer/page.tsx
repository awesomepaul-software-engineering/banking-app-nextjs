import HeaderBox from '@/components/HeaderBox'
import PaymentTransferForm from '@/components/PaymentTransferForm'
import { getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import React from 'react'
import { id } from 'zod/v4/locales';

const PaymentTransfer = async () => {

  const loggedIn = await getLoggedInUser();
  console.log('loggedInloggedIn', loggedIn)
  if (!loggedIn) return;

  const accounts = await getAccounts({ userId: loggedIn.$id});
  // console.log('Accountsss', accounts);

  if(!accounts) return;

  const accountsData = accounts?.data;

  return (
    <section className='payment-transfer'>

      <HeaderBox 
        title='Payment transfer'
        subtext='Please provide any specific details or notes related to the payment transfer'
      />

      <section className='size-full pt-5'>

        <PaymentTransferForm 
          accounts={accountsData}
        /> 

      </section>
      

    </section>
  )
}

export default PaymentTransfer