const express = require("express")
const router = express()
const request = require("request")
const { createWebAPIRequest } = require("../util/util")
const querystring = require('querystring');
router.get("/", (req, res) => {
    const id = parseInt(req.query.id)
  const br = parseInt(req.query.br || 999000)
  const data = {
    "ids": [id],
    "br": br,
    "csrf_token": ""
  }
  const cookie = req.get('Cookie') ? req.get('Cookie') : '';
  const qs = querystring.parse(req.url.split('?')[1]);
  createWebAPIRequest(
    'music.163.com',
    '/weapi/song/enhance/player/url',
    'POST',
    data,
    cookie,
    music_req => {
      var callback;
    
      if(qs.callback){

        if(JSON.parse(music_req).code==200){
          callback = qs.callback + "(" +{success: true, message: 'ok'} + ");";
  
        }else {
  
          callback = qs.callback + "(" +{success: false, message: '亲爱的,暂无版权'} + ");";
        }
  
        return res.send(callback);
      }else {

        if(JSON.parse(music_req).code==200){
          res.send({success: true, message: 'ok'}) 
  
        }else {
  
          res.send({success: false, message: '亲爱的,暂无版权'});
        }
      }
      
    },
    err => {
      res.status(502).send('fetch error')
    }
  )
})


module.exports = router