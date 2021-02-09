import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, makeStyles, Toolbar } from '@material-ui/core';
import SpeedIcon from '@material-ui/icons/Speed';
import HelpIcon from '@material-ui/icons/Help';
import { NavLink } from 'react-router-dom';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap'
  },
  drawerPaper: {
    width: drawerWidth,
  },
  text: {
    color: theme.palette.text.primary
  },
  icon: {
    color: theme.palette.common.black
  },
  activeLink: {
    color: theme.palette.primary.light,
    '& span': {
      color: theme.palette.primary.light
    },
    '& svg': {
      color: theme.palette.primary.light
    }
  }
}));

export default function SidebarNavigation() {
  const classes = useStyles();
  const customLink = React.forwardRef((props, ref) => <NavLink to={props.to} activeClassName={classes.activeLink} {...props} ref={ref} />);

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left">
      <Toolbar />
      <List>
        <ListItem button component={customLink} to="/dashboard">
          <ListItemIcon><SpeedIcon className={classes.icon} /></ListItemIcon>
          <ListItemText className={classes.text}>Dashboard</ListItemText>
        </ListItem>

        <ListItem button component={customLink} to="/support">
          <ListItemIcon><HelpIcon className={classes.icon} /></ListItemIcon>
          <ListItemText className={classes.text}>Support</ListItemText>
        </ListItem>
      </List>
    </Drawer>
  );
}