const Product = require('../models/product');
const mongoose = require('mongoose');

exports.get_all_products = (req,res, next) =>{
  Product.find()
  .select("name price _id productImage")
  .exec()
  .then(docs =>{
    const response ={
      count: docs.length,
      product: docs.map(doc =>{
        return{
          name: doc.name,
          price: doc.price,
          _id: doc._id,
          productImage: doc.productImage,
          request:{
            type: 'GET',
            url:'http://localhost:3000/products/' + doc._id
          }
        }
      })
    };
    res.status(200).json(response);
  })
  .catch(err =>{
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
}

exports.create_products = (req, res, next) =>{
  console.log(req.file);
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    productImage: req.file.path
  });

    product.save()
    .then(result =>{
    res.status(201).json({
    message: 'product created sucessfully',
    createdProduct: {
        name: result.name,
        price: result.price,
        _id: result._id,
        productImage: result.productImage,
        request:{
          type:'GET',
          url: 'http://localhost:3000/products/' + result._id
        }
      }
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });

}

exports.get_single_product = (req, res, next) =>{
  const id = req.params.productID;
  Product.findById(id)
  .select("name price _id productImage")
  .exec()
  .then(doc =>{
    console.log("From database",doc);
    if(doc){
      res.status(200).json({
        product: doc,
        request:{
          type:'GET',
          url: 'http://localhost:3000/products'
        }
      });
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
}

exports.update_product = (req, res, next) => {
  const id = req.params.productID;
  const updateOps = {};
  for(const ops of req.body){
    updateOps[ops.proName] = ops.value;
  }
  Product.update({_id: id}, {$set : updateOps})
  .exec()
  .then(result =>{
    res.status(200).json({
      message:'product updated',
      request:{
        type: 'GET',
        url: 'http://localhost:3000/products/' + id
      }
    });
  })
  .catch(err =>{
    res.status(500).json({
      error: err
    });
  });
}

exports.delete_product = (req, res, next) => {
  const id = req.params.productID;
  Product.remove({_id: id})
  .exec()
  .then(result =>{
    res.status(200).json({
      message:'product delected',
      request:{
        type:'POST',
        url:'http://localhost:3000/products/',
        body: {name: 'String', price: 'Number'}
      }
    });
  })
  .catch(err =>{
    res.status(500).json({
      error: err
    });
  });
}
