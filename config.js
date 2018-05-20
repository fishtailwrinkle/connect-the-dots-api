'use strict';

//exports.DATABASE_URL = process.env.DATABASE_URL || mongodb://<dbuser>:<dbpassword>@ds129670.mlab.com:29670/connectthedots;
exports.DATABASE_URL = 'mongodb://user:password@ds129670.mlab.com:29670/connectthedots';
exports.CLIENT_ORIGIN = 'https://connect-the-dots.netlify.com';
exports.PORT = process.env.PORT || 8080;
