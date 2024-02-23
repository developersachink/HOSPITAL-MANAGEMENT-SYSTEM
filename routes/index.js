const express = require('express');
const router = express.Router();
var session = require('express-session');
const { check, validationResult } = require('express-validator');

const homepage = require('../controllers/homepage');
const {login,verifylogin} = require('../controllers/loginController');
const {signup, verifysignup ,signupsuccess }= require('../controllers/signupController');
const dashboard = require('../controllers/dashboardController');
const logout = require('../controllers/logoutcontroller');


//routes landing & homepage
router.get('/',homepage);

// login router foe admin dashboard
router.get('/login',login);
router.post('/login',verifylogin);

// admin dasboard router
router.get('/dashboard',dashboard);
router.get('/logout',logout)
//signup router for registration
router.get('/signup',signup)
router.post('/signup',verifysignup)
router.get('/signupsuccess',signupsuccess)




module.exports = router;

