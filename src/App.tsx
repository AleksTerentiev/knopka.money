import React from 'react';
import { Router } from '@reach/router';
import { AppBar } from 'view/app-bar';
import { Home } from './view/home/home';
import { Auth } from './view/auth/auth';

export const App: React.FC = () => {
  return (
    <>
      <AppBar />
      <Router>
        <Home path="/" default />
        <Auth path="/auth" />
      </Router>
    </>
  );
};

export default App;
