import React from 'react';
import { AppHeaderBar } from 'react-cmf-bootstrap';
/**
 * @param {object} props react props
 * @example
<App name="Hello world"></App>
 */
function App(props) {
	return (
		<div>
			<AppHeaderBar />
			{props.children}
		</div>
	);
}

App.propTypes = {};

export default App;
