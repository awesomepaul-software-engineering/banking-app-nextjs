import Link from 'next/link'
import React from 'react'
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs'
import { BankTabItem } from './BankTabItem'
import BankInfo from './BankInfo'
import TransactionsTable from './TransactionsTable'
import { Pagination } from './Pagination'

const RecentTransactions = ({
  accounts, transactions=[],
  appwriteItemId,page=1
}: RecentTransactionsProps) => {
  
  // Pagination logic
  // Assuming transactions is an array of transaction objects
  // and page is the current page number (1-indexed)
  // For example, if you want to show 10 transactions per page:
  const rowsPerPage = 10;
  const totalPages = Math.ceil(transactions.length / rowsPerPage);
  const indexOfLastTransactionPerPage = page * rowsPerPage;
  const indexOfFirstTransactionPerPage = indexOfLastTransactionPerPage - rowsPerPage;

  const currentTransactions = transactions.slice(indexOfFirstTransactionPerPage, indexOfLastTransactionPerPage);

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

            <TransactionsTable transactions={currentTransactions} />

            {totalPages > 1 && (
              <Pagination totalPages={totalPages} page={page} />
            )}
            

          </TabsContent>
        ))}

      </Tabs>

    </section>

  )
}

export default RecentTransactions 