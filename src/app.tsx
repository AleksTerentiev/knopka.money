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
    function getParam(paramName: string) {
      const urlParams = new URLSearchParams(window.location.search)
      let param = urlParams.get(paramName)
      if (param) {
        localStorage.setItem(paramName, param)
        urlParams.delete(paramName)
        window.history.replaceState(null, '', String(urlParams) ? '?' + urlParams : '/')
      } else {
        param = localStorage.getItem(paramName)
      }
      return param
    }

    const referrerId = getParam('ref')
    const fbPixelId = getParam('pixel')

    if (account && (referrerId || fbPixelId)) {
      affiliateBind({ variables: { referrerId, fbPixelId } })
      localStorage.removeItem('ref')
      localStorage.removeItem('pixel')
    }

    if (account && (account?.fbPixelId || fbPixelId)) {
      ReactPixel.init(account?.fbPixelId || fbPixelId || '')
      ReactPixel.pageView()
    }
  }, [account])

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
