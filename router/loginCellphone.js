const express = require("express")
const crypto = require('crypto')
const router = express()
const { createWebAPIRequest } = require("../util/util")
const querystring = require('querystring');

router.get("/", (req, res) => {
  const phone = req.query.phone
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  const md5sum = crypto.createHash('md5')
  md5sum.update(req.query.password)
  const data = {
    'phone': phone,
    'password': md5sum.digest('hex'),
    'rememberLogin': 'true'
  }
  const qs = querystring.parse(req.url.split('?')[1]);
  createWebAPIRequest(
    'music.163.com',
    '/weapi/login/cellphone',
    'POST',
    data,
    cookie,
    (music_req, cookie) => {
      console.log(music_req)
      res.set({
        'Set-Cookie': cookie,
      })
      if(qs.callback ){
        
                var callback = qs.callback + "(" + music_req + ");";
                res.send(callback);
              }else{
        
                res.send(music_req);
              }
    },
    err => res.status(502).send('fetch error')
  )
})

module.exports = router