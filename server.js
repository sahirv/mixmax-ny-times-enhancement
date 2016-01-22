var express = require('express');
var https = require('https');
var http = require('http');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');

app.use(express.static(__dirname));

// So we can POST.
app.use(bodyParser.urlencoded());

app.get('/', function(req, res) {
  res.sendFile('index.html');
});

// Since Mixmax calls this API directly from the client-side, it must be whitelisted.
var corsOptions = {
  origin: /^[^.\s]+\.mixmax\.com$/,
  credentials: true
};

app.post('/add', cors(corsOptions), function(req, res){
    console.log('req.body', req.body)
    var data = JSON.parse(req.body.params);
    if (!data) {
        res.status(403 /* Unauthorized */ ).send('Invalid params');
        return;
    }

    var html = data.src;

    res.json({body: html});
});

app.listen(3000);
console.log('App running at 3000');