import React from 'react'
import { makeStyles, Theme, createStyles, Container } from '@material-ui/core'
import { useQuery } from '@apollo/react-hooks'
import { GET_ACCOUNT } from 'queries'
import { GetAccount } from 'gql-types/GetAccount'
import { AppBar } from 'view/app-bar'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { Preloader } from 'view/preloader'
import { Landing } from 'view/landing'
import { Investments } from 'view/investments/investments'
import { Refill } from 'view/refill/refill'
import { Affiliate } from 'view/affiliate/affiliate'

export const App = () => {
  const { loading, data } = useQuery<GetAccount>(GET_ACCOUNT)
  const c = useStyles({})

  if (loading) {
    return <Preloader />
  }

  return (
    <Router>
      <AppBar />
      {data ? <Redirect from='/' to='/investments' /> : <Redirect to='/' />}
      {data ? (
        <Container className={c.container}>
          <Route path='/investments' component={Investments} />
          <Route path='/refill' component={Refill} />
          <Route path='/affiliate' component={Affiliate} />
        </Container>
      ) : (
        <Route path='/' exact component={Landing} />
      )}
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
