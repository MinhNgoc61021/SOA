const { Connection } = require('amqplib-as-promised');

const getMovieByIndex = (index) => {
  index += 137523;
  return `https://www.imdb.com/title/tt0${index}`;
}

async function sender() {
  // Connect to the RabbitMQ server
  const connection = new Connection('amqp://localhost');
  await connection.init();
  // createConfirmChannel
  const channel = await connection.createChannel();

  var args = process.argv.slice(2);
  // routing key
  var routing_key = (args.length > 0) ? args[0] : 'info';

  // Create exchange
  var exchange = 'exchangeFilmURLs';
  channel.assertExchange(exchange, 'direct', { durable: true });

  for (var i = 0; i < 10; i++)  {
    var url= getMovieByIndex(i);
    channel.publish(exchange, routing_key, Buffer.from(url));
    console.log("Sent [%s]: '%s'", routing_key, url);
  }
  await channel.close();
  await connection.close();
  process.exit(0);
}

sender();
