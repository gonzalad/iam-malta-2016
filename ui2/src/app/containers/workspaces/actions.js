import fetch from 'isomorphic-fetch';

var Workspaces_URL = 'http://localhost:15001';

export function fetchWorkspaces(name) {
	let url = Workspaces_URL + '/workspaces/v1';
	if (name) {
		url = url + '?name=' + encodeURI(name);
	}

	return fetch(url)
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
	return fetch(url)
			.then(handleErrors)
			.then(req => req.json())
			.then(json => {
				return json;
			})
			.catch((error) => {
				handleErrors(error);
			});	
}

export function fetchRecentWorkspaces(params) {
	let url = Workspaces_URL + '/workspaces/v1/recents';
	return fetch(url)
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