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
var request = require('request');

var app = express()

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('client'));


// POST /fetchId gets urlencoded bodies
app.post('/:fetchId', urlencodedParser, function (req, res) {
  if (!req.body) return res.sendStatus(400)

  function render(article) {
    res.send(article);
  }

  console.log(req.body);
  var article = request('https://tmc-api-v4.herokuapp.com/v4/article/' + req.body.id, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body) // Print the google web page.
      render(body);
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