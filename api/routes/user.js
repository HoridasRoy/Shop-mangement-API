const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require("../models/user");
const UserControllers = require('../controllers/user');
const checkAuth = require('../middleware/check-auth');

router.post('/signup', UserControllers.user_signup);

router.post('/login', UserControllers.user_login);

router.delete('/:userId',checkAuth, UserControllers.delete_user);


module.exports = router;
