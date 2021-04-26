import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';
import clsx from 'clsx';
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { SettingConstant } from '../../constants/setting.constant';

const SIDEBAR_DRAWER_WIDTH = SettingConstant.SIDEBAR_DRAWER_WIDTH;
const style = createStyles(theme => ({
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
    fontSize: '16px',
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
  classes: any;
  open: boolean;
  routes: any[];
  handleDrawerClose: () => void;
}

function Sidebar(props: IProps) {
  const { classes, open, routes, handleDrawerClose } = props;
  const location = useLocation();

  const activeRoute = (routeName: any) => {
    return location.pathname.includes(routeName);
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
                <prop.icon />
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
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <Icon>chevron_left</Icon>
          </IconButton>
        </div>
      </Box>
      <Divider />
      {links}
      <Divider />
    </Drawer>
  );
}

export default withStyles(style)(Sidebar);
