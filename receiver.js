const { Connection } = require('amqplib-as-promised');
const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

// crawler to get data
function crawler(error, response, html) {
      if (!error) {
          // cheerio to get necessary data
          let $ = cheerio.load(html);
          var film = { title: '', releaseDate: '', rating: '' }
          film.title = $('.title_wrapper').children('h1').text().trim();
          film.releaseDate = $('#titleYear').children('a').text().trim();
          film.rating = $('.ratingValue').children('strong').children('span').attr('itemprop', 'ratingValue').text().trim();
          if (film.title != '') {
              var title = film.title.trim().replace(/[<>:;%\$\s]+/g, '-');
              // write to JSON file
              fs.writeFile(`filmList/${title}.json`, JSON.stringify(film) , function (err) {
                if (err) {
                    throw err;
                }
                console.log('Crawled %s !', film.title.trim());
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
    var queue = 'filmQueue';
    await channel.assertQueue(queue, {durable: true});

    // the prefetch(1) method tells RabbitMQ to not dispatch a new message to receiver until receive acknowledged the prev one.
    await channel.prefetch(1);
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
    await channel.consume(queue, function(msg) {
                    var url = msg.content.toString();
                    console.log("Received: ", url);
                    setTimeout(() => {
                        channel.ack(msg);
                        console.log('Acked!');
                        request(url, crawler);
                    }, 1000);
                }, { noAck: false });
}

receiver();
