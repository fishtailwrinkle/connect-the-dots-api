'use strict';

exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/newtest';
//exports.CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || '';
exports.CLIENT_ORIGIN = 'http://localhost:3006';
exports.PORT = process.env.PORT || 8080;
