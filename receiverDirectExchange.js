var amqp = require('amqplib/callback_api');
const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

var args = process.argv.slice(2);

// crawler to get data 
function crawler(error, response, html) {
      if (!error) {
          let $ = cheerio.load(html);
          var film = { title: '', releaseDate: '', rating: '' }
          film.title = $('.title_wrapper').children('h1').text().trim();
          film.releaseDate = $('#titleYear').children('a').text().trim();
          film.rating = $('.ratingValue').children('strong').children('span').attr('itemprop', 'ratingValue').text().trim();
          // console.log(film);
          if (film.title != '') {
              fs.writeFile(`filmList/${film.title}.json`, JSON.stringify(film) , function (err) {
                if (err) {
                    throw err; 
                }
                console.log('Crawled!');
              });
          }
      }
}

if (args.length == 0) {
    console.log("Usage: receiverDirectExchange.js [info] [warning] [error]");
    process.exit(1);
}

// Connect to the RabbitMQ server
amqp.connect('amqp://localhost', function(error0, connection) {
  if (error0) {
    throw error0;
  }
  // createConfirmChannel
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }
    // Create exchange
    var exchange = 'filmURLs';
    channel.assertExchange(exchange, 'direct', { durable: true });

    channel.assertQueue('', {
        exclusive: true
        }, function(error2, q) {
            if (error2) {
                throw error2;
            }
            console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
            
            // Subscribing 
            args.forEach(function (severity) {
                channel.bindQueue(q.queue, exchange, severity);
            });
            channel.prefetch(1);
            channel.consume(q.queue, function(msg) {
                if (msg !== null) {
                    var url = msg.content.toString(); 
                    console.log(" Received: [%s] %s", msg.fields.routingKey, url);
                    request(url, crawler);
                } 
            }, {
                noAck: false,
            });
        });
    });
});
