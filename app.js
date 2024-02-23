var express=require('express');
var session=require('session');

var cookie=require('cookie');
var path=require('path');
var ejs=require('ejs');
var multer=require('multer');
var async=require('async');
var nodemailer=require('nodemailer');
var session = require('express-session');
var crypto=require('crypto');
var expressValidator=require('express-validator');
var db_controller=require('./db/db_controller');
var sweetalert=require('sweetalert2');
var bodyParser=require('body-parser');
const http=require('http');
const indexRouter = require('./routes/index');
const app=express();

app.set('view engine','ejs');
const server=http.createServer(app);


 app.use(express.static(path.join(__dirname,'public')));
// app.use(express.static('./public'))'
app.use(bodyParser.urlencoded({ extended:true }));
 app.use(bodyParser.json());
 app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false
}));
const PORT=process.env.PORT || 4000;
server.listen(PORT,() => console.log(`server listening on port ${PORT}`))


//load routes
app.use("/", indexRouter);



module.exports = app;