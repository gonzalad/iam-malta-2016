import React from 'react';

class ErrorPanel extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>{this.props.location.query.error}</div>
		)	
	}	
}

export default ErrorPanel;