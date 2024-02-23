var mysql=require('mysql');
var express=require('express');
var cookie=require('cookie');
var database=require.main.require('./db/db_controller')

function homepage(req, res, next)  {
    res.render('homepage.ejs');
}

module.exports=homepage;