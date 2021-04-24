/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import { GlobalStyle } from 'styles/global-styles';
import { PathConstant } from './constants/path.constant';

import { HomePage } from './pages/HomePage/Loadable';
import { NotFoundPage } from './components/NotFoundPage/Loadable';
import { useTranslation } from 'react-i18next';
import { LoginPage } from './pages/LoginPage/Loadable';
import { RootPage } from './pages/RootPage/Loadable';
import PrivateSignedInRoute from './routes/private-signed-in.route';
import PrivateSignedOutRoute from './routes/private-signed-out.route';

export function App() {
  const { i18n } = useTranslation();
  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s - React Boilerplate"
        defaultTitle="React Boilerplate"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="A React Boilerplate application" />
      </Helmet>

      <Switch>
        <PrivateSignedOutRoute
          exact
          path={PathConstant.LOGIN}
          component={LoginPage}
        />
        <PrivateSignedInRoute
          exact
          path={PathConstant.HOME}
          component={HomePage}
        />
        <Route exact path={PathConstant.ROOT} component={RootPage} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </BrowserRouter>
  );
}
