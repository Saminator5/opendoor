"use strict";
let express = require('express');
let router = express.Router();
let parse = require('csv-parse/lib/sync');
let fs = require('fs');
let d3 = require('d3');

let content;

router.get('/', (req, res, next) => {
  console.log('made it');
})

router.get('/listings', (req, res, next) => {
  console.log('made it to listings.');

  const min_price = req.query.min_price ? req.query.min_price : null;
  const max_price = req.query.max_price ? req.query.max_price : null;
  const min_bed = req.query.min_bed ? req.query.min_bed : null;
  const max_bed = req.query.max_bed ? req.query.max_bed : null;
  const min_bath = req.query.min_bath ? req.query.min_bath : null;
  const max_bath = req.query.max_bath ? req.query.max_bath : null;

  console.log('min_price: ', min_price);
  console.log('max_price: ', max_price);
  console.log('min_bed: ', min_bed);
  console.log('max_bed: ', max_bed);
  console.log('min_bath: ', min_bath);
  console.log('max_bath: ', max_bath);
  fs.readFile('./listing-details.csv', 'utf8', (err, data) => {
    if (err) {
      throw err;
    }

    content = data;
    let parsedData = d3.csvParse(content, (d, i) => {
      if(min_price && d.price < min_price){
        return null;
      }  else if(max_price && d.price > max_price){
        return null;
      }  else if(min_bed && min_bed > d.bedrooms){
        return null;
      }  else if(max_bed && max_bed < d.bedrooms){
        return null;
      }  else if(min_bed && d.bedrooms < min_bed){
        return null;
      }  else if(max_bath && d.bedrooms > max_bath){
        return null;
      } else {
        return {
          id: +d.id,
          street: +d.street,
          status: +d.status,
          price: +d.price,
          bedrooms: +d.bedrooms,
          bathrooms: +d.bathrooms,
          sq_ft: +d.sq_ft,
          lat: +d.lat,
          lng: +d.lng
        };
      }
    });

    res.json(parsedData);
  });
});

module.exports = router;
