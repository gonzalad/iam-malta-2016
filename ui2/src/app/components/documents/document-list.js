import React from 'react';
import { Table } from 'react-bootstrap';

// see https://github.com/spring-guides/tut-react-and-spring-data-rest/blob/master/basic/src/main/js/app.js
const DocumentList = (props) => { 
	let Documents = props.documents.map(document =>
		// <Document key={Document._links.self.href} Document={Document}/>
		<DocumentRow key={document.id} Document={document}/>
	);
	return (
		<Table striped bordered condensed hover>
			<tbody>
				<tr>
					<th>Id</th>
					<th>Name</th>
					<th>Path</th>
					<th>Schema</th>
				</tr>
				{Documents}
			</tbody>
		</Table>
	)
}

class DocumentRow extends React.Component{
	render() {
		return (
			<tr>
				<td>{this.props.Document.id}</td>
				<td>{this.props.Document.name}</td>
				<td>{this.props.Document.path}</td>
				<td>{this.props.Document.schema}</td>
			</tr>
		)
	}
}

DocumentList.propTypes = {
};

export default DocumentList;