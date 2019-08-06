var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const userService = require('../services/user_service')
const token_service = require('../services/token_service')

async function checkToken(req, res, next) {
  let token = await token_service.getToken({ token: req.headers.authorization.split(" ")[1] })
  if (token) {
    jwt.verify(req.headers.authorization.split(" ")[1], 'TW_JWTSECRET', function (err, decoded) {
      if (err) {
        res.status(200).json({ response: "expired" });
        return
      }
      console.log(decoded)
    })
    next()
  } else {
    res.status(200).json({ response: "expired" });
    return
  }
}
router.post('/', checkToken, async function (req, res, next) {
  let user = {
    token: req.body.token
  }
  let get_user = await userService.getUsers()

  res.status(200).json({ response: get_user });
});
router.get('/authenticate', function (req, res, next) {

  res.status(200).json({ success: "api/authenticate works" });
});

module.exports = router;
