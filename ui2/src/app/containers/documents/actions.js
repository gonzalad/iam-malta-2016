import fetch from 'isomorphic-fetch';
import { login } from '../../oidc'

var Documents_URL = 'http://localhost:15001';

export function fetchRecentDocuments(params) {
	let url = Documents_URL + '/documents/v1/recents';
    let headers = {};
    let access_token = localStorage.getItem("access_token");
    if (access_token) {
    	headers = {"Authorization": "Bearer " + access_token}
    }
	return fetch(url, {"headers": headers})
			.then(handleResponse)
			/*.then(json => {
				return json;
			})*/
			.catch((error) => {
				handleErrors(error);
			})
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

function handleResponse(response) {
    if (response.status == 401) {
    	login();
    	return {};
    } else  if (response.status >= 400) {
        throw new Error("Bad response from server");
    } else {
    	return response.json();
    }
}

const handleErrors = (response) => {
	if (response instanceof Error) {
		throw response;
    } else if (!response.ok) {
		throw response.json();
	}
	return response;
};