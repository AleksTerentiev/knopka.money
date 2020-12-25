import React from 'react';
import { useAccount } from 'gql';
import { Container } from '@material-ui/core';
import { AppBar } from 'components/app-bar';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Preloader } from 'components/preloader';
import { Landing } from 'components/landing';
import { InvestmentsPage } from 'components/investments/investments-page';
import { RefillPage } from 'components/billing/refill-page';
import { AffiliatePage } from 'components/affiliate/affiliate-page';
import { PayoutPage } from 'components/billing/payout-page';
import { Footer } from 'components/footer';

export function App() {
  const { account, loading } = useAccount();

  if (loading) {
    return <Preloader />;
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
  );
}

export default App;
