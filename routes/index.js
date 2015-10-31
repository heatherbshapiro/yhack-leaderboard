var express = require('express');
var router = express.Router();
var request = require('request');
var sort = require('sort')

var url = "https://leaderboarddance.azure-mobile.net/tables/scores";


var sortColumnName = "score";

function SortByName(x,y) {
      return ((x[sortColumnName]  == y[sortColumnName]) ? 0 : ((x[sortColumnName]< y[sortColumnName]) ? 1 : -1 ));
}

router.get('/', function(req, res, next) {
  request(url,function(error,response,body){
    res.render('index', { title: 'Kinect Tournament Leaderboard', data:JSON.parse(body).sort(SortByName).slice(1,6)});
    // res.render('index', { title: 'Kinect Tournament LeaderBoard', data: {firstName: "Heather", lastName: "Shapiro", score: "20"}});
  });
});

router.get('/scores', function(req, res, next) {
  res.render('scores')
  
});

module.exports = router;