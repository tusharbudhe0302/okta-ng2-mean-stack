# MeanApp
App to demonstrate angular 2 app with MEAN stack using the Angular CLI. Doing server side authetication using okta open id connect.It will do CRUD operattions for posts. Please check mongoose schema file.

#MEAN Stack Prerequisites

MongoDB: https://docs.mongodb.com/manual/introduction/

Express.js: http://expressjs.com/

Angular 2: http://angular.io

Node.js: https://nodejs.org 

## Set up.
Make sure you have angular cli installed.
```bash
$ npm install -g angular-cli
```

Clone the repo
```bash
$ git clone https://github.com/tusharbudhe0302/okta-ng2-mean-stack.git
$ cd okta-ng2-mean-stack
```

#oidc-middleware

This package makes it easy to get your users logged in with Okta using OpenId Connect (OIDC).  It enables your Express application to participate in the [authorization code flow][auth-code-docs] flow by redirecting the user to Okta for authentication and handling the callback from Okta.  Once this flow is complete, a local session is created and the user context is saved for the duration of the session.

You will need an Okta Developer Org, you can sign up for an account at Markup :  [Named Link](https://developer.okta.com/signup/..)

### new ExpressOIDC(config)

Go to server.js in root directory and chnge with your app configurations.
To configure your OIDC integration, create an instance of `ExpressOIDC` and pass options. Most apps will need this basic configuration:

```javascript
const { ExpressOIDC } = require('@okta/oidc-middleware');

const oidc = new ExpressOIDC({
  issuer: YOUR_ISSUER,
  client_id: YOUR_CLIENT_ID,
  client_secret: YOUR_CLIENT_SECRET,
  redirect_uri: YOUR_REDIRECT_URI,
  scope: 'openid profile' /*optional you can remove this line.*/
});
```

Required config:

* **issuer** - The OIDC provider (e.g. `https://YOUR_ORG.oktapreview.com/oauth2/default`)
* **client_id** - An id provided when you create an OIDC app in your Okta Org
* **client_secret** - A secret provided when you create an OIDC app in your Okta Org
* **redirect_uri** - The callback for your app. Locally, this is usually `http://localhost:3000/authorization-code/callback`. When deployed, this should be `https://YOUR_PROD_DOMAIN/authorization-code/callback`.

Optional config:

* **response_type** - Defaults to `code`
* **scope** - Defaults to `openid`, which will only return the `sub` claim. To obtain more information about the user, use `openid profile`. For a list of scopes and claims, please see [Scope-dependent claims](https://developer.okta.com/standards/OIDC/index.html#scope-dependent-claims-not-always-returned) for more information.
* **routes** - Allows customization of the generated routes. See [Customizing Routes](#customizing-routes) for details.
* **maxClockSkew** - Defaults to 120. This is the maximum difference allowed between your server's clock and Okta's in seconds. Setting this to 0 is not recommended, because it increases the likelihood that valid jwts will fail verification due to `nbf` and `exp` issues.



Install dependencies
```bash
$ npm install
```
Run mongodb
```bash
$ mongod
```
Run the app
```bash
$ npm run build
```

Open Browser : http://localhost:3000/posts
