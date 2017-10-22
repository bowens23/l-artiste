// Passport Authentication
const passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

const express = require('express');
const session = require('express-session');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const bcrypt = require('bcryptjs');
let salt = bcrypt.genSaltSync(10);


const db = require("../models");


// Authentication Middleware
module.exports = function(app){
  let hash = bcrypt.hashSync('brian', salt);
  app.locals.hash = hash;
  console.log(app.locals.hash)
  app.use(session({ 
    secret: 'secret',
    saveUninitialized: true,
    resave: true
  }));
  
  // Initialize Passport
  app.use(passport.initialize());
  app.use(passport.session());
  
  // Connect Flash
  app.use(flash());
  
  // Express Validator
  app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
        , root    = namespace.shift()
        , formParam = root;

      while(namespace.length) {
        formParam += '[' + namespace.shift() + ']';
      }
      return {
        param : formParam,
        msg   : msg,
        value : value
      };
    }
  }));

  // Authentication Strategy
  passport.use(new LocalStrategy(
    function(email, password, done) {
      console.log('------------LOGIN----------------')
      
      db.User.findOne({where: { email: email }}).then(function(user) {
//        let hash = bcrypt.hashSync(password, salt);
//        console.log(bcrypt.compareSync(user.password, app.locals.hash));
//        console.log(user.password, app.locals.hash);
        
        if (!user) {
          return done(null, false, { message: 'Incorrect email.' });
        }
        if (user.password !== password) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      }).catch(err => {
        
        console.log(err, " ...");
        if (err) { 
          done(null, false, { message: 'Unknown User' })
        }
        
      });
    }
  ));
  
  // Session Management
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    db.User.findById(id).then(function(user) {
      done(null, user);
    }).catch(function(err) {
      done(err, null)
    });
  });
}

