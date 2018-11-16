const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

Order = require('../models/order');
Product = require('../models/product');

router.get('/',(req, res, next) => {
  Order.find()
  .select('product quantity _id')
  .exec()
  .then(docs =>{
    const response ={
      count: docs.length,
      orders: docs.map(doc =>{
        return{
          id: doc._id,
          product: doc.product,
          quantity: doc.quantity,
          request:{
            type:'GET',
            url:'http://localhost:3000/orders/' +doc._id
          }
        }
      })
    };
    res.status(200).json(response);
  })
  .catch(err =>{
    res.status(500).json({
      error: err
    });
  });
});

router.post('/', (req, res, next) => {
  Product.findById(req.body.productID)
  .then(product =>{
    if(!product){
      return res.status(404).json({
        message: 'product not found'
      });
    }
    const order = new Order({
      _id: mongoose.Types.ObjectId(),
      quantity: req.body.quantity,
      product: req.body.productID
    });
    return  order
    .save()

    })
    .then(result => {
      console.log(result);
      res.status(201).json({
        message:'order stored',
        createdOrder:{
          _id: result.id,
          product: result.product,
          quantity: result.quantity
        },
        request:{
          type: 'GET',
          url:'http://localhost:3000/orders/' + result._id
        }
      });
    })
    .catch(err =>{
      res.status(500).json({
        error: err
      });
    });
});


router.get('/:orderID', (req, res, next) =>{
  Order.findById(req.params.orderID)
  .exec()
  .then(docs =>{
    if (!docs) {
      return res.status(404).json({
        message:'order not found'
      });
    }
    res.status(200).json({
      order: docs,
      request:{
        type: 'GET',
        url: 'http://localhost:3000/orders'
      }
    });
  })
  .catch(err =>{
    res.status(500).json({
      error: err
    });
  });
});

router.delete('/:orderID',(req, res, next) =>{
  Order.remove({_id: req.params.orderID})
  .exec()
  .then(order =>{

    res.status(200).json({
      message:'order deleted',
      request:{
        type: 'POST',
        url: 'http://localhost:3000/orders',
        body:{productID: 'ID', quantity:'Number'}
      }
    });
  })
  .catch(err =>{
    res.status(500).json({
      error: err
    });
  });
});

module.exports = router;
