var express = require('express');           // for running server
var bodyParser = require('body-parser');    // processes JSON in request body
var Pusher = require('pusher');             // to connect to Pusher

require('dotenv').config();

var app = express();
app.use(bodyParser.json());                 // for processing JSON in request body
app.use(bodyParser.urlencoded({extended: false}));  // for parsing encoded requests

// connect to pusher
var pusher = new Pusher({
    appId: process.env.APP_ID,
    key: process.env.APP_KEY,
    secret: process.env.APP_SECRET,
    cluster: process.env.APP_CLUSTER
});

// to test if server is running
app.get('/', function(req, res) {
    res.send('everything is good...');
});

// authenticate user who is trying to connect
app.post('/pusher/auth', function(req, res) {
    var socketId = req.body.socket_id;
    var channel = req.body.channel_name;
    var auth = pusher.authenticate(socketId, channel);

    res.send(auth);
});

var port = process.env.PORT || 5000;
app.listen(port);