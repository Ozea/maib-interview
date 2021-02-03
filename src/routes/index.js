import { lazy } from 'react';

export const routes = [
  {
    path: '/dashboard',
    component: lazy(() => import('../containers/Dashboard/Dashboard'))
  },
  {
    path: '/support',
    component: lazy(() => import('../containers/Support/Support'))
  }
];