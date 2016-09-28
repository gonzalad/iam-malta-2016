import React from 'react'; // don't forget that for the compiler...
import { render } from 'react-dom';
//import { App, initializeStore } from 'react-cmf';

alert('coucou');

//configure.initialize();
//const store = initializeStore();

render(
	<h1>Hello, world!</h1>,
    document.getElementById('example')
);