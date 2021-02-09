import { lazy } from 'react';
import { Redirect } from 'react-router-dom';

export const routes = [
  {
    path: '/',
    exact: true,
    component: () => <Redirect to="/dashboard" />
  },
  {
    path: '/dashboard',
    component: lazy(() => import('../containers/Dashboard/Dashboard'))
  },
  {
    path: '/support',
    component: lazy(() => import('../containers/Support/Support'))
  }
];