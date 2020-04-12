const request = require('request');
const cheerio = require('cheerio');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const search = 'vsmart';
const productList = [];

request(`https://www.thegioididong.com/tim-kiem?key=` + search , (error, response, html) => {
  if (!error && response.statusCode === 200) {
      const $ = cheerio.load(html);
      $('.listsearch').find('li').each((i, element) => {
        var product = { productName: '',  priceTag: '' , productPromo: ''};
        product.productName = $(element).find('h3').text().trim();
        product.priceTag = $(element).find('strong').text().trim();
        product.productPromo = $(element).find('.promo').children('p').text().trim();
        
        if (product.productName != '' && product.priceTag != '') {
          console.log(product)
          productList.push(product);
        }
      });
      
      const csvWriter = createCsvWriter({
        header: [
          {id: 'productName', title: 'Tên'},
          {id: 'priceTag', title: 'Giá bán'},
          {id: 'productPromo', title: 'Khuyến mại'},
        ],
        path: 'listSearch.csv',
        encoding: 'ascii',
      });

      csvWriter.writeRecords(productList)
                .then(() => {
                  console.log('Done');
                });
  }  
});
