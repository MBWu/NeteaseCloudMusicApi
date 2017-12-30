const express = require("express")
const router = express()
const { createWebAPIRequest } = require("../util/util")
const querystring = require('querystring');
router.get("/", (req, res) => {
  const rid=req.query.id
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  const data = {
    "offset": req.query.offset || 0,
    "rid": rid,
    "limit": req.query.limit || 20,
    "csrf_token": ""
  }
  const qs = querystring.parse(req.url.split('?')[1]);
  createWebAPIRequest(
    'music.163.com',
    `/weapi/v1/resource/comments/R_AL_3_${rid}/?csrf_token=`,
    'POST',
    data,
    cookie,
    music_req => {

      if( qs.callback ){

        var callback = qs.callback + "(" + music_req + ");";
        res.send(callback);
      }else {

        res.send( music_req );
      }
      
    },
    err => res.status(502).send('fetch error')
  )
})

module.exports = router