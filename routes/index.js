const express = require('express');
const router = express.Router();

const db = require("../models");

/* GET home page. */
router.get('/', function(req, res, next) {
  
  db.Artwork.findAll({
    limit: 8,
    include:{
      model: db.Artist
    },
    order:[
      ['rating', 'DESC']
    ]
  }).then((artworks) =>{
    res.render('index', 
      { 
        title: "L'Artiste",
        artworks: artworks
      });
  })
  
});

router.get('/user/account', function(req, res, next) {
  
  if(req.user){
    res.render('account');
  }
  else{
    res.redirect('/');
  }
    
});

module.exports = router;
