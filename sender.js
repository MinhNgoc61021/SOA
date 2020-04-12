var amqp = require('amqplib/callback_api');

const getMovieByIndex = (index) => {
  index += 137523;
  return `https://www.imdb.com/title/tt0/${index}`;
}

// Connect to the RabbitMQ server
amqp.connect('amqp://localhost:5672', function(err, conn) {
 // Creating a channel, where the api for getting data
  conn.createChannel(function(err, ch) {
    // declaring the queue 
    var queue = 'URL';
    ch.assertQueue(queue, {durable: false});
    for (var i = 0; i < 150; i++) {
      var url= getMovieByIndex(i);
      ch.sendToQueue(queue, new Buffer(url));
      console.log('Sent: ' + url);
    };
  });
  // We close the connection and exit
  setTimeout(function() { conn.close(); process.exit(0) }, 500);
});