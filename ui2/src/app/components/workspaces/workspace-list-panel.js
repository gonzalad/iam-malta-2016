import React from 'react';
import WorkspaceList from './workspace-list';
import DocumentList from '../documents/document-list';
import { Checkbox, Radio, Navbar, FormGroup, FormControl, Button, Panel } from 'react-bootstrap';
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
				<Navbar>
					<Navbar.Header>
					  <Navbar.Brand>
					    <a href="#">Workspaces</a>
					  </Navbar.Brand>
					  <Navbar.Toggle />
					</Navbar.Header>
					<Navbar.Collapse>
					  <Navbar.Form pullLeft>
					    <FormGroup>
					      <FormControl type="text" placeholder="Search" onChange={this.handleNameChange}/>
					    </FormGroup>
					    {' '}
					    <Button type="submit">Submit</Button>
					  </Navbar.Form>
					</Navbar.Collapse>
				</Navbar>
		    	<WorkspaceList workspaces={this.state.workspaces}/>
				 <Panel header="Recent documents">
			    	<DocumentList documents={this.state.recentDocuments}/>
			    </Panel>
			</form>
		)	
	}	
}

export default WorkspaceListPanel;
