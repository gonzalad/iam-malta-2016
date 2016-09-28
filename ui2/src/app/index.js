import React from 'react'; // don't forget that for the compiler...
import { render } from 'react-dom';
//import { App, initializeStore } from 'react-cmf';

import WorkspaceListBox from './components/workspaces/WorkspaceListBox';
//import MyTable from './components/MyTable';
//import SampleForm from './components/SampleForm';
//import App from './components/App';

//configure.initialize();
//const store = initializeStore();

// render(
// 	<h1>Hello, world!</h1>,
//     document.getElementById('example')
// );

// render(
// 	<MyTable/>,
// 	document.getElementById('my-table')
// );

// render(
// 	<SampleForm/>,
// 	document.getElementById('sample-form')
// );

// render(
// 	<App/>,
// 	document.getElementById('app')
// );

render(
	<WorkspaceListBox/>,
	document.getElementById('workspace-list-box')
);