import React from 'react';
import { Router, Route, hashHistory, browserHistory } from 'react-router';

import { processLoginResponse } from '../oidc';
import WorkspaceListPanel from '../components/workspaces/workspace-list-panel';
import WorkspacePanel from '../components/workspaces/workspace-panel';

class Routes extends React.Component {

	constructor(props) {
		super(props);
		this.state = {};
		//this.handleLoginResponse = this.handleLoginResponse.bind(this);
	}

	render() {
		return (
			<Router history={browserHistory}>
				<Route path="/" component={WorkspaceListPanel} onEnter={ handleLoginResponse } />
				<Route path="/workspaces/:key" component={WorkspacePanel}/>
				<Route path="/access_token=*" component={WorkspaceListPanel} onEnter={ handleLoginResponse }/>
			</Router>
		)
	}
}

function handleLoginResponse(nextState, replace) {
	// processing login response only if access_token parameter present in Url
	let hashValue = hash();
	if (hashValue.get('access_token')) {
		console.debug ('handleLoginResponse');
		processLoginResponse();
		browserHistory.push('/')
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