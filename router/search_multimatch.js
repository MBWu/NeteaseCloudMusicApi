const express = require("express")
const router = express()
const { createWebAPIRequest } = require("../util/util")
const querystring = require('querystring');

router.get("/", (req, res) => {
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  const data = {
    "csrf_token": "",
		type: req.query.type  || 1,
		s: req.query.keywords || req.query.keywords || ''
  }
  const qs = querystring.parse(req.url.split('?')[1]);
  createWebAPIRequest(
    'music.163.com',
    '/weapi/search/suggest/multimatch',
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