const mongoose = require('mongoose');

var Schema = mongoose.Schema;

const UserSchema = new Schema({
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
	ipdp: [{
					type: Schema.Types.ObjectID, ref: 'IPDP',
					required: false
	}],
	team: {
					type: String,
					default: false
	},
});

//Virtual for Users full name
UserSchema
.virtual('full_name')
.get(function () {
				return this.family_name + ', ' + this.first_name;
});

UserSchema
.virtual('url')
.get(function () {
				return this._id;
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
