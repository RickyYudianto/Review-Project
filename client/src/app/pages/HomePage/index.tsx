import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { useInjectReducer } from '../../../utils/redux-injectors';
import Navbar from '../../components/Navbar';
import { NotFoundPage } from '../../components/NotFoundPage/Loadable';
import Sidebar from '../../components/Sidebar';
import { PathConstant } from '../../constants/path.constant';
import { UserTypeEnum } from '../../models/user-type.enum';
import routes from '../../routes/home.routes';
import { selectUser } from '../../selectors/auth.selector';
import {
  actions as authActions,
  reducer as authReducer,
  sliceKey as authSliceKey,
} from '../../slices/auth.slice';
import {
  actions as pendingFeedbackActions,
  reducer as pendingFeedbackReducer,
  sliceKey as pendingFeedbackSliceKey,
} from '../../slices/pending-feedback.slice';
import {
  actions as performanceFeedbackActions,
  reducer as performanceFeedbackReducer,
  sliceKey as performanceFeedbackSliceKey,
} from '../../slices/performance-feedback.slice';
import {
  actions as performanceReviewActions,
  reducer as performanceReviewReducer,
  sliceKey as performanceReviewSliceKey,
} from '../../slices/performance-review.slice';
import {
  actions as userActions,
  reducer as userReducer,
  sliceKey as userSliceKey,
} from '../../slices/user.slice';

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

const filterRoutes = userType =>
  routes.filter(
    prop => prop.type === UserTypeEnum.ALL || prop.type === userType,
  );

const switchRoutes = userType => {
  const routeList: any[] = [];
  filterRoutes(userType).forEach((route, routeKey) => {
    routeList.push(
      <Route
        exact
        path={`${route.base}${route.path}`}
        component={route.component}
        key={routeKey}
      />,
    );

    if (route.subRoute) {
      route.subRoute.forEach((subRoute, subRouteKey) => {
        routeList.push(
          <Route
            exact
            key={subRouteKey}
            path={`${route.base}${route.path}${subRoute.path}`}
            component={subRoute.component}
          />,
        );
      });
    }
  });

  return (
    <Switch>
      {routeList}
      <Route path={`${PathConstant.HOME}/*`} component={NotFoundPage} />
    </Switch>
  );
};

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

export function HomePage() {
  useInjectReducer({ key: authSliceKey, reducer: authReducer });
  useInjectReducer({
    key: pendingFeedbackSliceKey,
    reducer: pendingFeedbackReducer,
  });
  useInjectReducer({
    key: performanceFeedbackSliceKey,
    reducer: performanceFeedbackReducer,
  });
  useInjectReducer({
    key: performanceReviewSliceKey,
    reducer: performanceReviewReducer,
  });
  useInjectReducer({ key: userSliceKey, reducer: userReducer });
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const user = useSelector(selectUser);
  const [openDrawer, setOpenDrawer] = useState(true);
  const [width] = useWindowSize();
  const classes = useStyles();

  const makeBrand = () => {
    let name = '';
    filterRoutes(user?.userType.id).forEach((prop: any) => {
      if (location.pathname.includes(prop.base + prop.path)) {
        name = prop.name;
        return;
      }
    });

    return name;
  };

  const availableRoutes = switchRoutes(user?.userType.id);
  const isMobile = useMemo(() => width > 0 && width <= 640, [width]);

  const handleLogout = () => {
    dispatch(authActions.setLoggedOut());
    dispatch(pendingFeedbackActions.resetState());
    dispatch(performanceFeedbackActions.resetState());
    dispatch(performanceReviewActions.resetState());
    dispatch(userActions.resetState());
    history.push(PathConstant.LOGIN);
  };

  useEffect(() => {
    if (isMobile) {
      setOpenDrawer(false);
    }
  }, [isMobile]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Navbar
        isMobile={isMobile}
        user={user}
        openDrawer={openDrawer}
        title={makeBrand()}
        handleDrawerOpen={() => setOpenDrawer(true)}
        handleLogout={() => handleLogout()}
      />
      <Sidebar
        open={openDrawer}
        routes={filterRoutes(user?.userType.id)}
        handleDrawerClose={() => setOpenDrawer(false)}
      />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="xl" className={classes.container}>
          {availableRoutes}
        </Container>
      </main>
    </div>
  );
}
