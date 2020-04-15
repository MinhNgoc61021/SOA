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
  
  // Create exchange
  var exchange = 'filmURLs';
  await channel.assertExchange(exchange, 'fanout', { durable: false }); 

  for (var i = 0; i < 10; i++)  {
    var url= getMovieByIndex(i);
    await channel.publish(exchange, '', Buffer.from(url));
    console.log('Sent: ' + url);
  }
  await channel.close();
  await connection.close();
  process.exit(0);
}

sender();