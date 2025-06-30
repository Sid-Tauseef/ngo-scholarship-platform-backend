module.exports = {
    port: process.env.PORT || 4000,
    mongoURI: process.env.MONGO_URI,
    jwtSecret: process.env.JWT_SECRET || 'change_me',
    roles: require('./roles.json'),
  };
  