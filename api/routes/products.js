const express = require('express');

const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product');
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
const ProductControllers = require('../controllers/product');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,'./uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});
const fileFilter = (req, file, cb) =>{
  if(file.mimetype === 'image/jpeg' || file.mimetype ==='image/png' || file.mimetype ==='image/jpg'){
    cb(null, true);
  }else {
    cb(null,false);
  }
};
const upload = multer({
  storage: storage,
  limits:{
    filesize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

router.get('/', ProductControllers.get_all_products);

router.post('/',checkAuth,upload.single('productImage'), ProductControllers.create_products);


router.get('/:productID',ProductControllers.get_single_product);

router.patch('/:productID',checkAuth,ProductControllers.update_product);

router.delete('/:productID', checkAuth, ProductControllers.delete_product);


module.exports = router;
