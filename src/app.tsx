import React from 'react';
import { Router } from '@reach/router';
import { AppBar } from 'view/app-bar';
import { Home } from 'view/home/home';
import { Login } from 'view/auth/login';
import { Investments } from 'view/investments/investments';

export const App: React.FC = () => {
  return (
    <>
      <AppBar />
      <Router>
        <Home path="/" default />
        <Login path="/login" />
        <Investments path="/investments" />
      </Router>
    </>
  );
};

export default App;
