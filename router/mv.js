const express = require("express")
const router = express()
const { createRequest } = require("../util/util")
const request=require("request")
const querystring = require('querystring');

router.get("/", (req, res) => {
  const mvid = req.query.mvid;
  const qs = querystring.parse(req.url.split('?')[1]);
  createRequest(`/api/mv/detail/?id=${mvid}&type=mp4`, 'GET', null)
    .then(result => {
      res.setHeader("Content-Type", "application/json")

      if(qs.callback ){
        
                var callback = qs.callback + "(" + result + ");";
                res.send(callback);
              }else{
        
                res.send(result);
              }

   
    })
    .catch(err => {
      res.status(502).send('fetch error')
    })
})


module.exports = router