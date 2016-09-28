import React from 'react';
import { FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';

class FieldGroup extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let { id, label, help, ...other } = this.props;
		return (
	    <FormGroup controlId={id}>
	      <ControlLabel>{label}</ControlLabel>
	      <FormControl {...other}/>
	      {this.props.help && <HelpBlock>{this.props.help}</HelpBlock>}
	    </FormGroup>
	    )
	}
}

export default FieldGroup;