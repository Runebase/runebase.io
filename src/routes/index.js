var config = require('../config');
var bodyParser  = require("body-parser");
var express = require('express');
var session = require('express-session');
var userAgent = require('../helpers/useragent').os;
var doge = require('../helpers/dogeBalance').doge;
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
    res.render('wallet', { title: 'wallet' });
})

router.get('/', function (req, res) {
    console.log(res.dogeBalance);
    res.render('index', {downloadName: res.downloadName, downloadLink: res.downloadLink, dogeBalance: res.dogeBalance, dogeProgress: res.dogeProgress})
});

module.exports = router;