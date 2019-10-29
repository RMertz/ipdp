const express = require('express');
const router = express.Router();

//Authentification
const { ensureAuthenticated } = require('../config/auth');

// Models
var User = require('../models/User');

// Welcome Page
router.get('/', (req, res) => res.render('login'));

// Dashboard
router.get('/dashboard/', ensureAuthenticated, (req, res) => 
				res.render('dashboard', {
							user: req.user
				}));

module.exports = router;
