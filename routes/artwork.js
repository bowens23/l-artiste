const express = require('express');
const router = express.Router();

const db = require("../models");

/* GET All Artwork */
router.get('/', function(req, res, next) {
  
  db.Artwork.findAll({
    include:{
      model: db.Artist
    },
  })
    .then((artworks) =>{
      res.render('search-category', 
        { 
          title: "L'Artiste",
          artworks: artworks
        });
  })
  
});

/* GET new art page */
router.get('/new-art', function(req, res, next) {
  
  res.render('create-shop');
  
});

/* GET artwork by id */
router.get('/:id', function(req, res, next) {
  
  db.Artwork.findOne({
    limit: 1,
    where: {
      id: req.params.id
    },
    include:{
      model: db.Artist,
      //model: db.Rating
    }
  }).then((artwork) =>{
    res.render('artwork', 
      { 
        title: "L'Artiste",
      
        artwork: artwork
      });
  })
  
});

/* GET artwork by category */
router.get('/category/:category', function(req, res, next) {
  
  db.Artwork.findAll({
    include:{
      model: db.Artist
    },
    where: {
      category: req.params.category
    },
    order:[
      ['rating', 'DESC']
    ]
  }).then((artworks) =>{
    res.render('search-category', 
      { 
        title: "L'Artiste",
        category: artworks[1].dataValues.category,
        artworks: artworks
      });
  }).catch((err) =>{
    res.render('search-category');
  })
  
});

/* POST new artwork */
router.post('/new-art', function(req, res, next){
  
  db.Artwork.findOrCreate({
    where: {
      title: req.body.title,
      category: req.body.category,
      description: req.body.description,
      media: req.body.media,
      rating: 1,
      price: req.body.price,
    }
  })
  .spread((artwork, created) => {
    
    res.redirect(`/artworks/${artwork.id}`);
  })

})

module.exports = router;
