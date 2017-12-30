const express = require("express");
const router = express();
const { createWebAPIRequest } = require("../util/util");
const querystring = require('querystring');

router.get("/", (req, res) => {
  const rid = req.query.rid;
  const cookie = req.get("Cookie") ? req.get("Cookie") : "";
  const data = {
    asc: req.query.asc,
    radioId: rid,
    limit: req.query.limit,
    offset: req.query.offset,
    csrf_token: ""
  };
   const qs = querystring.parse(req.url.split('?')[1]);
  createWebAPIRequest(
    "music.163.com",
    "/weapi/dj/program/byradio",
    "POST",
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
    err => res.status(502).send("fetch error")
  );
});

module.exports = router;
