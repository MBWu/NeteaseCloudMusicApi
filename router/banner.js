const express = require("express")
const router = express()
const { createRequest } = require("../util/util")
const querystring = require('querystring');
router.get("/", (req, res) => {
  const qs = querystring.parse(req.url.split('?')[1]);
  createRequest('/api/v2/banner/get', 'GET', null)
    .then(result => {
      res.setHeader("Content-Type", "application/json");
      
      if( qs.callback ){
        
                var callback = qs.callback + "(" + music_req + ");";
                res.send(callback);
              }else {
        
                res.send( music_req );
              }
    })
    .catch(err => {
      res.status(502).send('fetch error')
    })
})


module.exports = router