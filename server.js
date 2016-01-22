var express = require('express');
var app = express();

app.use(express.static(__dirname));

app.get('/', function(req, res) {
  res.sendFile('index.html');
});

app.listen(3000);
console.log('App running at 3000')