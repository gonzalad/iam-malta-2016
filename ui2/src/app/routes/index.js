import React from 'react';
import { Router, Route, hashHistory, browserHistory } from 'react-router';

import { processLoginResponse } from '../oidc';
import ErrorPanel from '../components/error-panel';
import WorkspaceListPanel from '../components/workspaces/workspace-list-panel';
import WorkspacePanel from '../components/workspaces/workspace-panel';

class Routes extends React.Component {

	constructor(props) {
		super(props);
		this.state = {};
		this.handleLoginResponse = handleLoginResponse.bind(this);
	}

	render() {
		return (
			<Router history={browserHistory}>
				<Route path="/" component={WorkspaceListPanel} />
				<Route path="/error*" component={ErrorPanel} />
				<Route path="/workspaces/:key" component={WorkspacePanel}/>
				<Route path="/callback" component={ErrorPanel} onEnter={(nextState, replace, callback) => { this.handleLoginResponse(nextState, replace, callback) }}/>
			</Router>
		)
	}
}

function handleLoginResponse(nextState, replace, callback) {
	// processing login response only if access_token parameter present in Url
	let hashValue = hash();
	if (hashValue.get('error')) {
		alert(hashValue.get('error'))
		replace({
		  pathname: '/error?' + hashValue.get('error'),
		  state: { nextPathname: nextState.location.pathname }
		})
		//browserHistory.push('/error?' + hashValue.get('error'))
	} else if (hashValue.get('access_token')) {
		console.debug ('handleLoginResponse');
		processLoginResponse().then( function() {
			browserHistory.push('/');
		}).then(callback());
   		//browserHistory.push('/')
	} else {
		callback();
	}
}

function hash() {
	let map = new Map();
	if (window.location.hash) {
	    var params = (window.location.hash.substr(1)).split("&");
	    for (let i = 0; i < params.length; i++)
	    {
	        var a = params[i].split("=");
	        map.set(a[0], a[1]);
	    }
	}
	return map;
}

export default Routes;