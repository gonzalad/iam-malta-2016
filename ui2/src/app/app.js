import React from 'react';
import { Router, Route, hashHistory } from 'react-router';

import WorkspaceListPanel from './components/workspaces/WorkspaceListPanel';
import WorkspacePanel from './components/workspaces/WorkspacePanel';
import Routes from './routes';

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
	}

	render() {
		return (
			<Routes/>
		)
	}
}

export default App;