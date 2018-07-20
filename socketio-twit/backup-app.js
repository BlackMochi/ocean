var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var path = require('path');
var request = require('request')
var axios = require('axios')
var port = 9500;
const sentimental = require('@zanroo/sentimental')
 
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var server = app.listen(port, function() {
    console.log('Listening on port: ' + port);
}); 
 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug'); 
app.use(express.static('public'));
 
app.get('/', function(req, res) {
    res.render('index');
});

app.get('/hin', function(req, res) {
    res.render('hin');
});

app.get('/test', function(req, res) {
    res.render('test');
});
/*
app.get('/messages/all', (req,res) => {
    console.log("Send all messages")
    str_json = ""
    var url = 'http://178.128.214.189:9200/twitter/messages/_search?size=10000';
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            jsonObject = JSON.parse(body)
            str_json += "["
            if(jsonObject.hits.hits[0])
                str_json += JSON.stringify(jsonObject.hits.hits[0]._source)
            for(var i = 0; jsonObject.hits.hits[i]; i++) {
                str_json += ","
                str_json += JSON.stringify(jsonObject.hits.hits[i]._source)
            }
            str_json += "]"
sages/all/byuser/number           new_json = JSON.parse(str_json)
            res.json(new_json)
        }
    });
})
*/
app.get('/messages/all/byuser/number/:number', (req,res) => {
    var num = req.params.number
    console.log("Send " + num + " messages")
    var str_json = ""
    var url = 'http://178.128.214.189:9200/twitter/messages/_search?size=' + num;
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            jsonObject = JSON.parse(body);
            str_json += "["
            if(jsonObject.hits.hits[0]) {
                //str_json += JSON.stringify(jsonObject.hits.hits[0]._source)
                str_json += '{'
                str_json += '"name":"' + jsonObject.hits.hits[0]._source.user.name + '",'
                str_json += '"followers":"' + jsonObject.hits.hits[0]._source.user.followers_count + '",'
                str_json += '"friends":"' + jsonObject.hits.hits[0]._source.user.friends_count + '",'
                str_json += '"listed":"' + jsonObject.hits.hits[0]._source.user.listed_count + '",'
                str_json += '"favourites":"' + jsonObject.hits.hits[0]._source.user.favourites_count + '"'
                str_json += '}'
            }
            for(var i = 1; i < num; i++) {
                str_json += "," 
                //str_json += JSON.stringify(jsonObject.hits.hits[i]._source)
                str_json += '{'
                str_json += '"name":"' + jsonObject.hits.hits[i]._source.user.name + '",'
                str_json += '"followers":"' + jsonObject.hits.hits[i]._source.user.followers_count + '",'
                str_json += '"friends":"' + jsonObject.hits.hits[i]._source.user.friends_count + '",'
                str_json += '"listed":"' + jsonObject.hits.hits[i]._source.user.listed_count + '",'
                str_json += '"favourites":"' + jsonObject.hits.hits[i]._source.user.favourites_count + '"'
                str_json += '}'
            }
            str_json += "]"
            new_json = JSON.parse(str_json)
            //console.log(new_json)
            res.json(new_json)
        }
    })
})

app.get('/messages/all/byfield/number/:number', (req,res) => {
    function cutSingleCode(strd) {
        var re = new RegExp("'", 'g');
        var res = strd.toString().replace(re, "");
        return res
    }
    var num = req.params.number
    console.log("Send " + num + " messages by field")
    var str_json = ""
    var url = 'http://178.128.214.189:9200/twitter/messages/_search?size=' + num;
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            jsonObject = JSON.parse(body);
            console.log(JSON.stringify(jsonObject, null, 4))
            if(jsonObject.hits.hits[0]) {
                var str_name_json = '"name":["' + cutSingleCode(jsonObject.hits.hits[0]._source.user.name) + '"'
                var str_followers_json = '"followers":["' + cutSingleCode(jsonObject.hits.hits[0]._source.user.followers_count) + '"'
                var str_friends_json = '"friends":["' + cutSingleCode(jsonObject.hits.hits[0]._source.user.friends_count) + '"'
                var str_listed_json = '"listed":["' + cutSingleCode(jsonObject.hits.hits[0]._source.user.listed_count) + '"'
                var str_favourites_json = '"favourites":["' + cutSingleCode(jsonObject.hits.hits[0]._source.user.favourites_count) + '"'
            }
            for(var i = 1; i < num; i++) {
                str_name_json += ',"' + cutSingleCode(jsonObject.hits.hits[i]._source.user.name) + '"'
                str_followers_json += ',"' + cutSingleCode(jsonObject.hits.hits[i]._source.user.followers_count) + '"'
                str_friends_json += ',"' + cutSingleCode(jsonObject.hits.hits[i]._source.user.friends_count) + '"'
                str_listed_json += ',"' + cutSingleCode(jsonObject.hits.hits[i]._source.user.listed_count) + '"'
                str_favourites_json += ',"' + cutSingleCode(jsonObject.hits.hits[i]._source.user.favourites_count) + '"'
            }                                                                                                                                                               
            str_all_json = '{'
            str_all_json += str_name_json + '],'
            str_all_json += str_followers_json + '],'
            str_all_json += str_friends_json += '],'
            str_all_json += str_listed_json += '],'
            str_all_json += str_favourites_json + ']'
            str_all_json += '}'
            console.log(str_all_json)
            new_json = JSON.parse(str_all_json)
            console.log(new_json)
            res.json(new_json)
        }
    })
})

app.get('/messages/name/:name', (req,res) => {
    var name = req.params.name
    console.log("search name '" + name + "'")
    var str_json = ""
    var url = 'http://178.128.214.189:9200/twitter/messages/_search?q=user.name:' + name
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            jsonObject = JSON.parse(body)
            str_json += "["
            if(jsonObject.hits.hits[0])
                str_json += JSON.stringify(jsonObject.hits.hits[0]._source)
            for(var i = 1; jsonObject.hits.hits[i]; i++) {
                str_json += ","
                str_json += JSON.stringify(jsonObject.hits.hits[i]._source)
            }
            str_json += "]"
            new_json = JSON.parse(str_json)
            res.json(new_json)
        }
    })
})
const io = require('socket.io').listen(server);
io.on('connection', function(socket) {
    //console.log('a user connected');
    socket.emit('new message','Hello from server.')
    socket.on('new message', function(message) {
        //console.log(message);
    });
    socket.on('msg', function(message) {
        //console.log(message);
        //sentimental(message.text).then(console.log(result.score))
        socket.broadcast.emit('msg2',message)
        //socket.broadcast.emit('score',message)
    });
});

