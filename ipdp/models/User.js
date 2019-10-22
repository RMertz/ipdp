const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	first_name: {
					type: String,
					required: true
	},
	last_name: {
					type: String,
					required: true
	},
	email: {
					type: String,
					required: true
	},
				
	password: {
					type: String,
					required: true
	},

	date: {
					type: Date,
					default: Date.now 
	},
	isCoach: {
					type: Boolean,
					default: false
	},
});

//Virtual for Users full name
UserSchema
.virtual('full_name')
.get(function () {
				return this.family_name + ', ' + this.first_name;
});


const User = mongoose.model('User', UserSchema);

module.exports = User;
