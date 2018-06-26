var express = require('express'),
	path = require('path'),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	expressSession = require('express-session'),
	passport  = require('passport'),
	port = process.env.PORT || 8080;

mongoose.connect('mongodb://vitodo:tCWaHjJPRrWcAnPojMK18LOe2yf06ybV2sf1HVQ1pchMwwmmGlLAFGcBzqsvfVcLoXJsFwPFox38SSYc2pIjlg==@vitodo.documents.azure.com:10255/?ssl=true&replicaSet=globaldb');

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(expressSession({
	secret: 'tajneslovo123',
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/todo', require('./routes/todo'));
app.use('/', require('./routes/user'));

app.listen(port);
console.log('TODO app is running...');
module.exports = app;