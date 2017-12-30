const express = require("express")
const router = express()
const { createRequest } = require("../util/util")
const querystring = require('querystring');

router.get("/", (req, res) => {
  const offset = req.query.offset || 0
  const limit = req.query.limit || 50
  const qs = querystring.parse(req.url.split('?')[1]);
  createRequest(`/api/artist/top?offset=${offset}&total=false&limit=${limit}`, 'GET', null)
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