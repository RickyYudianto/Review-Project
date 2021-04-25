/**
 * index.tsx
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

import DateFnsUtils from '@date-io/date-fns';

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
// Import root app
import { App } from 'app';
import { SnackbarProvider } from 'notistack';
import * as React from 'react';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import * as ReactDOM from 'react-dom';

import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';

import reportWebVitals from 'reportWebVitals';

// Use consistent styling
import 'sanitize.css/sanitize.css';

import { configureAppStore } from 'store/configureStore';

// Initialize languages
import './locales/i18n';

const store = configureAppStore();
const MOUNT_NODE = document.getElementById('root') as HTMLElement;

ReactDOM.render(
  <Provider store={store}>
    <HelmetProvider>
      {/*<React.StrictMode>*/}
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
          <App />
        </SnackbarProvider>
      </MuiPickersUtilsProvider>
      {/*</React.StrictMode>*/}
    </HelmetProvider>
  </Provider>,
  MOUNT_NODE,
);

// Hot reloadable translation json files
if (module.hot) {
  module.hot.accept(['./locales/i18n'], () => {
    // No need to render the App again because i18next works with the hooks
  });
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
