import fetch from 'isomorphic-fetch';
import { browserHistory } from 'react-router'

var Workspaces_URL = 'http://localhost:15001';

export function updateWorkspace(workspace) {
	let url = Workspaces_URL + '/workspaces/v1/' + workspace.id;
    let headers = new Headers();
    let access_token = localStorage.getItem("access_token");
    if (access_token) {
    	headers.set("Authorization", "Bearer" + access_token);
    }
    headers.set("Content-Type", "application/json");
	return fetch(url, {
		method: 'put',
		body: JSON.stringify(workspace),
		headers: headers
	})
	.then(handleErrors)
	.then(req => req.json())
	.catch((error) => {
		handleErrors(error);
	});
}

export function deleteWorkspace(workspace) {
	let url = Workspaces_URL + '/workspaces/v1/' + workspace.id;
    let headers = new Headers();
    let access_token = localStorage.getItem("access_token");
    if (access_token) {
    	headers.set("Authorization", "Bearer" + access_token);
    }
	return fetch(url, {
		method: 'delete',
		headers: headers
	})
	.then(handleErrors)
	.catch((error) => {
		handleErrors(error);
	});
}

export function fetchWorkspaces(name) {
	let url = Workspaces_URL + '/workspaces/v1';
	if (name) {
		url = url + '?name=' + encodeURI(name);
	}
    let headers = {};
    let access_token = localStorage.getItem("access_token");
    if (access_token) {
    	headers = {"Authorization": "Bearer" + access_token}
    }
	return fetch(url, {"headers": headers})
			.then(handleErrors)
			.then(req => req.json())
			.then(json => {
				//alert('receiveWorkspaces');
				return json;
				//return receiveWorkspaces(json)
				//dispatch(receiveWorkspaces(json));
			})
			.catch((error) => {
				handleErrors(error);
				//dispatch(requestWorkspacesFail(error));
			});
	// return dispatch => {
	// 	//dispatch(requestWorkspaces());
	// 	return fetch(url)
	// 			.then(handleErrors)
	// 			.then(req => req.json())
	// 			.then(json => {
	// 				alert('receiveWorkspaces');
	// 				receiveWorkspaces(json)
	// 				//dispatch(receiveWorkspaces(json));
	// 			})
	// 			.catch((error) => {
	// 				alert('requestWorkspacesFail');
	// 				//dispatch(requestWorkspacesFail(error));
	// 			});
	// };
}

export function fetchWorkspace(key) {
	let url = Workspaces_URL + '/workspaces/v1/' + key;
    let headers = {};
    let access_token = localStorage.getItem("access_token");
    if (access_token) {
    	headers = {"Authorization": "Bearer" + access_token}
    }
	return fetch(url, {"headers": headers})
			.then(handleErrors)
			.then(req => req.json())
			.then(json => {
				return json;
			})
			.catch((error) => {
				handleErrors(error);
			});	
}

function insertParams(url, params) {
	let newUrl = url;
	Object.keys(params).forEach((key, index, array) => {
		if (index === 0) {
			newUrl += '?';
		}
		newUrl += [encodeURI(key), encodeURI(params[key])].join('=');
		if (index < array.length - 1) {
			newUrl += '&';
		}
	});
	return newUrl;
}

const handleErrors = (response) => {
	if (response instanceof Error) {
		throw response;
    } else if (!response.ok) {
		throw response.json();
	}
	return response;
};