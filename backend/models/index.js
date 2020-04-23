const mysqlModels = require('./mysql');
const mongoModels = require('./mongo');

module.exports = { ...mysqlModels, ...mongoModels };
