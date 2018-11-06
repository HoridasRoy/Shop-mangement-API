const express = require('express');

const router = express.Router();

router.get('/',(req,res, next) =>{
  res.status(200).json({
    message: 'Handling GET request ..'
  });
});

router.post('/',(req, res, next) =>{
  res.status(201).json({
    message: 'Handling POST request..'
  });
});

router.get('/:productID',(req, res, next) =>{
  const id = req.params.productID;
  if(id ==='special'){
    res.status(200).json({
      message: 'you passed special ID'
      //id: id
    });
  }else {
    res.status(200).json({
      message: 'you passed an ID'
    });
  }
});

router.patch('/:productID',(req, res, next) => {
  res.status(200).json({
    message:'Updated product'
  });
});

router.delete('/:productID', (req, res, next) => {
  res.status(200).json({
    message: 'Deleted product'
  });
});


module.exports = router;
