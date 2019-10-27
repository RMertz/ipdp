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
	}]

});

//Virtual for Users full name
UserSchema
.virtual('full_name')
.get(function () {
				return this.family_name + ', ' + this.first_name;
});


const User = mongoose.model('User', UserSchema);

module.exports = User;
