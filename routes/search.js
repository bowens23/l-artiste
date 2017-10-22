const express = require('express');
const router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
  console.log(req.body.searchType);
  
  if(req.body.searchType === 'artist'){
    
    res.redirect(`/artists/${req.body.search}`);
  }
  else if(req.body.seachType === 'artwork'){
    
    res.redirect(`/artwork/${req.body.search}`);
  }
  else if(req.body.seachType === 'category'){
    
    res.redirect('/');
  }
  
});

module.exports = router;
