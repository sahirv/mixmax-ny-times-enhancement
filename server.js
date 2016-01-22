var express = require('express');
var bodyParser = require('body-parser');
var app = express();

// Serve assets in /public.
app.use(express.static(__dirname));

// So we can POST.
app.use(bodyParser.urlencoded());

// The editor interface.
app.get('/', function(req, res) {
  res.sendFile('index.html');
});

app.listen(3000);
console.log('App running at 3000')