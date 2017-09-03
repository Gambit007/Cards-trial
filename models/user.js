var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema({
	email: String,
	password: String,
	phone: String,
	is_active: {
		type: Number,
		required: true,
		default: 0
	},
	created_at: {
		type: Date,
		required: true,
		default: Date.now
	}

}, {
	strict: false
});

module.exports = mongoose.model('tbl_users', userSchema);