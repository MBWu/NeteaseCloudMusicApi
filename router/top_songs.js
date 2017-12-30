//新歌上架
const express = require("express")
const router = express()
const { createWebAPIRequest } = require("../util/util")
const querystring = require('querystring');

// type ALL, ZH,EA,KR,JP
router.get("/", (req, res) => {
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  const data = {
    'offset': request.query.offset,
		'total': true,
		'limit': request.query.limit,
		'area': request.query.type,
		"csrf_token": ""
  }
  const qs = querystring.parse(req.url.split('?')[1]);
  createWebAPIRequest(
    'music.163.com',
    '/weapi/v1/discovery/new/songs',
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