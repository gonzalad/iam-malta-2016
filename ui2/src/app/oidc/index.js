import Oidc from 'oidc-client'

var settings = {
    authority: 'http://localhost:9080/oidc',
    metadata: {
      issuer: 'accounts.talend.com',
      authorization_endpoint: 'http://iam.com:9080/oidc/idp/authorize',
      userinfo_endpoint: 'http://iam.com:9080/oidc/users/userinfo',
      jwks_uri: 'http://iam.com:9080/oidc/jwk/keys'
    },
    client_id: 'c2sBLzppb07cuQ',
    redirect_uri: 'http://localhost:8080/callback',
    post_logout_redirect_uri: 'http://localhost:8080',
    response_type: 'id_token token',
    scope: 'openid workspace.edit',
    filterProtocolClaims: true,
    loadUserInfo: true
};

const client = new Oidc.OidcClient(settings);

export function login() {
    client.createSigninRequest({ data: { bar: 15 } }).then(function(req) {
        console.debug("login request", req, "<a href='" + req.url + "'>login</a>");
        window.location = req.url;
    }).catch(function(err) {
        console.debug(err);
    });
}

export function loggedIn() {
    return !!localStorage.access_token
}

export function processLoginResponse() {
    return client.processSigninResponse().then(function(response) {
        let loginResponse = response;
        localStorage.setItem("access_token", loginResponse.access_token);
        console.debug("login response", loginResponse);
    });/*.then(function() {
        callback()
    }).catch(function(err) {
        callback(err);
        //console.debug(err);
        //throw err;
    });*/
}
