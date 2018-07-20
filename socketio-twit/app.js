var express = require('express');
var app = express();
var path = require('path');
var port = 8081;

var server = app.listen(port, function() {
    console.log('Listening on port: ' + port);
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static('public'));

app.get('/', function(req, res) {
    res.render('index');
    
});
app.get('/chart', function(req, res) {
    res.render('chart');
});
app.get('/test', function(req, res) {
        res.render('test');
});

const io = require('socket.io').listen(server);
io.on('connection', function(socket) {
    //console.log('a user connected');
    socket.emit('new message','Hello from server.')
    socket.on('new message', function(message) {
	 console.log(message);
    });
    socket.on('msg', function(message) {
        console.log(message);
        socket.broadcast.emit('msg2',message)
    });
});
