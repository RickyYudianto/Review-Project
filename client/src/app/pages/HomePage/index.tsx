import { makeStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { useInjectReducer } from '../../../utils/redux-injectors';
import { Navbar } from '../../components/Navbar';
import { Sidebar } from '../../components/Sidebar';
import { PathConstant } from '../../constants/path.constant';
import routes from '../../routes/home.routes';
import {
  selectAccessToken,
  selectRefreshToken,
} from '../../selectors/auth.selector';
import { logout } from '../../services/auth.service';
import {
  actions as authActions,
  reducer as authReducer,
  sliceKey as authSliceKey,
} from '../../slices/auth.slice';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => (
      <Route
        path={prop.base + prop.path}
        component={prop.component}
        key={key}
      />
    ))}
  </Switch>
);

export function HomePage() {
  useInjectReducer({ key: authSliceKey, reducer: authReducer });
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const accessToken = useSelector(selectAccessToken);
  const refreshToken = useSelector(selectRefreshToken);
  const [openDrawer, setOpenDrawer] = useState(true);
  const classes = useStyles();

  function makeBrand() {
    let name = '';
    routes.forEach((prop: any) => {
      if (prop.base + prop.path === location.pathname) {
        name = prop.name;
        return;
      }
    });

    return name;
  }

  const resizeFunction = () => {
    if (window.innerWidth < 960) {
      setOpenDrawer(false);
    } else {
      setOpenDrawer(true);
    }
  };

  useEffect(() => {
    resizeFunction();
    window.addEventListener('resize', resizeFunction);

    return () => {
      window.removeEventListener('resize', resizeFunction);
    };
  });

  const handleLogout = () => {
    logout({ refreshToken, accessToken }).then(() => {
      dispatch(authActions.setLoggedOut());
      history.push(PathConstant.LOGIN);
    });
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Navbar
        openDrawer={openDrawer}
        title={makeBrand()}
        handleLogout={() => handleLogout()}
      />
      <Sidebar open={openDrawer} routes={routes} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="xl" className={classes.container}>
          {switchRoutes}
        </Container>
      </main>
    </div>
  );
}
