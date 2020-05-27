var config = require('../../config');
var Twitter = require('node-tweet-stream'),
t = new Twitter({
  consumer_key:         config.twitter.key,
  consumer_secret:      config.twitter.key_secret,
  token:         config.twitter.token,
  token_secret:  config.twitter.token_secret,
});
t.on('tweet', function (tweet) {
  //console.log('tweet received', tweet)
  //console.log((JSON.stringify(tweet.text)))
  if(!(tweet.retweeted === 'true')){
    console.log(tweet.text)
  }
})

t.on('error', function (err) {
  console.log('Oh no')
})

t.track('bitcoin')

// 10 minutes later