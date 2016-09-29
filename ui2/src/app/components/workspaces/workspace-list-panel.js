import React from 'react';
import WorkspaceList from './workspace-list';
import DocumentList from '../documents/document-list';
import { Checkbox, Radio, FormGroup, Button, Panel } from 'react-bootstrap';
import FieldGroup from '../utils/field-group'

import { fetchWorkspaces } from '../../actions/workspaces';
import { fetchRecentDocuments } from '../../actions/documents';

import { Router, Route, hashHistory } from 'react-router'

class WorkspaceListPanel extends React.Component {
	constructor(props) {
		super(props);
		this.state = {name: '', workspaces: [], recentDocuments: []}
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
		fetchRecentDocuments().then( 
			response => comp.setState({"recentDocuments": response})
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
				 <Panel header="Recent documents">
			    	<DocumentList documents={this.state.recentDocuments}/>
			    </Panel>
			</form>
		)	
	}	
}

export default WorkspaceListPanel;
