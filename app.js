var Twitter = require('twitter');
var Nedb = require('nedb');
var twts = new Nedb({
    filename: 'datatwitterbot.db',
    autoload: true
});

var client = new Twitter({
    consumer_key: '',
    consumer_secret: '',
    access_token_key: '',
    access_token_secret: ''
});

/*client.get('favorites/list', function(error, tweets, response) {
    if (error) throw error;
    console.log(tweets);
    console.log(response);
});*/

client.get('search/tweets', {
    q: 'ionic2'
}, function(error, tweets, response) {
    for (o in tweets.statuses) {
        if (tweets.statuses[o].text.indexOf('http') !== -1) {
            showtwitters(tweets.statuses[o]);
        }
    }
});

function showtwitters(obj) {
    twts.find({
        id: obj.id
    }, function(err, docs) {
        console.log(err, docs);
        if (docs.length === 0) {
            twts.insert({
                id: obj.id
            }, function(err) {});
            console.log(obj.text);
            console.log("===========================");
        }
    });
}

/*client.stream('statuses/filter', {
    track: 'ionicframework'
}, function(stream) {
    stream.on('data', function(tweet) {
        console.log(tweet.text);
        console.log("================================");
    });

    stream.on('error', function(error) {
        throw error;
    });
});*/
/*
client.post('statuses/update', {status: 'Teste2'},  function(error, tweet, response){
  if(error) throw error;
  console.log(tweet);  
  console.log(response);  
});*/
