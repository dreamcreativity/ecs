var mongoose = require('mongoose');
mongoose.connect('mongodb://159.203.5.244:27017/ecs-demo');
//mongoose.connect('mongodb://159.203.5.244:27017/ecs');
module.exports = mongoose.connection;