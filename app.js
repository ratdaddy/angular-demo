
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
  app.use(express.static(__dirname + '/angular'));
  app.use(express.static(__dirname + '/kendo'));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);

app.get('/movies/config.json', function(req, res) {
  res.json([
    { title: 'Title', field: 'title' },
    { title: 'Year', field: 'year' }
  ]);
});
app.get('/movies/data.json', function(req, res) {
  res.json([
    { title: 'Star Wars: A New Hope', year: 1977 },
    { title: 'Star Wars: The Empire Strikes Back', year: 1980 }
  ]);
});

app.get('/games/config.json', function(req, res) {
  res.json([
    { title: 'Name', field: 'name' },
    { title: 'Publisher', field: 'publisher' }
  ]);
});
app.get('/games/data.json', function(req, res) {
  res.json([
    { name: 'Battleship', publisher: 'Hasbro' },
    { name: 'Monopoly', publisher: 'Milton Bradley' }
  ]);
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
