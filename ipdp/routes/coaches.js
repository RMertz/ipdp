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

// Get confirm_coach
router.post('/confirm_coach', coaches_controller.confirm_coach_post);

// Get coaches_edit_info
router.get('/edit_info', coaches_controller.edit_info_get);

// Post coaches_edit_info
router.post('/edit_info', coaches_controller.edit_info_post);

// Get search teams
router.get('/search_teams', coaches_controller.search_teams_get);

// Post search teams 
router.post('/search_teams', coaches_controller.search_teams_post);

// Get search players
router.get('/search_players', coaches_controller.search_players_get);

// Get search players
router.get('/player/:id', coaches_controller.player_get);

// Get player ipdp
router.get('/player/ipdp/:id', coaches_controller.ipdp_get);

// Post player ipdp
router.post('/player/ipdp/:id', coaches_controller.ipdp_post);

// Get Coaches Comments 
router.get('/coaches_comments/', coaches_controller.coaches_comments_get);

module.exports = router;
