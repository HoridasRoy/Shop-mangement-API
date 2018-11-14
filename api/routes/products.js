const express = require('express');

const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product');

router.get('/',(req,res, next) =>{
  Product.find()
  .exec()
  .then(docs =>{
    console.log(docs);
    res.status(200).json(docs);
  })
  .catch(err =>{
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
});

router.post('/',(req, res, next) =>{
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
  });

    product.save().then(result =>{
    console.log(result);
    res.status(201).json({
    message: 'Handling POST request..',
    createdProduct: result
  });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });

});


router.get('/:productID',(req, res, next) =>{
  const id = req.params.productID;
  Product.findById(id)
  .exec()
  .then(doc =>{
    console.log("From database",doc);
    if(doc){
      res.status(200).json(doc);
    }else {
      res.status(404).json({
        message:"No data found for the Id"
      });
    }

  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
});

router.patch('/:productID',(req, res, next) => {
  const id = req.params.productID;
  const updateOps = {};
  for(const ops of req.body){
    updateOps[ops.proName] = ops.value;
  }
  Product.update({_id: id}, {$set : updateOps})
  .exec()
  .then(result =>{
    console.log(result);
    res.status(200).json(result);
  })
  .catch(err =>{
    res.status(500).json({
      error: err
    });
  });
});

router.delete('/:productID', (req, res, next) => {
  const id = req.params.productID;
  Product.remove({_id: id})
  .exec()
  .then(result =>{
    console.log(result);
    res.status(200).json(result);
  })
  .catch(err =>{
    res.status(500).json({
      error: err
    });
  });
});


module.exports = router;
