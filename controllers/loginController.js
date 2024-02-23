var express = require('express');
var mysql = require('mysql');
var session = require('express-session');
var bodyParser = require('body-parser');
var sweetalert = require('sweetalert2');
const { check, validationResult } = require('express-validator');

var router = express.Router();
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'hmsystem'
});

router.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

function login(req, res, next) {
    res.render('login.ejs');
}

function verifylogin(request, response) {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(422).json({ errors: errors.array() });
    }

    var email = request.body.email;
    var password = request.body.password;

    console.log(email, password);
    if (email && password) {
        db.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], function (error, results, fields) {
            if (error) {
                console.error(error);
                return response.status(500).send('Internal Server Error');
            }

            if (results.length > 0) {
                request.session.loggedin = true;
                request.session.email = email;
                response.cookie('email', email);
                    console.log(request.session.email);
                    console.log(request.session.loggedin);
                sweetalert.fire('Logged In!');
                response.redirect('/dashboard');
            } else {
                response.send('Incorrect username / password');
            }
        });
    } else {
        response.send('Email and password are required');
    }
}

module.exports = { login: login, verifylogin: verifylogin };
