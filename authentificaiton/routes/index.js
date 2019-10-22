const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

// Welcome Page
router.get('/', (req, res) => res.render('login'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => 
				res.render('dashboard', {
							name: req.user.first_name
				}));


// Get edit info page 
router.get('/dashboard/edit_info', (req, res) => {
				res.render('edit_info')

});

// Get take IPDP page
router.get('/dashboard/take_ipdp', (req, res) => {
				res.render('take_ipdp')
});


module.exports = router;
