var mongoose = require('mongoose');
//mongoose.connect('mongodb://dreamcwc:Asdf_1234@ds031571.mongolab.com:31571/ecs');
//mongoose.connect('mongodb://159.203.5.244:27017/ecs-demo');

mongoose.connect('mongodb://159.203.5.244:27017/ecs');
module.exports = mongoose.connection;