var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const userService = require('../services/user_service')
const tokenService = require('../services/token_service')
const TW_JWTSECRET = "TW_JWTSECRET";
/* GET users listing. */
router.get('/', async function (req, res, next) {
  res.json({ res: "get works" })
})

router.post('/', async function (req, res, next) {
  var val = {
    email: req.body.email,
    password: req.body.password
  }
  // let expireTime = Math.floor(Date.now() / 1000) + (60 * 60 * 24); //1day
  let expireTime = Math.floor(Date.now() / 1000) + (60 * 60)  //1hr
  let oldUser = await userService.getUser({ email: req.body.email })
  if (oldUser) {
    if (oldUser.password != req.body.password) {
      res.status(200).json({ success: false, response: "Username or password not match!" })
    } else {
      let tkn_data={
        email: oldUser.email,
        password: oldUser.password
      }
      let deleteToken = await tokenService.deleteToken({email:req.body.email})
      let token4oldUser = await generateToken(tkn_data, expireTime)
      let seveToken = await tokenService.createToken({token:token4oldUser.token,email:oldUser.email})
      res.status(200).json({ success: true, token: token4oldUser.token })
    }
    return
  }
  let token = await generateToken(val, expireTime)
  let seveToken = await tokenService.createToken({token:token.token,email:req.body.email})
  var user = {
    email: req.body.email,
    password: req.body.password,
    token: token
  }
  let newUser = await userService.createUser(user)
  res.status(200).json(token)

  function generateToken(user, expireTime) {
    return new Promise((resolve, reject) => {
      let payload = {
        email: req.body.email,
        password: req.body.password
      };
      if (expireTime) { payload.exp = expireTime };

      jwt.sign(payload, TW_JWTSECRET, function (err, token) {
        if (err) reject(err);
        // console.log(expireTime)

        let response = { token: token };
        // if(expireTime) { response.expireTime = expireTime; }
        if (expireTime) { response.expireTime = expireTime; }
        resolve(response);
      });
    });
  }
});
router.post('/check_token', async function (req, res, next) {
  console.log(req.body)
})
module.exports = router;
