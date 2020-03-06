import React, { useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { GET_ACCOUNT, AFFILIATE_BIND } from 'queries'
import { GetAccount } from 'gql-types/GetAccount'
import { Container } from '@material-ui/core'
import { AppBar } from 'view/app-bar'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { Preloader } from 'view/preloader'
import { Landing } from 'view/landing'
import { Investments } from 'view/investments/investments'
import { Refill } from 'view/refill'
import { Affiliate } from 'view/affiliate/affiliate'
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

  if (loading) {
    return <Preloader />
  }

  return (
    <Router>
      <AppBar />
      {accountData ? (
        <Container>
          <Route path='/' exact component={Investments} />
          <Route path='/refill' component={Refill} />
          <Route path='/affiliate' component={Affiliate} />
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
