const amqp = require('amqplib/callback_api');
const cheerio = require('cheerio');
const fs = require('fs');

function Crawler(error, response, html) {
      if (!error) {
          let $ = cheerio.load(html);
          var film = { title: '', releaseDate: '', rating: '' }
          film.title = $('.title_wrapper').children('h1').text();
          film.releaseDate = $('#titleYear').children('a').text();
          film.rating = $('.ratingValue').children('strong').children('span').attr('itemprop', 'ratingValue').text();
          fs.appendFile('listSearch.csv', film , function (err) {
            if (err) throw err;
            console.log('Updated!');
          });
      }
}

amqp.connect('amqp://localhost', function(err, conn) {
    conn.createChannel(function(err, ch) {
        // declare queue again in case the 
        var queue = 'URL';
        ch.assertQueue(queue, {durable: false});
        ch.consume(q, function(msg) {
            var url = msg.content.toString()
            request(url, Crawler)
        }, { noAck: true });
    });
    // We close the connection and exit
});
