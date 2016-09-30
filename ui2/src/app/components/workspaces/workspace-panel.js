import React from 'react';
import { browserHistory } from 'react-router';
import { Button, ButtonGroup, Panel, ButtonToolbar } from 'react-bootstrap';
import FieldGroup from '../utils/field-group';
import { fetchWorkspace } from '../../actions/workspaces';

class WorkspacePanel extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			workspace: {
				id: this.props.params.key,
				name: '',
				permissions: {
					view: false,
					edit: false
				},
			}
		};
		this.handleNameChange = this.handleNameChange.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
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
					name: e.target.value,
				}
			});
	}

	handleCancel(e) {
		browserHistory.push('/');
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
			    <ButtonGroup>
				    <Button bsStyle="primary" type="submit" disabled={this.state.workspace.permissions.update != true}>
				      Update
				    </Button>
				    <Button disabled={this.state.workspace.permissions.delete != true}>
				      Delete
				    </Button>
				    <Button onClick={this.handleCancel }>
				      Back
				    </Button>
			    </ButtonGroup>
			</form>
		)	
	}	
}

export default WorkspacePanel;