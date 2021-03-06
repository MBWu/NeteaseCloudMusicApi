// 签到
const express = require('express')
const router = express()
const { createWebAPIRequest } = require('../util/util')
const querystring = require('querystring');
router.get('/', (req, res) => {
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  let type = req.query.type || 0 //0为安卓端签到 3点经验,1为网页签到,2点经验
  const data = {
    csrf_token: '',
    type
  }
  // {'android': {'point': 3, 'code': 200}, 'web': {'point': 2, 'code': 200}}
  // {'android': {'code': -2, 'msg': '重复签到'}, 'web': {'code': -2, 'msg': '重复签到'}}
  // 'android': {'code': 301}, 'web': {'code': 301}}
  const qs = querystring.parse(req.url.split('?')[1]);
  createWebAPIRequest(
    'music.163.com',
    '/weapi/point/dailyTask',
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
