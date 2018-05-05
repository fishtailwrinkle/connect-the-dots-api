'use strict';

exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/connectTheDots-app';
exports.CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || '';
exports.PORT = process.env.PORT || 8080;
