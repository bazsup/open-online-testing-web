import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import HomePage from './pages';
import IndividualFormPage from './pages/form/individual';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Route path="/" exact component={HomePage} />
      <Route path="/form/:id" component={IndividualFormPage} />
    </BrowserRouter>
  );
};

export default Routes;
