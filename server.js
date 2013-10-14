
/**
 * Module dependencies.
 */
require('coffee-script');

var express    = require('express'),
    RedisStore = require('connect-redis')(express),
    flash      = require('connect-flash');

var http = require('http');
var path = require('path');

var app = module.exports = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({
  secret: 'sdfksdfjkh3j4khr3j4hjkadhkjHK47767JHKJh8787*&*&',
  store: new RedisStore()
}));
app.use(flash());
require('./apps/helpers')(app);
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

if ('test' == app.get('env')) {
  app.set('port', 3001);
  app.use(express.errorHandler());
}

require('./apps/authentication/routes')(app);

http.createServer(app).listen(app.settings.port, function(){
  console.log('Express server listening on port ' + app.settings.port);
});