const express = require('express');
const router = express.Router();

//Authentification
const { ensureAuthenticated } = require('../config/auth');

//Controllers
var coaches_controller = require('../controllers/coaches');

// Models
var User = require('../models/User');

// Get coaches_dashboard
router.get('/', coaches_controller.coaches_get);

// Get coaches_edit_info
router.get('/edit_info', coaches_controller.edit_info_get);

// Post coaches_edit_info
router.post('/edit_info', coaches_controller.edit_info_post);

// Get search_ipdps
router.get('/search_ipdps', coaches_controller.search_ipdps_get);

// Post search ipdps
//router.post('/search_ipdps', coaches_controller.search_ipdps_post);

module.exports = router;
