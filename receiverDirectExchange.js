const { Connection } = require('amqplib-as-promised');
const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

var args = process.argv.slice(2);

// crawler to get data 
function crawler(error, response, html) {
    if (!error && response.statusCode === 200) {
        let $ = cheerio.load(html);
        var film = { title: '', releaseDate: '', rating: '' }
        film.title = $('.title_wrapper').children('h1').text().trim();
        film.releaseDate = $('#titleYear').children('a').text().trim();
        film.rating = $('.ratingValue').children('strong').children('span').attr('itemprop', 'ratingValue').text().trim();
        // console.log(film);
        if (film.title != '') {
            var title = film.title.trim().replace(/[<>:;%\$\s]+/g, '-');
            fs.writeFile(`filmList/${title}.json`, JSON.stringify(film) , function (err) {
                if (err) {
                    throw err; 
                }
                console.log('Crawled %s !', film.title.trim());
            });
        }
    }
}

if (args.length == 0) {
    console.log("Usage: receiverDirectExchange.js [info] [warning] [error]");
    process.exit(1);
}

async function receiver() {
    // Connect to the RabbitMQ server
    const connection = new Connection('amqp://localhost');
    await connection.init();

    // createConfirmChannel
    const channel = await connection.createChannel(); 

    // Create exchange
    var exchange = 'exchangeFilmURLs';
    await channel.assertExchange(exchange, 'direct', { durable: true });

    await channel.assertQueue('', {
        exclusive: true
        }).then((q) => {
            console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
            
            // Subscribing 
            args.forEach(function (severity) {
                channel.bindQueue(q.queue, exchange, severity);
            });
            var queue = q.queue;
            channel.consume(queue, function(msg) {
                if (msg !== null) {
                    var url = msg.content.toString(); 
                    console.log(" Received: [%s] %s", msg.fields.routingKey, url);
                    request(url, crawler);
                } 
            }, {
                noAck: true,
            });
    }).catch((err) => {
        throw err2;
    });
}

receiver();