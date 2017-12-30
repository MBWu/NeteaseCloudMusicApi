const express = require("express")
const router = express()
const { createWebAPIRequest } = require("../util/util")
const querystring = require('querystring');

router.get("/", (req, res) => {
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  let csrf = req.query.t || ''
  for (let i in cookie) {
    if (cookie[i].name == '__csrf') {
      csrf = cookie.value
    }
  }
  const data = {
    "csrf_token": csrf
  }
  const qs = querystring.parse(req.url.split('?')[1]);
  createWebAPIRequest(
    'music.163.com',
    `/weapi/login/token/refresh?csrf_token=${csrf}`,
    'POST',
    data,
    cookie,
    music_req => {
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