const express = require('express');
const config = require('./config');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const index = require('./routes/index');
const request = require('request')
     ,url = 'https://explorer.runebase.io/runebase-insight-api/addr/RAo5ZghvNBYCGpWMKwZSEnTN2SKHYCbZH5?noTxList=1';
const fs = require('fs');
const app = express();

// Update DogeBalance
setInterval(function() {
request(url, (error, response, body)=> {
    const total = 1000000;
    if (!error && response.statusCode === 200) {
      const runesResponse = JSON.parse(body);
      fs.writeFileSync('./public/db/runesBalance',runesResponse.balance,{encoding:'utf8',flag:'w'});
      console.log("Got a response: ", runesResponse.balance);
    } else {
      console.log("Got an error: ", error, ", status code: ", response.statusCode);
    }
  })
}, 120 * 1000);


// Update runesPrice
setInterval(function() {
request('https://api.coinpaprika.com/v1/ticker/runes-runebase', (error, response, body)=> {
    if (!error && response.statusCode === 200) {
      const runesResponse = JSON.parse(body);
      fs.writeFileSync('./public/db/runesPrice',runesResponse.price_usd,{encoding:'utf8',flag:'w'});
      console.log("Got a response: ", runesResponse.price_usd);
    } else {
      console.log("Got an error: ", error, ", status code: ", response.statusCode);
    }
  })
}, 240 * 1000);

// Update supply
setInterval(function() {
request('https://explorer.runebase.io/runebase-insight-api/supply', (error, response, body)=> {
    if (!error && response.statusCode === 200) {
      const supplyResponse = JSON.parse(body);
      console.log(supplyResponse);
      fs.writeFileSync('./public/db/supply',supplyResponse,{encoding:'utf8',flag:'w'});
      console.log("Got a response: ", supplyResponse);
    } else {
      console.log("Got an error: ", error, ", status code: ", response.statusCode);
    }
  })
}, 120 * 1000);

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', index);
app.use('/assets', [
    express.static(__dirname + '/../node_modules/@fortawesome/fontawesome-free/css/'),
    express.static(__dirname + '/../public/javascripts/'),
    express.static(__dirname + '/../public/images/'),
    express.static(__dirname + '/../public/css/'),
    express.static(__dirname + '/../public/fonts/'),
    express.static(__dirname + '/../dist/images'),
    express.static(__dirname + '/../dist/css'),
    express.static(__dirname + '/../dist/js'),
]);

// Get Routes
app.get("/dogebalance", (req, res, next) => {
  res.header("Content-Type",'application/json');
  fs.readFile(__dirname + '/../public/db/runesBalance', (err, json) => {
        let obj = JSON.parse(json);
        res.json(obj);
    });
  //res.sendFile(path.join(__dirname, '/../public/db/runesBalance'));
});
app.get("/runesprice", (req, res, next) => {
  res.header("Content-Type",'application/json');
  fs.readFile(__dirname + '/../public/db/runesPrice', (err, json) => {
        let obj = JSON.parse(json);
        res.json(obj);
    });
  //res.sendFile(path.join(__dirname, '/../public/db/runesPrice'));
});
app.get("/supply", (req, res, next) => {
  res.header("Content-Type",'application/json');
  fs.readFile(__dirname + '/../public/db/supply', (err, json) => {
        let obj = JSON.parse(json);
        res.json(obj);
    });
  //res.sendFile(path.join(__dirname, '/../public/db/runesPrice'));
});

app.use('/webfonts', [
    express.static(__dirname + '/../node_modules/@fortawesome/fontawesome-free/webfonts/'),
]);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
