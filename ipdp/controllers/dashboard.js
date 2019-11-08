// Concurrency Control

var async = require('async');

// Sanitization
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Required Models
var User = require('../models/User');
var IPDP = require('../models/IPDP');


// Get dashboard
exports.dashboard_get = [

				// Render
				(req, res, next) => {

								res.render('dashboard', { user: req.user } );
				}
];

// Get edit info request
exports.edit_info_get = [

				// Render
				(req, res, next) => {

								res.render('edit_info', { user: req.user } );
				}
];

// Post edit info request
exports.edit_info_post = [
				
				// Render

				(req, res, next) => {
							// Test if valid input for first name
							if(typeof req.body.first_name==='undefined' || req.body.first_name ==='')
										req.body.first_name = req.user.first_name

							// Test if valid input for last name
							if(typeof req.body.last_name==='undefined' || req.body.last_name ==='')
										req.body.last_name = req.user.last_name

							// Test if valid input for email
							if(typeof req.body.email==='undefined' || req.body.email ==='')
										req.body.email = req.user.email
							else
										req.body.isCoach = false;
							



							User.findByIdAndUpdate(
    					// the id of the item to find
    					req.user.url,
    
    					// the change to be made. Mongoose will smartly combine your existing 
    					// document with this change, which allows for partial updates too
							req.body,
											
    
    					// an option that asks mongoose to return the updated version 
    					// of the document instead of the pre-updated one.
    					{new: true},
    
    					// the callback function
    					(err, user) => {
    					// Handle any possible database errors
        			if (err) return res.status(500).send(err);
        					return;
    					}
					)
								res.render('dashboard', { user: req.params.user });
				}
];

