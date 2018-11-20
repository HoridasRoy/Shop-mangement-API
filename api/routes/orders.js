const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const OrdersControllers = require('../controllers/orders');


router.get('/',checkAuth, OrdersControllers.get_all_orders);

router.post('/',checkAuth, OrdersControllers.create_order);


router.get('/:orderID', checkAuth, OrdersControllers.order_get_ID);

router.delete('/:orderID',checkAuth, OrdersControllers.delete_order);

module.exports = router;
