
import React from 'react'

import AnnimatedCounter from './AnnimatedCounter'
import DoughnutChart from './DoughnutChart'

const TotalBalanceBox = ({accounts=[], totalBanks, totalCurrentBalance} : TotlaBalanceBoxProps) => {
  return (
    <div>
      <section className='total-balance'>
        <div className='total-balance-chart'>
          {/* Doughnut Chart */}
          <DoughnutChart accounts={accounts} />
        </div>

        <div className="flex flex-col gap-6">
          <h2 className='header-2'>
            Bank Accounts: {totalBanks} 
          </h2>
          <div className='flex flex-col gap-2'>
            <p className='total-balance-label'>
              Total Current Balance:
            </p>
            
            <div className='total-balance-amount flex-center gap-2'>
              {/* {formatAmount(totalCurrentBalance)} */}
              <AnnimatedCounter amount={totalCurrentBalance} />
            </div>

          </div>
        </div>

        

      </section>

    </div>
  )
}

export default TotalBalanceBox