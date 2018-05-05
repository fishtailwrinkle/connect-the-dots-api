'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const connectTheDotsSchema = mongoose.Schema({
	accessCode: {type: String, required: true},
	vocab: {type: String, required: true},	
	pixels: {type: String}
});

connectTheDotsSchema.methods.serialize = function() {
	return {
		id: this._id,
		accessCode: this.accessCode,
		vocab: this.vocab,
		pixels: this.pixels
	};	
};

const ConnectTheDots = mongoose.model('ConnectTheDots', connectTheDotsSchema);

module.exports = {ConnectTheDots};