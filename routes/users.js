var express = require('express');
var router = express.Router();



var User = require('../models/users');

router.get('/adduser', function(req,res){

    var newUser = new User();
    newUser.email = 'abc@gmail.com';
    newUser.password = 'fdafdsaf';
    newUser.first_name = 'skylon';
    newUser.last_name = 'Sun';
    newUser.save(function (err) {
      if (err) // ...
        console.log(err);
      else
        res.end('user created');
    });;


    
});


/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource from user');
});

module.exports = router;
