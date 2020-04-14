const { Connection } = require('amqplib-as-promised');
const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

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

async function receiver() {
    // Connect to the RabbitMQ server
    const connection = new Connection('amqp://localhost');
    await connection.init();
    // createConfirmChannel
    const channel = await connection.createChannel(); 

     // Create queue
    var queue = 'URL';
    await channel.assertQueue(queue, {durable: false});
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
    await channel.consume(queue, function(msg) {
                    console.log(" Received: ", msg.content.toString());
                    var url = msg.content.toString();            
                    request(url, crawler);
                }, { noAck: false });
}

receiver();
