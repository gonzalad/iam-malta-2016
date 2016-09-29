import React from 'react';
import FieldGroup from '../utils/FieldGroup';
import { Button, Panel } from 'react-bootstrap';
import { fetchWorkspace } from '../../containers/workspaces/actions.js';

class WorkspacePanel extends React.Component {

	constructor(props) {
		super(props);
		this.state = {workspace: {}};
	}

	componentDidMount() {
		//alert('componentDidMount')
		let state = this.state
		let comp = this
		fetchWorkspace(this.props.params.key).then( 
			response => comp.setState({"workspace": response})
		);
	}

	render() {
		return (
			<form>
			    <FieldGroup
			      id="workspaceNameText"
			      type="text"
			      label="Name"
			      value={this.state.workspace.name}
			      placeholder="Workspace name"
			    />
			    <Button type="submit">
			      Submit
			    </Button>
			</form>
		)	
	}	
}

export default WorkspacePanel;