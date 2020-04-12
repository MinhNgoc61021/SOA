const amqp = require('amqplib/callback_api');
const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

function Crawler(error, response, html) {
      if (!error) {
          let $ = cheerio.load(html);
          var film = { title: '', releaseDate: '', rating: '' }
          film.title = $('.title_wrapper').children('h1').text().trim();
          film.releaseDate = $('#titleYear').children('a').text().trim();
          film.rating = $('.ratingValue').children('strong').children('span').attr('itemprop', 'ratingValue').text().trim();
          console.log(film);
          fs.appendFile(`filmList/${film.title}.json`, JSON.stringify(film) , function (err) {
            if (err) throw err;
            console.log('Updated!');
          });
      }
}

amqp.connect('amqp://localhost', function(err, conn) {
    conn.createChannel(function(err, channel) {
        // declare queue again in case the 
        var queue = 'URL';
        channel.assertQueue(queue, {durable: false});
        channel.consume(queue, function(msg) {
            var url = msg.content.toString()
            request(url, Crawler)
        }, { noAck: true });
    });
    // We close the connection and exit
});
