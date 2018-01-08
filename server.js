// BASE SETUP
// =============================================================================
// call the packages we need
const express = require('express');        // call express
const app = express();                 // define our app using express
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const http = require('http');
const { ExpressOIDC } = require('@okta/oidc-middleware');
const Posts = require('./server/app/modules/posts');
const mongodbconnection = require('./utils/mongooseconect');
const port = process.env.PORT || '3000';        // set our port
// ROUTES FOR OUR API
// =============================================================================
const router = express.Router();              // get an instance of the express Router
//configure okta service
const oidc = new ExpressOIDC({
    issuer: 'https://dev-868765.oktapreview.com/oauth2/default',
    client_id: '0oadffd70kz1wDvK90h7',
    client_secret: 'ni5D3FTKJ0e7nY26dHKK9hUsu2ENY6uvqH0R_2z3',
    redirect_uri: 'http://localhost:3000/authorization-code/callback',
    scope: 'openid profile'
});
// configure app to use bodyParser()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
    secret: 'this-should-be-secure',
    resave: true,
    saveUninitialized: true,
    cookie: {}
}));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
// ExpressOIDC will attach handlers for the /login and /authorization-code/callback routes
app.use(oidc.router);
app.use('/api', router);
console.log('connecting to mongodb!');
mongodbconnection.connectmongodb();
// middleware to use for all requests
router.use(function (req, res, next) {
    // oidc.ensureAuthenticated();
    next(); // make sure we go to the next routes and don't stop here
})
router.post('/posts', oidc.ensureAuthenticated(), (req, res) => {
    const post = {};
    post.userId = req.body.userId;
    post.title = req.body.title;
    post.comment = req.body.comment;
    Posts.savePosts(post, res);
})
router.get('/posts', oidc.ensureAuthenticated(), (req, res) => {
    Posts.getPosts(res);
})
router.get('/posts/:id', oidc.ensureAuthenticated(), (req, res) => {
    const userName = req.params.id;
    // console.log('okta service on server get by id : ' + userName);
    Posts.getPostsById(userName, res);
})
router.put('/posts/:id', oidc.ensureAuthenticated(), (req, res) => {
    const userName = req.params.id;
    const newPost = {};
    newPost.userId = userName;
    newPost.title = req.body.title;
    newPost.comment = req.body.comment;
    Posts.updatePostsById(userName, newPost, res);
})
app.get('/protected', oidc.ensureAuthenticated(), (req, res) => {
    res.send(JSON.stringify(req.userinfo));
});
app.get('/logout', oidc.ensureAuthenticated(), (req, res) => {
    req.logout();
    res.redirect('/');
});
app.get('/', oidc.ensureAuthenticated(), (req, res) => {
    if (req.userinfo) {
        res.send(`Hi ${req.userinfo.name}!`);
    } else {
        res.send('Hi!');
    }
});
// Catch all other routes and return the index file
app.get('*', oidc.ensureAuthenticated(), (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.all('*', function (req, res, next) {
    if (oidc.ensureAuthenticated()) {
        next();
    } else {
        next(res.redirect('https://dev-868765.oktapreview.com/')); // 401 Not Authorized
    }
});

// START THE SERVER
// =============================================================================
app.set('port', port);
oidc.on('ready', () => {
    /*Create HTTP server.*/
    const server = http.createServer(app);
    server.listen(port, () => console.log(`API running on localhost:${port}`));
});

oidc.on('error', err => {
    console.log('Unable to configure ExpressOIDC', err);
});
