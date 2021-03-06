var config = require('../config');
var bodyParser  = require("body-parser");
var express = require('express');
var session = require('express-session');
var userAgent = require('../helpers/useragent').os;
var doge = require('../helpers/runesBalance').doge;
var router = express.Router();

router.use(session({
    secret: config.session_secret,
    name: "runebase",
    resave: true,
    saveUninitialized: true
}));

router.use(bodyParser.json());
router.use(userAgent);
router.use(doge);

router.get('/wallet', (req, res, next) => {
    res.render('wallet', { title: 'Wallet' });
})
router.get('/tasks', (req, res, next) => {
    res.render('tasks', { title: 'Tasks' });
})

router.get('/', function (req, res) {
    console.log(res.runesBalance);
    res.render('index', {downloadName: res.downloadName, downloadLink: res.downloadLink, runesBalance: res.runesBalance, runesProgress: res.runesProgress})
});

module.exports = router;