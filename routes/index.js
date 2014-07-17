var express = require('express');
var router = express.Router();

var pubnub = require('pubnub').init({
  publish_key: process.env.PUBNUB_PUBLISH_KEY || 'demo',
  subscribe_key: process.env.PUBNUB_SUBSCRIBE_KEY || 'demo'
});

pubnub.subscribe({
  channel: 'fp-demo',
  callback: function(message){
    //console.log(message);
  }
});

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

/* POST add project */
router.post('/projects', function(req, res) {
  pubnub.publish({
    channel: 'fp-demo',
    message: {
      title: req.body.title,
      subtitle: req.body.subtitle,
      cover: req.body.cover,
      body: req.body.body
    }
  });

  res.redirect('/');
});

module.exports = router;
