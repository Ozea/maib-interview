import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom';
import { LinearProgress } from '@material-ui/core';
import { routes } from '../routes';

export default function AdminLayout() {
  return (
    <Suspense fallback={<LinearProgress />}>
      <Router>
        <div>
          <Link to="/dashboard" style={{ marginRight: 15 }}>Dashboard</Link>
          <Link to="/support">Support</Link>
        </div>

        <Switch>
          {routes.map((route, index) => <Route key={index} exact path={route.path} component={route.component} />)}
        </Switch>
      </Router>
    </Suspense>
  );
}