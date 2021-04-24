import { makeStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ExitToApp from '@material-ui/icons/ExitToApp';
import clsx from 'clsx';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { translations } from '../../../locales/translations';

const SIDEBAR_DRAWER_WIDTH = 240;
const useStyles = makeStyles(theme => ({
  toolbar: {
    paddingRight: 24,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: SIDEBAR_DRAWER_WIDTH,
    width: `calc(100% - ${SIDEBAR_DRAWER_WIDTH}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  title: {
    flexGrow: 1,
  },
}));

interface IProps {
  openDrawer: boolean;
  title: string;
  handleLogout: () => void;
}

export function Navbar(props: IProps) {
  const { openDrawer, title, handleLogout } = props;
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <AppBar
      position="absolute"
      className={clsx(classes.appBar, openDrawer && classes.appBarShift)}
    >
      <Toolbar className={classes.toolbar}>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          className={classes.title}
        >
          {title}
        </Typography>
        <IconButton
          color="inherit"
          title={t(translations.LABEL.LOGOUT)}
          onClick={() => handleLogout()}
        >
          <ExitToApp />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
