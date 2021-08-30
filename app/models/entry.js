const mongoose = require('mongoose');

const entrySchema = mongoose.Schema({
	content: {type: String, required: true},
	userid: String,
	created: String
});

module.exports = mongoose.model('Entry', entrySchema);
