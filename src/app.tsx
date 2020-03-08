import React, { useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { GET_ACCOUNT, AFFILIATE_BIND } from 'queries'
import { GetAccount } from 'gql-types/GetAccount'
import ReactPixel from 'react-facebook-pixel'
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

export const App = () => {
  const { loading, data: accountData } = useQuery<GetAccount>(GET_ACCOUNT)
  const [affiliateBind] = useMutation(AFFILIATE_BIND)

  useEffect(() => {
    let referrerId = new URLSearchParams(window.location.search).get('ref')
    if (referrerId) {
      localStorage.setItem('ref', referrerId)
    } else {
      referrerId = localStorage.getItem('ref')
    }
    if (accountData && referrerId) {
      affiliateBind({ variables: { referrerId } })
      localStorage.removeItem('ref')
    }
  }, [accountData])

  useEffect(() => {
    let pixelId = new URLSearchParams(window.location.search).get('pixel')
    if (pixelId) {
      localStorage.setItem('pixel', pixelId)
    } else {
      pixelId = localStorage.getItem('pixel')
    }
    if (pixelId) {
      ReactPixel.init(pixelId)
      ReactPixel.pageView()
    }
  }, [])

  if (loading) {
    return <Preloader />
  }

  return (
    <Router>
      <AppBar />
      {accountData ? (
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
