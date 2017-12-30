//分类歌单
const express = require("express")
const router = express()
const { createWebAPIRequest } = require("../util/util")
const querystring = require('querystring');

router.get("/", (req, res) => {
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  // order可为 'hot' 可为 'new'
  const data = {
    cat: req.query.cat || "全部",
    order: req.query.order || "hot",
    offset: req.query.offset || 0,
    total: req.query.total ? 'true' : 'false',
    limit: req.query.limit || 50
  }
  const qs = querystring.parse(req.url.split('?')[1]);
  createWebAPIRequest(
    'music.163.com',
    '/weapi/playlist/list',
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