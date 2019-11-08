// Concurrency Control

var async = require('async');

// Sanitization
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Required Models
var User = require('../models/User');
var IPDP = require('../models/IPDP');

// Get take ipdp request
exports.ipdp_page_1_get = [

			// Render
			(req, res, next) => {
						res.render('take_ipdp');
			}
];

// Post ipdp1_create request
exports.ipdp_page_1_post = [
				
			// Render
			(req, res, next) => {
						//Create valid IPDP	
						var ipdp = new IPDP({
									season: req.body.season,
									nickname: req.body.nickname,
									non_soccer_facts: req.body.non_soccer_facts,
									living_in_montana: req.body.living_in_montana,
									live_anywhere_in: req.body.live_anywhere_in,
						});
						var user = req.user;
						user.ipdp.push(ipdp);
						user.save();
						ipdp.save(res.render('ipdp_page_2', { id: ipdp.url }));
			}
];

// Get take ipdp page 2 request
exports.ipdp_page_2_get = [

			// Render
			(req, res, next) => {
						res.render('ipdp_page_2', {id: req.body.id})
			}
];

// Post page 2 ipdp
exports.ipdp_page_2_post = [

			// Convert favorite positions to an array
			(req, res, next) => {
						if(!(req.body.favorite_position instanceof Array)) {
									if(typeof req.body.favorite_position==='undefined') {
												req.body.favorite_position=[];
									}
									else {
												req.body.favorite_position=new Array(req.body.favorite_position);
									}
						}
						next();
			},
			// Convert best positino to an array
			(req, res, next) => {
						if(!(req.body.best_position instanceof Array)) {
									if(typeof req.body.best_position==='undefined') {
												req.body.best_position=[];
									}
									else {
												req.body.best_position=new Array(req.body.best_position);
									}
						}
						next();
			},
			// Render
			(req, res, next) => {
						IPDP.findByIdAndUpdate(
    							// the id of the item to find
    							req.params.id,
    							req.body,
    							{new: true},
    							// the callback function
    							(err, ipdp) => {
    										// Handle any possible database errors
        								if (err) return res.status(500).send(err);
        								return;
    							}
						)
						res.render('ipdp_page_3', { id: req.params.id });
			}
];

// Get page 3 ipdp
exports.ipdp_page_3_get = [

			// Render
			(req, res, next) => {
						res.render('ipdp_page_3', { id: req.params.id });
			}
];

// Post request page 3 ipdp
exports.ipdp_page_3_post = [

			// Render
			(req, res, next) => {
						IPDP.findByIdAndUpdate(
    							// the id of the item to find
    							req.params.id,
    							req.body,
    							{new: true},
    							// the callback function
    							(err, ipdp) => {
    										// Handle any possible database errors
        								if (err) return res.status(500).send(err);
        								return;
    							}
						)
						res.render('ipdp_page_4', { id: req.params.id });
			}
];

// Get page 4 ipdp
exports.ipdp_page_4_get = [

			// Render
			(req, res, next) => {
						res.render('ipdp_page_4', { id: req.params.id });
			}
];

// Post page 4 ipdp
exports.ipdp_page_4_post = [

			// Render
			(req, res, next) => {
						IPDP.findByIdAndUpdate(
    							// the id of the item to find
    							req.params.id,
    							req.body,
    							{new: true},
    							// the callback function
    							(err, ipdp) => {
    										// Handle any possible database errors
        								if (err) return res.status(500).send(err);
        								return;
    							}
						)
						res.render('ipdp_page_5', { id: req.params.id });
			}
];

// Get page 5 ipdp
exports.ipdp_page_5_get = [

			// Render
			(req, res, next) => {
						res.render('ipdp_page_5', { id: req.params.id });
			}
];


// Post page 5 ipdp
exports.ipdp_page_5_post = [

			// Render
			(req, res, next) => {
						IPDP.findByIdAndUpdate(
    							// the id of the item to find
    							req.params.id,
    							req.body,
    							{new: true},
    							// the callback function
    							(err, ipdp) => {
    										// Handle any possible database errors
        								if (err) return res.status(500).send(err);
        								return;
    							}
						)
						res.render('ipdp_page_6', { id: req.params.id });
			}
];

// Get page 6 ipdp
exports.ipdp_page_6_get = [

			// Render
			(req, res, next) => {
						res.render('ipdp_page_6', { id: req.params.id });
			}
];


// Post page 6 ipdp
exports.ipdp_page_6_post = [

			// Render
			(req, res, next) => {
						IPDP.findByIdAndUpdate(
    							// the id of the item to find
    							req.params.id,
    							req.body,
    							{new: true},
    							// the callback function
    							(err, ipdp) => {
    										// Handle any possible database errors
        								if (err) return res.status(500).send(err);
        								return;
    							}
						)
						res.render('ipdp_page_7', { id: req.params.id });
			}
];

// Get page 7 ipdp
exports.ipdp_page_7_get = [

			// Render
			(req, res, next) => {
						res.render('ipdp_page_7', { id: req.params.id });
			}
];

// Post page 7 ipdp
exports.ipdp_page_7_post = [

			// Render
			(req, res, next) => {
						IPDP.findByIdAndUpdate(
    							// the id of the item to find
    							req.params.id,
    							req.body,
    							{new: true},
    							// the callback function
    							(err, ipdp) => {
    										// Handle any possible database errors
        								if (err) return res.status(500).send(err);
        								return;
    							}
						)
						res.render('ipdp_page_8', { id: req.params.id });
			}
];

// Get page 8 ipdp
exports.ipdp_page_8_get = [

			// Render
			(req, res, next) => {
						res.render('ipdp_page_8', { id: req.params.id });
			}
];

// Post page 8 ipdp
exports.ipdp_page_8_post = [

			// Render
			(req, res, next) => {
						IPDP.findByIdAndUpdate(
    							// the id of the item to find
    							req.params.id,
    							req.body,
    							{new: true},
    							// the callback function
    							(err, ipdp) => {
    										// Handle any possible database errors
        								if (err) return res.status(500).send(err);
        								return;
    							}
						)
						res.render('ipdp_page_9', { id: req.params.id });
			}
];

// Get page 9 ipdp
exports.ipdp_page_9_get = [

			// Render
			(req, res, next) => {
						res.render('ipdp_page_9', { id: req.params.id });
			}
];

// Post page 9 ipdp
exports.ipdp_page_9_post = [

			// Render
			(req, res, next) => {
						IPDP.findByIdAndUpdate(
									// the id of the item to find
									req.params.id,
									req.body,
									{new: true},
									// the callback function
									(err, ipdp) => {
												// Handle any possible database errors
												if (err) return res.status(500).send(err);
												return;
									}
						)
						res.render('ipdp_page_10', { id: req.params.id });
			}
];

// Get page 10 ipdp
exports.ipdp_page_10_get = [

			// Render
			(req, res, next) => {
						res.render('ipdp_page_10', { id: req.params.id });
			}
];


// Post page 10 ipdp
exports.ipdp_page_10_post = [

			// Render
			(req, res, next) => {
						IPDP.findByIdAndUpdate(
									// the id of the item to find
									req.params.id,
									req.body,
									{new: true},
									// the callback function
									(err, ipdp) => {
												// Handle any possible database errors
												if (err) return res.status(500).send(err);
												return;
									}
						)
						res.render('ipdp_page_11', { id: req.params.id });
			}
];

// Get page 11 ipdp
exports.ipdp_page_11_get = [

			// Render
			(req, res, next) => {
						res.render('ipdp_page_11', { id: req.params.id });
			}
];


// Post page 11 ipdp
exports.ipdp_page_11_post = [

			// Render
			(req, res, next) => {
						IPDP.findByIdAndUpdate(
									// the id of the item to find
									req.params.id,
									req.body,
									{new: true},
									// the callback function
									(err, ipdp) => {
												// Handle any possible database errors
												if (err) return res.status(500).send(err);
												return;
									}
						)
						res.render('ipdp_page_12', { id: req.params.id });
			}
];

// Get page 12 ipdp
exports.ipdp_page_12_get = [

			// Render
			(req, res, next) => {
						res.render('ipdp_page_12', { id: req.params.id });
			}
];

// Post page 12 ipdp
exports.ipdp_page_12_post = [

			// Render
			(req, res, next) => {
						IPDP.findByIdAndUpdate(
									// the id of the item to find
									req.params.id,
									req.body,
									{new: true},
									// the callback function
									(err, ipdp) => {
												// Handle any possible database errors
												if (err) return res.status(500).send(err);
												return;
									}
						)
						res.render('ipdp_page_13', { id: req.params.id });
			}
];

// Get page 13 ipdp
exports.ipdp_page_13_get = [

			// Render
			(req, res, next) => {
						res.render('ipdp_page_13', { id: req.params.id });
			}
];

// Post page 13 ipdp
exports.ipdp_page_13_post = [

			// Render
			(req, res, next) => {
						IPDP.findByIdAndUpdate(
									// the id of the item to find
									req.params.id,
									req.body,
									{new: true},
									// the callback function
									(err, ipdp) => {
												// Handle any possible database errors
												if (err) return res.status(500).send(err);
												return;
									}
						)
						res.render('thank_you');
			}
];

// Get thank you page
exports.thank_you_get = [

			// Render
			(req, res, next) => {
						res.render('thank_you');
			}
];

