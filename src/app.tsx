import React, { useEffect } from 'react'
import { useAccount, useAffiliateBind } from 'gql'
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
  const { account, loading } = useAccount()
  const [affiliateBind] = useAffiliateBind()

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const refParamName = 'ref'
    let referrerId = urlParams.get(refParamName)
    if (referrerId) {
      localStorage.setItem(refParamName, referrerId)
      urlParams.delete(refParamName)
      window.history.replaceState(null, '', String(urlParams) ? '?' + urlParams : '/')
    } else {
      referrerId = localStorage.getItem(refParamName)
    }
    if (account && referrerId) {
      affiliateBind({ variables: { referrerId } })
      localStorage.removeItem(refParamName)
    }
  }, [account])

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const pixelParamName = 'pixel'
    let pixelId = urlParams.get(pixelParamName)
    if (pixelId) {
      localStorage.setItem(pixelParamName, pixelId)
      urlParams.delete(pixelParamName)
      window.history.replaceState(null, '', String(urlParams) ? '?' + urlParams : '/')
    } else {
      pixelId = localStorage.getItem(pixelParamName)
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
