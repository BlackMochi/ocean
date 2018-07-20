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

var io = require('socket.io').listen(server);
 
io.on('connection', function(socket) {
    //console.log('a user connected');
    socket.on('message', function(message) {
        console.log(message);
    });
});
