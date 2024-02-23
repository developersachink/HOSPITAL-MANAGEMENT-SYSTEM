var express = require('express');
var mysql = require('mysql');
var session = require('express-session');
var bodyParser = require('body-parser');
var sweetalert = require('sweetalert2');
const { check, validationResult } = require('express-validator');

var router = express.Router();
var db = require.main.require('./db/db_controller');

function dashboard(req, res, next) {
    if (req.session && req.session.loggedin) {
        // User is logged in, render the dashboard view
        res.render('dashboard.ejs');
    } else {
        // User is not logged in, redirect to login page
        res.redirect('/login'); // Assuming you have a login route
    }
}
module.exports=dashboard;