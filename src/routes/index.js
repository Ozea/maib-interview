import { lazy } from 'react';
import { Redirect } from 'react-router-dom';

export const routes = [
  {
    path: '/',
    exact: true,
    component: () => <Redirect to="/dashboard" />
  },
  {
    path: '/maib-interview/',
    exact: true,
    component: () => <Redirect to="/dashboard" />
  }, // This route is needed to redirect the user when visiting GitHub Pages
  {
    path: '/dashboard',
    component: lazy(() => import('../containers/Dashboard/Dashboard'))
  },
  {
    path: '/support',
    component: lazy(() => import('../containers/Support/Support'))
  }
];