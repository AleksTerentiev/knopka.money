import React from 'react'
import { useAccount } from 'gql'
import { Container } from '@material-ui/core'
import { AppBar } from 'view/app-bar'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { Preloader } from 'view/preloader'
import { Landing } from 'view/landing'
import { InvestmentsPage } from 'view/investments/investments-page'
import { RefillPage } from 'view/billing/refill-page'
import { AffiliatePage } from 'view/affiliate/affiliate-page'
import { PayoutPage } from 'view/billing/payout-page'
import { Footer } from 'view/footer'

export function App() {
  const { account, loading } = useAccount()

  if (loading) {
    return <Preloader />
  }

  return (
    <Router>
      <AppBar />
      {account ? (
        <Container>
          <Route path='/' exact component={InvestmentsPage} />
          <Route path='/refill' component={RefillPage} />
          <Route path='/affiliate' component={AffiliatePage} />
          <Route path='/payout' component={PayoutPage} />
        </Container>
      ) : (
        <>
          <Redirect to='/' />
          <Route path='/' exact component={Landing} />
        </>
      )}
      <Footer />
    </Router>
  )
}

export default App
