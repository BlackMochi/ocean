const mysql = require('mysql')
const express = require('express')
const app = express()
const path = require('path')
var connection = mysql.createConnection({
	host: '178.128.214.189',
	user: 'root',
	database: ''
})
