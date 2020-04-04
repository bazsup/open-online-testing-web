import React from 'react';
import {
  BrowserRouter,
  Route,
  RouteComponentProps,
  Switch
} from 'react-router-dom';

import HomePage from './pages';
import IndividualFormPage from './pages/form/individual';
import CreateFormPage from './pages/form/create';

interface RouteType {
  path: string;
  exact?: boolean;
  nested?: RouteType[];
  component?: // eslint-disable-next-line @typescript-eslint/no-explicit-any
  React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
}

const routes: RouteType[] = [
  {
    path: '/',
    exact: true,
    component: HomePage
  },
  {
    path: '/form',
    nested: [
      {
        path: '/create',
        exact: true,
        component: CreateFormPage
      },
      {
        path: '/:id',
        component: IndividualFormPage
      }
    ]
  }
];

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      {routes.map((route) =>
        route.nested ? (
          <Switch key={route.path}>
            {route.nested.map((nestedRoute) => (
              <Route
                exact={nestedRoute.exact}
                path={`${route.path}${nestedRoute.path}`}
                key={`${route.path}${nestedRoute.path}`}
                component={nestedRoute.component}
              />
            ))}
          </Switch>
        ) : (
          <Route
            key={route.path}
            path={`${route.path}`}
            component={route.component}
            exact={route.exact}
          />
        )
      )}
    </BrowserRouter>
  );
};

export default Routes;
