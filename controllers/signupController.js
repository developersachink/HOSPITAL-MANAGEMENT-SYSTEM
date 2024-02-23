var mysql = require('mysql');
var express = require('express');
var cookie = require('cookie');
const { check, validationResult } = require("express-validator");
var randomToken = require('random-token');
var db = require.main.require('./db/db_controller');
var nodemailer = require('nodemailer');
var swal = require('sweetalert'); // Import SweetAlert


function signup(req, res, next) {
    res.render('signup.ejs');
}
function signupsuccess(req, res, next) { 
    res.render('signupsuccess.ejs');
}

function verifysignup(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    var email_status = "not verified";
    var email = req.body.email;
    var username = req.body.username;
     var password=req.body.password;
    db.signup(
        req.body.username,
        req.body.email,
        req.body.password,
        email_status

        
    );

    var token = randomToken(8);

    db.verify(req.body.username, email, token);

    db.getuserid(email, function(err, result) {
        var id = result[0].id;
        var output =
            `
            <p>Dear  ` +
            username +
            `, </p>
            <p>Thanks for signing up. Your verification ID and token are given below:</p>
            <ul>
                <li>User ID: ` +
            id +
            `</li>
            <li>User Name: ` +
            username +
            `</li>
            <li> Password: ` +
            password +
            `</li>
                <li>Token: ` +
            token +
            `</li>
            </ul>
            <p>Verify Link: <a href="http://localhost:3000/verify">Verify</a></p>
            <p><strong>This is an automatically generated email. Please do not reply.</strong></p>
            <p>Regards,</p>
            <p>Hospital Manager</p>
            <p>Sachin Kumar</p>
            <pContact: > <a href="softwaredevelopersachin@gmail.com"  ></a> </p>
            `;

        var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "sachinbca2020@ismpatna.ac.in", // Your Gmail email address
                pass: "bwxq goxh zgmt bpil" ,// Your Gmail password
                debug:' true'
            }
        });

        var mailOptions = {
            from: "Hospital Team",
            to: email,
            subject: "Email Verification",
            html: output
        };

        transporter.sendMail(mailOptions, function(err, info) {
            if (err) {
                console.log(err);
            } else {
                console.log(info);
                // Show SweetAlert upon successful email sending
                res.render('signupsuccess.ejs');
            }
        });
    });
}

module.exports = {
    signup: signup,
    verifysignup: verifysignup,
    signupsuccess: signupsuccess
};
