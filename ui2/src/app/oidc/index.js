import Oidc from 'oidc-client'

var settings = {
    authority: 'http://localhost:9080/oidc',
    metadata: {
      issuer: 'accounts.talend.com',
      authorization_endpoint: 'http://localhost:9080/oidc/idp/authorize',
      userinfo_endpoint: 'http://localhost:9080/oidc/users/userinfo',
      jwks_uri: 'http://localhost:9080/oidc/jwk/keys'
    },
    client_id: 'JsHuVyRLcaoQ8Q',
    redirect_uri: 'http://localhost:8080',
    post_logout_redirect_uri: 'http://localhost:8080',
    response_type: 'id_token token',
    scope: 'openid',

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

export function processLoginResponse() {
    client.processSigninResponse().then(function(response) {
        let loginResponse = response;
        localStorage.setItem("access_token", loginResponse.access_token);
        console.debug("login response", loginResponse);
    }).catch(function(err) {
        console.debug(err);
        throw err;
    });
}
