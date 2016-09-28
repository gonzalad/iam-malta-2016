import React from 'react';
import { Table } from 'react-bootstrap';
import { fetchWorkspaces } from '../containers/workspaces/actions';
import { WorkspaceList } from './workspaces/WorkspaceList';

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {workspaces: [{
				"id": 101,
				"name": "Premier workspace",
				"description": "Ma description"
			}
		]};
	}

	componentDidMount() {
		//alert('componentDidMount')
		let state = this.state
		let app = this
		fetchWorkspaces().then( 
			response => app.setState({"workspaces": response})
		);
		// client({method: 'GET', path: 'http://localhost:15001/workspaces/v1/recents'}).done(response => {
		// 	this.setState({employees: response.entity._embedded.employees});
		// });
	}

	render() {
		return (
			<WorkspaceList workspaces={this.state.workspaces}/>
		)
	}
}

/* // see https://github.com/spring-guides/tut-react-and-spring-data-rest/blob/master/basic/src/main/js/app.js
const WorkspaceList = (props) => { 
	let workspaces = props.workspaces.map(workspace =>
		// <Workspace key={workspace._links.self.href} workspace={workspace}/>
		<Workspace key={workspace.id} workspace={workspace}/>
	);
	return (
		<Table striped bordered condensed hover>
			<tbody>
				<tr>
					<th>Id</th>
					<th>Name</th>
					<th>Description</th>
				</tr>
				{workspaces}
			</tbody>
		</Table>
	)
}

class Workspace extends React.Component{
	render() {
		return (
			<tr>
				<td>{this.props.workspace.id}</td>
				<td>{this.props.workspace.name}</td>
				<td>{this.props.workspace.description}</td>
			</tr>
		)
	}
}

WorkspaceList.propTypes = {
};*/

export default App;