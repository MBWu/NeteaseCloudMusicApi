const express = require('express')
const router = express()
const { createWebAPIRequest } = require('../util/util')
const querystring = require('querystring');

router.get('/', (req, res) => {
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  const songId = req.query.id
  const alg = 'RT'
  const time = req.query.time || 25
  const data = {
    csrf_token: '',
    songId
  }
  const qs = querystring.parse(req.url.split('?')[1]);
  createWebAPIRequest(
    'music.163.com',
    `/weapi/radio/trash/add?alg=${alg}&songId=${songId}&time=${time}`,
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
