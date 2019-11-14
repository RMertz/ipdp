const mongoose = require('mongoose');

var Schema = mongoose.Schema;

const CommentSchema = new Schema({
	coach_name: {
					type: String,
					required: true
	},
	player_name: {
					type: String,
					required: true
	},
	comment: {
					type: String,
					required: true
	},
				
	season: {
					type: String,
					required: true
	},
	read: {
					type: Boolean,
					default: false
	},
});

CommentSchema
.virtual('url')
.get(function () {
				return this._id;
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
