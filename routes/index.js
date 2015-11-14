var express = require('express');
var router = express.Router();
var request = require('request');
var sort = require('sort')
var config = require('../config');
var https = require('https');
var express = require('express');
var bodyParser = require('body-parser');

var url = "https://leaderboarddance.azure-mobile.net/tables/scores?$orderby=numbers2%20desc&$top=10";

var app = express();
app.use(bodyParser.json());

var sortColumnName = "score";

function SortByName(x,y) {
      return ((x[sortColumnName]  == y[sortColumnName]) ? 0 : ((x[sortColumnName]< y[sortColumnName]) ? 1 : -1 ));
}

function comparator(a, b) {
    return (parseInt(b["numbers"], 10)) - (parseInt(a["numbers"], 10));
    // return parseFloat(b.score) - parseFloat(a.score);
}

router.get('/', function(req, res, next) {
  request(url,function(error,response,body){
    res.render('index', { title: 'Microsoft Kinect Dance-Off', data:JSON.parse(body).sort(comparator).slice(0,5)});
  });
});

router.get('/scores', function(req, res, next) {
  res.render('scores')
  
});

router.post('/scores', function (req, res) {
    res.render('scores', postData(req.body.FirstName, req.body.LastName, req.body.Score, req.body.numbers, req.body.numbers2));
});

module.exports = router;

function postData(firstname, lastname, Score) {

    var user = {
        firstName: firstname,
        lastName: lastname,
        score: Score,
        numbers: Score,
        numbers2: Score
    };

    var userString = JSON.stringify(user);

    var headers = {
        'Accept': "application/json",
        'Content-Type': 'application/json',
        'Content-Length': userString.length,
        'X-ZUMO-APPLICATION': config.appkey
    };

    var options = {
        host: config.mobileservices + '.azure-mobile.net',
        port: 443,
        path: '/tables/' + config.table,
        method: 'POST',
        headers: headers
    };

    // Setup the request.  The options parameter is
    // the object we defined above.
    var req = https.request(options, function (res) {
        res.setEncoding('utf-8');

        var responseString = '';

        res.on('data', function (data) {
            responseString += data;
        });

        res.on('end', function () {
            var resultObject = JSON.parse(responseString);
        });
    });

    req.on('error', function (e) {
        // TODO: handle error.
    });

    req.write(userString);
    req.end();
}


