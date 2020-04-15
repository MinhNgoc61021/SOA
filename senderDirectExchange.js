var amqp = require('amqplib/callback_api');

const getMovieByIndex = (index) => {
  index += 137523;
  return `https://www.imdb.com/title/tt0${index}`;
}

amqp.connect('amqp://localhost', function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }
    var args = process.argv.slice(2);
    // severity is a routing key
    var severity = (args.length > 0) ? args[0] : 'info';

    // Create exchange
    var exchange = 'filmURLs';
    channel.assertExchange(exchange, 'direct', { durable: true });

    for (var i = 0; i < 10; i++)  {
      var url= getMovieByIndex(i);
      channel.publish(exchange, severity, Buffer.from(url));
      console.log("Sent [%s]: '%s'", severity, url);
    }
  });

  setTimeout(function() { 
    connection.close(); 
    process.exit(0); 
  }, 11111111);
});