const express = require('express');
const router = express.Router();

const db = require("../models");


/* GET All Artists */
router.get('/', function(req, res, next) {
  
  db.Artist.findAll({
    include:{
      model: db.Artwork
    }
  }).then((artists) =>{
    res.render('allArtists', 
      { 
        title: "L'Artiste",
        artists: artists
      });
  })
  
});

/* GET an artist by name */
router.get('/:name', function(req, res, next) {
  // Search DB for an artist
  db.Artist.findOne({
    where: {
      name: req.params.name
    },
    include:{
      model: db.Artwork
    }
  }).then((artist) =>{
    console.log(artist)
    // Get that artist's artwork
    db.Artwork.findAll({
      where: {
        id: artist.dataValues.id
      }
    }).then((artworks) => {
    
    res.render('artists', 
      {
        title: "L'Artiste",
      
        artist: artist,
                       
        artworks: artworks
      });
      
    });
    // if an artist doesn't exist
  }).catch((err) => {
    res.redirect('/');
  }) 
});

module.exports = router;
