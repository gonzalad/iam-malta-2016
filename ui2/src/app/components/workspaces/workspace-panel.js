import React from 'react';
import FieldGroup from '../utils/field-group';
import { Button, Panel } from 'react-bootstrap';
import { fetchWorkspace } from '../../actions/workspaces';

class WorkspacePanel extends React.Component {

	constructor(props) {
		super(props);
		this.state = {workspace: {name: ''}};
		this.handleNameChange = this.handleNameChange.bind(this);
	}

	componentDidMount() {
		//alert('componentDidMount')
		let state = this.state
		let comp = this
		fetchWorkspace(this.props.params.key).then( 
			response => comp.setState({"workspace": response})
		);
	}

	handleNameChange(e) {
		this.setState({ 
			workspace : {
					name: e.target.value
				}
			});
	}

	render() {
		return (
			<form>
			    <FieldGroup
			      id="workspaceNameText"
			      type="text"
			      label="Name"
			      value={this.state.workspace.name}
			      onChange={this.handleNameChange}
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