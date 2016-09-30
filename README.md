# OIDC/OAuth Sample Application

This application uses CXF Fediz as a OIDC/OAuth Authorization Server (AS).

This application is made of :
 * ui2 module acts as an OIDC Application Client (or RP).
   Just a react-js app.
 * service module acts an OAuth Resource Server. 
   Just a Spring Boot app.
 
On http://localhost:8080 call, ui2 module calls service module (Workspace Service).

Service needs an OAuth2 accessToken (a.k.a produced on user authentication), so service
issues a 401, ui2 traps it, and redirects to OIDC.

When authentication succeeds, http://localhost:8080 is called back, ui2 module
stores accessToken (AT) in localStorage and calls service module with this AT. 

## User and Group Creation

You will need :
 * 1 group : workspace.edit  
   All users in this group will have the permission to modify workspaces.
 * 2 users :
   * alice - no group.
   * kenny in workspace.edit

User & Group creation is available via Syncope console <http://iam.com:9080/syncope-console>.

## Configuration

 * You'll need to map AS to iam.com (just modify your hosts file)
 * You'll need to create a OIDC clientId for ui2.  
   Go to <http://iam.com:9080/oidc/console/clients> and create a public client type
   with redirectURI = http://localhost:8080/callback
 * You'll need to set the clientdId in ui2/oidc/index.js file (yes, shitty for now, I don't have central configuration)

## Running

 * Start service module 
   ```
   iam-malta-2016> cd service
   service> gradle clean bootRun
   ```
 * Start ui2 module
   ```
   iam-malta-2016> cd ui2
   ui2> npm start
   ```
 * Start chrome on http://localhost:8080  
   * on first access you'll be redirected ao login page  
     This is because first page calls a secured service (returns a 401 statusCode)
   * Authentication
   * Back to first page, you'll see your recent documents.
   * If you click on Search, the page will list all workspace items.  
   * If you select a workspace, it will go to workspace details page.  
     If you have in workspace.edit group, Update and Remove buttons will be enabled, otherwise
     they'll be disabled.