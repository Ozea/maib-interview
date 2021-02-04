import { AppBar, Button, makeStyles, Toolbar, Typography } from '@material-ui/core';
import { AccountBalanceOutlined } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
    textTransform: 'capitalize',
    '& svg': {
      fontSize: '1.75rem',
      marginRight: theme.spacing(2)
    }
  },
  logout: {
    fontSize: '1.1rem',
    textTransform: 'capitalize'
  }
}));

export default function TopBar() {
  const [pageTitle, setPageTitle] = useState('');
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    if (!pageTitle) {
      setPageTitle(history.location.pathname.slice(1));
    }

    history.listen(listener => {
      let pathname = listener.pathname.slice(1);
      setPageTitle(pathname);
    });

  }, [history, pageTitle]);

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h5" className={classes.title}>
          <AccountBalanceOutlined />
          {pageTitle}
        </Typography>
        <Button color="inherit" className={classes.logout}>Logout</Button>
      </Toolbar>
    </AppBar>
  );
}