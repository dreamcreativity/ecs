var mongoose = require('mongoose');
mongoose.connect('mongodb://dreamcwc:Asdf_1234@ds031571.mongolab.com:31571/ecs');
module.exports = mongoose.connection;