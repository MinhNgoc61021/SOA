const request = require('request');
const cheerio = require('cheerio');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const search = 'blackberry';
const productList = [];

request(`https://www.thegioididong.com/tim-kiem?key=` + search , (error, response, html) => {
  if (!error && response.statusCode === 200) {
      const $ = cheerio.load(html);
      $('.listsearch').find('li').each((i, element) => {
        product = { productName: '', productImg: '', priceTag: '' };
        product.productName = $(element).find('h3').text().trim();
        product.productImg = $(element).find('img').attr('src');
        product.priceTag = $(element).find('strong').text().trim();
  
        if (product.productName != '' && product.priceTag != '') {
          productList.push(product);
        }
      });
      
      const csvWriter = createCsvWriter({
        header: [
          {id: 'productName', title: 'Tên'},
          {id: 'productImg', title: 'Hình ảnh'},
          {id: 'priceTag', title: 'Giá bán'},
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
