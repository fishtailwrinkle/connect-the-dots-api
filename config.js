'use strict';

exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/newtest';
exports.CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'https://jolly-einstein-d1f729.netlify.com';
exports.PORT = process.env.PORT || 8080;
