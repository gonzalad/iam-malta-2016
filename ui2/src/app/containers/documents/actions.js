import fetch from 'isomorphic-fetch';

var Documents_URL = 'http://localhost:15001';

export function fetchRecentDocuments(params) {
	let url = Documents_URL + '/documents/v1/recents';
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