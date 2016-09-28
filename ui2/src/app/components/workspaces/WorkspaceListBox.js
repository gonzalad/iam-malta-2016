import React from 'react';
import WorkspaceList from './WorkspaceList';
import { Checkbox, Radio, FormGroup, Button, Panel } from 'react-bootstrap';
import FieldGroup from '../utils/FieldGroup'

import { fetchWorkspaces, fetchRecentWorkspaces } from '../../containers/workspaces/actions';

class WorkspaceListBox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {name: '', workspaces: [], recentWorkspaces: []}
		// see https://toddmotto.com/react-create-class-versus-component/
		this.handleNameChange = this.handleNameChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleNameChange(e) {
		this.setState({name: e.target.value});
	}

	handleSubmit(e) {
		e.preventDefault();
		let state = this.state
		let comp = this
		fetchWorkspaces(this.state.name).then( 
			response => comp.setState({"workspaces": response})
		);
	}

	componentDidMount() {
		//alert('componentDidMount')
		let state = this.state
		let comp = this
		fetchRecentWorkspaces().then( 
			response => comp.setState({"recentWorkspaces": response})
		);
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<Panel header="Search criteria">
				    <FieldGroup
				      id="workspaceNameText"
				      type="text"
				      label="Name"
				      value={this.state.name}
				      placeholder="Enter workspace name"
				      onChange={this.handleNameChange}
				    />
				    <Button type="submit">
				      Submit
				    </Button>
				 </Panel>
				 <Panel header="Workspace list" bsStyle="primary">
			    	<WorkspaceList workspaces={this.state.workspaces}/>
			    </Panel>
				 <Panel header="Recent workspaces">
			    	<WorkspaceList workspaces={this.state.recentWorkspaces}/>
			    </Panel>
			</form>
		)	
	}	
}

export default WorkspaceListBox;
