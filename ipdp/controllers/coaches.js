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
																					errors.push({ msg: 'This player has not filled out an IPDP' });	
																					res.render('coaches', { errors });
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
exports.ipdp_comment_post = [
			//We want to attach the coaches comment, and the coaches id to an array of commments/ids
				//so that coaches cna view their comments with the players name etc.
			// Render
			(req, res, next) => {
						let errors = [];
						if(req.user.isCoach) {
									IPDP.findById(req.params.id, function (err, ipdp) {
												if(err) {
															errors.push(err);
															res.render('dashboard', { errors });
												}
												else {
															// Get info for new Comment
															comment =	new Comment({
																			coach_id: req.user.url,
																			player_id: ipdp.user_id,
																			player_name: ipdp.user_name, 
																			season: ipdp.season,
																			comment: req.body.coaches_feedback,
																			read: false
															});
															var coach = req.user;
															// Get Coaches Name
															coaches_name = coach.full_name;

															coach.comment.push(comment);
															coach.save();
															comment.save();
															coach.save;
															var coaches_comments = [];
															// render the page that displayes the searched up team the coach was viewing before
															User.findById( ipdp.user_id, function (err, player) {
																		if (err) {
																					errors.push({ msg: 'There are no players on that team, select a different team' });
																					res.render('search_teams', { errors });
																		}
																		else {
																					User.find({'team': player.team }, function (err, players) {
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
															});
												}
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
									User.findById(req.user._id).populate('comment').exec(function (err, coach) {
												if (err) {
															errors.push({ msg: 'Can\'t find coach. Please email this error to antonmertz@gmail.com so it may be resolved.' });
															res.render('dashboard', { errors });
												}
												else {
															res.render('coaches_comments', { coaches_comments: coach.comment });
												}
									});
						}
						else {
									errors.push({ msg: 'You are not a coach. If this is a mistake email antonmertz@gmail.com' });
									res.render('dashboard', { errors });
						}
			}
];

// coaches comments 
exports.coaches_comments_staged_get = [
			//We want to attach the coaches comment, and the coaches id to an array of commments/ids
				//so that coaches cna view their comments with the players name etc.
			// Render
			(req, res, next) => {
						let errors = [];
						if(req.user.isCoach) {
									User.findById(req.user._id).populate('comment').exec(function (err, coach) {
												if (err) {
															errors.push({ msg: 'Can\'t find coach. Please email this error to antonmertz@gmail.com so it may be resolved.' });
															res.render('dashboard', { errors });
												}
												else {
															coaches_com = []
															coach.comment.forEach(com => {
																		if (com.read) {
																					// Do nothing
																		}
																		else {
																					coaches_com.push(com);
																		}
															});
															res.render('coaches_comments_staged', { coaches_comments: coaches_com });
												}
									});
						}
						else {
									errors.push({ msg: 'You are not a coach. If this is a mistake email antonmertz@gmail.com' });
									res.render('dashboard', { errors });
						}
			}
];

// remove coaches comment from easy-grab
exports.remove_comment_get = [
			//We want to attach the coaches comment, and the coaches id to an array of commments/ids
				//so that coaches cna view their comments with the players name etc.
			// Render
			(req, res, next) => {
						let errors = [];
						coach = req.user;
						if(req.user.isCoach) {
						}
						else {
									errors.push({ msg: 'You are not a coach. If this is a mistake email antonmertz@gmail.com' });
									res.render('dashboard', { errors });
						}
			}
];
