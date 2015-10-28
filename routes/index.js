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
    res.render('index', { title: 'YHack Dancing LeaderBoard', data:JSON.parse(body).sort(SortByName).slice(1,11)});
  });
});

module.exports = router;