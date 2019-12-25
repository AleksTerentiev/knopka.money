import React from 'react';
import { Router } from '@reach/router';
import { AppBar } from 'view/app-bar';
import { Home } from 'view/home/home';
import { Login } from 'view/account/login';
import { Investments } from 'view/investments/investments';
import { Refill } from 'view/refill/refill';
import { Affiliate } from 'view/affiliate/affiliate';

export const App: React.FC = () => {
  return (
    <>
      <AppBar />
      <Router>
        <Home path="/" default />
        <Login path="/login" />
        <Investments path="/investments" />
        <Refill path="/refill" />
        <Affiliate path="/affiliate" />
      </Router>
    </>
  );
};

export default App;
