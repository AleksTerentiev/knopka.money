import React, { useEffect } from 'react'
import { makeStyles, Theme, createStyles, Container } from '@material-ui/core'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { GET_ACCOUNT, AFFILIATE_BIND } from 'queries'
import { GetAccount } from 'gql-types/GetAccount'
import { AppBar } from 'view/app-bar'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { Preloader } from 'view/preloader'
import { Landing } from 'view/landing'
import { Investments } from 'view/investments/investments'
import { Refill } from 'view/refill'
import { Affiliate } from 'view/affiliate/affiliate'
import { Footer } from 'view/footer'

export const App = () => {
  const c = useStyles({})
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
      {accountData ? <Redirect from='/' to='/investments' /> : <Redirect to='/' />}
      {accountData ? (
        <Container className={c.container}>
          <Route path='/investments' component={Investments} />
          <Route path='/refill' component={Refill} />
          <Route path='/affiliate' component={Affiliate} />
        </Container>
      ) : (
        <Route path='/' exact component={Landing} />
      )}
      <Footer />
    </Router>
  )
}

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      paddingTop: 36,
      paddingBottom: 36,
      [theme.breakpoints.up('sm')]: {
        paddingTop: 56,
        paddingBottom: 56,
      },
      [theme.breakpoints.up('md')]: {
        paddingTop: 76,
        paddingBottom: 76,
      },
      [theme.breakpoints.up('lg')]: {
        paddingTop: 116,
        paddingBottom: 116,
      },
    },
  })
)

export default App
