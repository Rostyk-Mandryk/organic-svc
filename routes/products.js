const express = require('express');
const router = express.Router();
const initialProducts = require('../static/products.json');

router.get('/', function(req, res, next) {
  const products = initialProducts.filter(product => product.name && product.type && product.price && product.priceBeforeDiscount);
  const loadAll = req?.query?.loadAll;
  if (loadAll === 'true') {
    res.send(products);
  } else {
    const productsWithDiscount = products.filter((product) => {
      const {price, priceBeforeDiscount} = product;
      return Number(price) < Number(priceBeforeDiscount);
    });
    res.send(productsWithDiscount);
  }
});

module.exports = router;
