var express = require('express');
const authUilities = require('../utilities/authenticationMiddlewares');
const db = require('../database/handler');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/api/users/signup', function(req, res, _next) {
  let name = req.body.name;
  let email = req.body.userEmail;
  let password = req.body.userPassword;

  db.getUser(email)
    .then((results) => {
      if (results.length > 0) res.status(400).send('User already exists');
      else {
        db.createUser(name, email, authUilities.hashPassword(password))
          .then((results) => {
            res.status(200).send('User created');
          })
          .catch((err) => {
            res.status(500).send('Error creating user');
          });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Error creating user');
    });
  
});

router.post('/api/users/login', (req, res, _next) => {
  let email = req.body.userEmail;
  let password = req.body.userPassword;

  authUilities.authenicateUser(email, password)
    .then((user) => {
      let token = authUilities.generateToken(user);
      res.status(200).send(token);
    })
    .catch((err) => {
      res.status(401).send('Invalid credentials');
    });
});

module.exports = router;
