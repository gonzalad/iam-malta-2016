import React from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router';
import WorkspacePanel from './WorkspacePanel';

// see https://github.com/spring-guides/tut-react-and-spring-data-rest/blob/master/basic/src/main/js/app.js
const WorkspaceList = (props) => { 
	let workspaces = props.workspaces.map(workspace =>
		// <Workspace key={workspace._links.self.href} workspace={workspace}/>
		<WorkspaceRow key={workspace.id} workspace={workspace}/>
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

class WorkspaceRow extends React.Component{
	render() {
		return (
			<tr>
				<td><Link to={"/workspaces/" + this.props.workspace.id}>{this.props.workspace.id}</Link></td>
				<td>{this.props.workspace.name}</td>
				<td>{this.props.workspace.description}</td>
			</tr>
		)
	}
}

WorkspaceList.propTypes = {
};

export default WorkspaceList;