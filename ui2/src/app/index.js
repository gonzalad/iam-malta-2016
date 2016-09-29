import React from 'react'; // don't forget that for the compiler...
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import createOidcMiddleware, { createUserManager, OidcProvider, reducer } from 'redux-oidc';

//import { App, initializeStore } from 'react-cmf';

import App from './app';


// user manager configuration object, see oidc-client-js documentation for details
const config = {
  client_id: 'my-client',
  redirect_uri: `${window.location.protocol}//${window.location.hostname}:${window.location.port}/callback`,
  response_type: 'id_token token',
  scope: 'openid profile',
  authority: 'http://myIdentityProvider.com',
  post_logout_redirect_uri: `${window.location.protocol}//${window.location.hostname}:${window.location.port}/login`,
  silent_redirect_uri: `${window.location.protocol}//${window.location.hostname}:${window.location.port}/silent_renew.html`,
  automaticSilentRenew: true,
  filterProtocolClaims: true,
  loadUserInfo: true
}

// create a user manager instance
const userManager = createUserManager(config);

// create the middleware
const oidcMiddleware = createOidcMiddleware(userManager, () => true, false, '/callback');

// configure your reducers
const reducers = combineReducers({
  oidc: reducer,
  // your other reducers
});

// configure your redux store
const store = createStore(
  reducers,
  applyMiddleware(oidcMiddleware)
);

render(
	(
	  <Provider store={store}>
	    <OidcProvider store={store} userManager={userManager}>
	      <App/>
	    </OidcProvider>
	  </Provider>
	),
	document.getElementById('app')
);