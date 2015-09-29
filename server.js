var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var request = require('request');
var jade = require('jade');
var fs = require('fs');

var app = express();

// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static('public'));
app.set('stylesheets', __dirname + '/vendor/foundation/css');
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.get('/', function(req, res) {
  res.render('index');
});

// POST /fetchId gets urlencoded bodies
app.post('/:fetchId', urlencodedParser, function (req, res) {
  if (!req.body) return res.sendStatus(400);

  //send request to tmc-api
  request('https://tmc-api-v4.herokuapp.com/v4/article/' + req.body.id, function (error, response, body) {
    if (response.headers.status === '404 Not Found') {
      console.log("not a valid Id");
      res.render('index')
      // res.send(404);
    }
    else if (!error) {
      var data = JSON.parse(body);
      res.render('show', data.article);

    } else {
      return console.log(error);
    }
  });
});

http.createServer(app).listen(3000);
