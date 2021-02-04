import React, { Suspense } from 'react';
import { CssBaseline, LinearProgress, makeStyles, ThemeProvider } from '@material-ui/core';
import SidebarNavigation from '../components/SidebarNavigation/SidebarNavigation';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import TopBar from '../components/TopBar/TopBar';
import { routes } from '../routes';
import theme from '../theme/theme';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  progressBar: {
    position: 'fixed',
    zIndex: 1201,
    width: '100%',
    left: 0,
    top: 0
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3)
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  }
}));

export default function AdminLayout() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className={classes.root}>
          <CssBaseline />
          <TopBar />
          <SidebarNavigation />
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Suspense fallback={<LinearProgress className={classes.progressBar} />}>
              <Switch>
                {routes.map((route, index) => <Route key={index} exact path={route.path} component={route.component} />)}
              </Switch>
            </Suspense>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}