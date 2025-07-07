import Link from 'next/link'
import React from 'react'
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs'
import { BankTabItem } from './BankTabItem'
import BankInfo from './BankInfo'
import TransactionsTable from './TransactionsTable'

const RecentTransactions = ({
  accounts, transactions=[],
  appwriteItemId,page=1
}: RecentTransactionsProps) => {
  console.log('Accttt', accounts)
  return (
    <section className='recent-transactions'>
      <header className='flex item-center justify-between'>
        <h2 className='recent-transaction-label'>
          Recent Transactions
        </h2>
        <Link href={`transaction-history/?id=${appwriteItemId}`} className='view-all-btn'>View all</Link>
      </header>
 
      <Tabs defaultValue={appwriteItemId} className="w-full">
        <TabsList className='recent-transactions-tablist'>
          {accounts.map((acct: Account) => (
              <TabsTrigger key={acct.id} value={acct.appwriteItemId}>
                <BankTabItem account={acct} appwriteItemId={appwriteItemId} key={acct.id} />
              </TabsTrigger>
            )
          )}
        </TabsList>

        {accounts.map((acct: Account) => (
          <TabsContent 
            value={acct.appwriteItemId} 
            key={acct.id} 
            className='space-y-4'
          >
            <BankInfo
              account={acct}
              appwriteItemId={appwriteItemId}
              type='full'
            />

            <TransactionsTable transactions={transactions} />
          </TabsContent>
        ))}

      </Tabs>

    </section>

  )
}

export default RecentTransactions 