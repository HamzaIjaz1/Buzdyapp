var express = require('express');
var router = express.Router();
var authHelper = require('../authHelper');
var jwt = require ('jsonwebtoken');
var config = require ('../config');


/* GET home page. */
router.get('/', authHelper.verify ,function(req, res, next) {
  // res.render('index', { title: 'Express' });
  jwt.verify(req.token,config.tokenKey.value,(err, data)=>{
if (err){
    res.status(403).send('Token not valid');
}else{
    res.json({
        message: 'Products: ',
        authdata: data
    });
}
  });
  console.log('inside products.js');
  res.send('/products');
});

module.exports = router;
