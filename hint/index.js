const express = require('express')
const path = require('path')
/*
var app = require('express')();
*/
const app = express()
app.set('view engine','ejs')
app.get('/ejs',(req,res) => {
        var twit
        var MongoClient = require('mongodb').MongoClient;
        var url = "mongodb://178.128.214.189:27017/";
        MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var dbo = db.db("dev");
                dbo.collection("users").find({}).limit(20).toArray(function(err, result) {
                        if (err) throw err;
                        twit = result
                        //console.log(twit)
                        res.render('test',{name:'hint',data:twit})
                        db.close()
                })
        })
//console.log(twit)
        //res.render('test01',{data:twit, name:'mochi'})
})
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use('/static', express.static(path.join(__dirname, 'public')))
app.get('/getusers',(req,res) => {
        res.send('hello')
})
app.post('/showuser',(req, res) => {
        var username = req.body.username
        var password = req.body.password
        var txt = 'Username: '+username+'<br> Password: '+password
        res.send(txt)
})

app.get('/', function (req, res) {
	 res.send('<h1>Login Form</h1> <br> <form method="post" action="/showuser"> username: <input type="text" name="username"> <br> password: <input type="text" name="password"> <input type="submit"> </form>');
});

app.post('/newuser', function (req, res) {
    var json = req.body;
    console.log(req.body);
    console.log('*****');
    res.send('Add new ' + json.name + ' Completed!');
});
app.get('/twit',(req,res) => {
        var MongoClient = require('mongodb').MongoClient;
        var url = "mongodb://178.128.214.189:27017/";
        MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                        var dbo = db.db("dev");
                dbo.collection("users").find({},{created_at:1,text:1,'user.name':1}).limit(10).toArray(function(err, result) {
                        if (err) throw err;
                                res.send(result);
	 db.close();
                });
        });
})
/*
var port = process.env.PORT || 7777;
app.listen(port, function() {
    console.log('Starting node.js on port ' + port);
});
*/

app.listen(3000, () => console.log('Example app listening on port 3000!'))
