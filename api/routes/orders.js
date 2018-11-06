const express = require('express');
const router = express.Router();

router.get('/',(req, res, next) => {
  res.status(200).json({
    message:'Oders are fetched'
  });
});

router.post('/', (req, res, next) => {
  res.status(201).json({
    message: 'Orders are created'
  });
});


router.get('/:orderID', (req, res, next) =>{
  res.status(200).json({
    message: 'Oders details .'
  //orderID: req.params.orderID
  });
});

router.delete('/:orderID',(req, res, next) =>{
  res.status(200).json({
    message: 'Oder is deleted..'
    //orderID: req.params.orderID
  });
});

module.exports = router;
