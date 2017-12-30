const express = require("express")
const router = express()
const { createWebAPIRequest } = require("../util/util")
const querystring = require('querystring');

router.get("/", (req, res) => {
  const id = req.query.id
  const br = req.query.br || 999000
  const data = {
    "ids": [id],
    "br": br,
    "csrf_token": ""
  }
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  const qs = querystring.parse(req.url.split('?')[1]);
  createWebAPIRequest(
    'music.163.com',
    '/weapi/song/enhance/player/url',
    'POST',
    data,
    cookie,
    music_req => {
      res.setHeader("Content-Type", "application/json")
      if(qs.callback ){
        
                var callback = qs.callback + "(" + music_req + ");";
                res.send(callback);
              }else{
        
                res.send(music_req);
              }
    },
    err => {
      res.status(502).send('fetch error')
    }
  )
})

module.exports = router