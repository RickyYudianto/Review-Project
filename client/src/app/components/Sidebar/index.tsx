import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import makeStyles from '@material-ui/core/styles/makeStyles';
import classNames from 'classnames';
import clsx from 'clsx';
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const SIDEBAR_DRAWER_WIDTH = 240;
const useStyles = makeStyles(theme => ({
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '0 16px',
    cursor: 'pointer',
    ...theme.mixins.toolbar,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: SIDEBAR_DRAWER_WIDTH,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  item: {
    position: 'relative',
    display: 'block',
    textDecoration: 'none',
    '&:hover,&:focus,&:visited,&': {
      color: 'inherit',
    },
  },
  itemText: {
    fontSize: '18px',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.67,
    letterSpacing: 'normal',
    color: 'rgba(0, 0, 0, 0.54)',
    fontWeight: 'bold',
  },
  menuActive: {
    background: theme.palette.primary.main,
    color: '#ffffff',
    transition: theme.transitions.create('background-color', {
      duration: theme.transitions.duration.shortest,
    }),
    '&:hover': {
      textDecoration: 'none',
      background: theme.palette.primary.dark,
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        background: theme.palette.primary.main,
      },
    },
  },
  menuActiveText: {
    color: '#fff',
  },
}));

interface IProps {
  open: boolean;
  routes: any[];
}

export function Sidebar(props: IProps) {
  const { open, routes } = props;
  const location = useLocation();
  const classes = useStyles();

  const activeRoute = (routeName: any) => {
    return location.pathname.indexOf(routeName) > -1;
  };

  const links = (
    <List disablePadding>
      <div>
        {routes.map((prop: any, key: any) => (
          <NavLink
            title={prop.name}
            to={prop.base + prop.path}
            activeClassName="active"
            key={key}
            className={classNames(
              classes.item,
              activeRoute(prop.base + prop.path) ? classes.menuActive : '',
            )}
          >
            <ListItem button>
              <ListItemIcon
                className={
                  activeRoute(prop.base + prop.path)
                    ? classes.menuActiveText
                    : ''
                }
              >
                {typeof prop.icon === 'string' ? (
                  <Icon>{prop.icon}</Icon>
                ) : (
                  <prop.icon />
                )}
              </ListItemIcon>
              <ListItemText>
                <span
                  className={classNames(
                    classes.itemText,
                    activeRoute(prop.base + prop.path)
                      ? classes.menuActiveText
                      : '',
                  )}
                >
                  {prop.name}
                </span>
              </ListItemText>
            </ListItem>
          </NavLink>
        ))}
      </div>
    </List>
  );

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
      }}
      open={open}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <div className={classes.toolbar} />
      </Box>
      <Divider />
      {links}
      <Divider />
    </Drawer>
  );
}
