const express = require('express');
const router = express.Router();

//Authentification
const { ensureAuthenticated } = require('../config/auth');

//Controllers
var questionaire_controller = require('../controllers/questionaire');
var coaches_controller = require('../controllers/coaches');

// Models
var User = require('../models/User');

// Get coaches_dashboard
router.get('/coaches/', questionaire_controller.coaches_get);

// Get edit info page 
router.get('/edit_info/', questionaire_controller.edit_info_get);

// Post edit info page 
router.post('/edit_info/', questionaire_controller.edit_info_post);

// Get take IPDP page1
router.get('/take_ipdp', questionaire_controller.ipdp_page_1_get); 

// Post take ipdp page1
router.post('/take_ipdp', questionaire_controller.ipdp_page_1_post);

// Get ipdp page 2
router.get('/ipdp_page_2/:id', questionaire_controller.ipdp_page_2_get); 

// Post ipdp page 2
router.post('/ipdp_page_2/:id', questionaire_controller.ipdp_page_2_post);

// Get ipdp page 3
router.get('/ipdp_page_3/:id', questionaire_controller.ipdp_page_3_get);

// Post ipdp page 3
router.post('/ipdp_page_3/:id', questionaire_controller.ipdp_page_3_post);

// Get ipdp page 4 
router.get('/ipdp_page_4/:id', questionaire_controller.ipdp_page_4_get);

// Post ipdp page 4 
router.post('/ipdp_page_4/:id', questionaire_controller.ipdp_page_4_post);

// Get ipdp page 5 
router.get('/ipdp_page_5/:id', questionaire_controller.ipdp_page_5_get);

// Post ipdp page 5 
router.post('/ipdp_page_5/:id', questionaire_controller.ipdp_page_5_post);

// Get ipdp page 6 
router.get('/ipdp_page_6/:id', questionaire_controller.ipdp_page_6_get);

// Post ipdp page 6 
router.post('/ipdp_page_6/:id', questionaire_controller.ipdp_page_6_post);

// Get ipdp page 7 
router.get('/ipdp_page_7/:id', questionaire_controller.ipdp_page_7_get);

// Post ipdp page 7 
router.post('/ipdp_page_7/:id', questionaire_controller.ipdp_page_7_post);

// Get ipdp page 8
router.get('/ipdp_page_8/:id', questionaire_controller.ipdp_page_8_get);

// Post ipdp page 8 
router.post('/ipdp_page_8/:id', questionaire_controller.ipdp_page_8_post);

// Get ipdp page 9 
router.get('/ipdp_page_9/:id', questionaire_controller.ipdp_page_9_get);

// Post ipdp page 9 
router.post('/ipdp_page_9/:id', questionaire_controller.ipdp_page_9_post);

// Get ipdp page 10 
router.get('/ipdp_page_10/:id', questionaire_controller.ipdp_page_10_get);

// Post ipdp page 10 
router.post('/ipdp_page_10/:id', questionaire_controller.ipdp_page_10_post);

// Get ipdp page 11 
router.get('/ipdp_page_11/:id', questionaire_controller.ipdp_page_11_get);

// Post ipdp page 11 
router.post('/ipdp_page_11/:id', questionaire_controller.ipdp_page_11_post);

// Get ipdp page 12 
router.get('/ipdp_page_12/:id', questionaire_controller.ipdp_page_12_get);

// Post ipdp page 12 
router.post('/ipdp_page_12/:id', questionaire_controller.ipdp_page_12_post);

// Get ipdp page 13 
router.get('/ipdp_page_13/:id', questionaire_controller.ipdp_page_13_get);

// Post ipdp page 13 
router.post('/ipdp_page_13/:id', questionaire_controller.ipdp_page_13_post);

// Get thank you page 
router.get('/thank_you/', questionaire_controller.thank_you_get);

module.exports = router;
