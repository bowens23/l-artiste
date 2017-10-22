const express = require('express');
const router = express.Router();
const passport = require('passport');

const db = require("../models");

/* GET Login Page */
router.get('/', function(req, res, next) {
  res.render('login');
})

/* POST L */
router.post('/',
  passport.authenticate('local', 
      { 
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
      })
);

module.exports = router;
