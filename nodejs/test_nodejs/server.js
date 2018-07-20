var express = require('express')
var path = require('path')
var app = express()

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.end('สวัสดีชาวโลก\n');
  });

app.set('view engine','ejs')
app.get('/ejs',(req,res) => {
	res.render('test01',{name:'mochi'})
})

app.listen(3000,() => {
	console.log('App running on port 3000')
})
