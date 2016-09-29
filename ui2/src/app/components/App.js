import React from 'react';
import { Router, Route, hashHistory } from 'react-router';
import WorkspaceListPanel from './workspaces/WorkspaceListPanel';
import WorkspacePanel from './workspaces/WorkspacePanel';

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
	}

	render() {
		return (
			<Router history={hashHistory}>
				<Route path="/" component={WorkspaceListPanel}/>
				<Route path="/workspaces/:key" component={WorkspacePanel}/>
			</Router>
		)
	}
}

export default App;