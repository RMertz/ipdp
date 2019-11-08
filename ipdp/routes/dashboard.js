const express = require('express');
const router = express.Router();

//Authentification
const { ensureAuthenticated } = require('../config/auth');

//Controllers
var dashboard_controller = require('../controllers/dashboard');

// Models
var User = require('../models/User');

// Get coaches_dashboard
router.get('/', dashboard_controller.dashboard_get);

// Get edit info page 
router.get('/edit_info/', dashboard_controller.edit_info_get);

// Post edit info page 
router.post('/edit_info/', dashboard_controller.edit_info_post);

module.exports = router;
