// Concurrency Control

var async = require('async');

// Sanitization
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Required Models
var User = require('../models/User');
var IPDP = require('../models/IPDP');
var Comment = require('../models/Comment');




// Get coaches dashboard request
exports.coaches_get = [
					
			// Render
			(req, res, next) => {
						if(req.user.isCoach) {
									res.render('coaches');
						}
						else {
									res.render('confirm_coach');
						}
			}
];


// Get edit info request
exports.edit_info_get = [

			// Render
			(req, res, next) => {
						let errors = [];
						if(req.user.isCoach) {
									res.render('edit_info_coaches', { user: req.user } );
						}
						else {
									errors.push({ msg: 'You are not a coach. If this is a mistake email antonmertz@gmail.com' });	
									res.render('dashboard', { errors });
						}
			}
];



// Post confirm coach 
exports.confirm_coach_post = [

				// Render
				(req, res, next) => {
							// Test if coaches passcode is valid
							if(req.body.isCoach==='passcode'){
										req.body.isCoach = true;
										User.findByIdAndUpdate(
    											// the id of the item to find
    											req.user.url,
													req.body,
    											{new: true},
    											// the callback function
    											(err, user) => {
    														// Handle any possible database errors
        												if (err) return res.status(500).send(err);
        												return;
    											}
										)
										res.render('coaches', { user: req.params.user });
							}
							else {
										errors.push({ msg: 'You are not a coach. If this is a mistake email antonmertz@gmail.com' });	
										res.render('dashboard', { errors });
							}
				}
];

// Post edit info request
exports.edit_info_post = [
				
			// Render
			(req, res, next) => {
						// Test if valid input for first name
						if(typeof req.body.first_name==='undefined' || req.body.first_name ==='') {
									req.body.first_name = req.user.first_name;
						}
						// Test if valid input for last name
						if(typeof req.body.last_name==='undefined' || req.body.last_name ==='') {
									req.body.last_name = req.user.last_name;
						}
						// Test if valid input for email
						if(typeof req.body.email==='undefined' || req.body.email ==='') {
									req.body.email = req.user.email;
						}
						User.findByIdAndUpdate(
    							// the id of the item to find
    							req.user.url,
									req.body,
    							{new: true},
    							// the callback function
    							(err, user) => {
    										// Handle any possible database errors
        								if (err) return res.status(500).send(err);
        								return;
    							}
						)
						res.render('coaches', { user: req.params.user });
			}
];

// Get search ipdps request
exports.search_teams_get = [
					
			// Render
			(req, res, next) => {
						let errors = [];
						if(req.user.isCoach) {
									res.render('search_teams');	
						}
						else {
									errors.push({ msg: 'You are not a coach. If this is a mistake email antonmertz@gmail.com' });	
									res.render('dashboard', { errors });
						}
			}
];

// Post search teams request
exports.search_teams_post = [
				
			// Render
			(req, res, next) => {
						let errors = [];
						User.find({'team': req.body.team }, function (err, players) {
									if (err) {
												errors.push({ msg: 'There are no players on that team, select a different team' });
												res.render('search_teams', { errors });
									}
									else if (players && players.length > 0) {
												res.render('search_players', { players });
									}
									else {
												errors.push({ msg: 'There are no players on that team, select a different team' });
												res.render('search_teams', {errors });
									}
						});
			}
];

// Get search players request
exports.search_players_get = [
					
			// Render
			(req, res, next) => {
							let errors = [];
							if(req.user.isCoach) {
										res.render('search_players');
							}
							else {
										errors.push({ msg: 'You are not a coach. If this is a mistake email antonmertz@gmail.com' });	
										res.render('dashboard', { errors });
							}
				}
];

// Get individual player request
exports.player_get = [

			// Render
			(req, res, next) => {
						let errors = [];
						if(req.user.isCoach){
									User.findById(req.params.id, function (err, player) {
												if(err) {
															errors.push(err);
															res.render('dashboard', { err });
												}
												else {
															IPDP.find({"user_id": player.url }, function (err, ipdps) {
																		if (err) {
																					errors.push(err);
																					res.render('search_players', { errors });
																		}
																		else if (ipdps && ipdps.length > 0) {
																					res.render('player', { player, ipdps });
																		}
																		else {
																					res.render('player', { player });
																		}
															});
									
												};
									});
						}
						else {
									errors.push({ msg: 'You are not a coach. If this is a mistake email antonmertz@gmail.com' });
									res.render('dashboard', { errors });
						}
			}
];


// Get individual ipdp request 
exports.ipdp_get = [

			// Render
			(req, res, next) => {
						let errors = [];
						coach = req.user;
						if(req.user.isCoach){
									IPDP.findById(req.params.id, function (err, ipdp) {
												if(err) {
															errors.push(err);
															res.render('player', { err });
												}
												else {
															res.render('player_ipdp', { coach, ipdp });
												};
									});
						}
						else {
									errors.push({ msg: 'You are not a coach. If this is a mistake email antonmertz@gmail.com' });
									res.render('dashboard', { errors });
						}
			}
];


// Post individual ipdp with coaches comments 
exports.ipdp_post = [
			//We want to attach the coaches comment, and the coaches id to an array of commments/ids
				//so that coaches cna view their comments with the players name etc.
			// Render
			(req, res, next) => {
						let errors = [];
						if(req.user.isCoach) {
									//get coach and player
									//
									coach_name = req.user.full_name;
									IPDP.findById(req.params.id, function (err, ipdp) {
												if(err) {
															errors.push(err);
															res.render('player_ipdp', { err });
												}
												else {
															//get ipdp.season
															season = ipdp.season;
															User.findById(ipdp.user_id, function (err, player) {
																		if(err) {
																					errors.push(err);
																					res.render('player_ipdp', { err });
																		}
																		else {
																					var comment = new Comment({
																								player_name: player.full_name,
																								coach_name: coach_name,
																								season: season,
																								read: false,
																								comment: req.body.coaches_feedback
																					});
																					//update coach.comments
																					coach.comment.push(comment);
																					coach.save();
																					//
																					//get player.comments
																					player.comment.push(comment);
																					player.save();
																					//
																					res.render('coaches_comments', { comment });
																					//res.render('coaches_comments', { comments: coach.comment });
																		};
															});
												};
									});
						}
						else {
									errors.push({ msg: 'You are not a coach. If this is a mistake email antonmertz@gmail.com' });
									res.render('dashboard', { errors });
						}
			}
];

// coaches comments 
exports.coaches_comments_get = [
			//We want to attach the coaches comment, and the coaches id to an array of commments/ids
				//so that coaches cna view their comments with the players name etc.
			// Render
			(req, res, next) => {
						let errors = [];
						if(req.user.isCoach) {
									//res.render('coaches_ipdps', { req.user.comments });
									res.render('coaches_comments');
						}
						else {
									errors.push({ msg: 'You are not a coach. If this is a mistake email antonmertz@gmail.com' });
									res.render('dashboard', { errors });
						}
			}
];
