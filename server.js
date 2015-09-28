// var connect = require('connect');
// var express = require('express');
// var http = require('http');
// var app = connect();

// app.use(express.static('client'));

// var bodyParser = require('body-parser');
// app.use(bodyParser());

// app.post('/fetchid', function(req, res) {
//   console.log(req.body);
// });

// // app.use('/fetchId', function (req, res, next) {
// //   console.log(req.body);
// //   res.end("nice search on : ", req.body);
// //   // console.log(req.body.article);
// // });





var express = require('express')
var http = require('http')
var bodyParser = require('body-parser')
var request = require('request')
var jade = require('jade')
var fs = require('fs');

var app = express()

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('public'));
app.set('stylesheets', __dirname + '/vendor/foundation/css')
app.set('views', __dirname + '/views')
app.set('view engine', 'jade');

app.get('/', function(req, res) {
  res.render('index');
});

// POST /fetchId gets urlencoded bodies
app.post('/:fetchId', urlencodedParser, function (req, res) {
  if (!req.body) return res.sendStatus(400)
  console.log(req.body);


  request('https://tmc-api-v4.herokuapp.com/v4/article/' + req.body.id, function (error, response, body) {
    if (!error) {
      var data = JSON.parse(body);
      console.log(data);
      res.render('show', data.article);

    } else {
      return console.log(error);
    }

  })

  // res.send(article);
})
// var server = app.listen(3000, function () {
//   var host = server.address().address;
//   var port = server.address().port;

//   console.log('Example app listening at http://%s:%s', host, port);
// });
http.createServer(app).listen(3000)