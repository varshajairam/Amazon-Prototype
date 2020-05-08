const NodeCache = require('node-cache');
const producer = require('./producer');
const consumer = require('./consumer');

const resQueue = new NodeCache();

consumer.initialize(resQueue);

module.exports = {
  sendMessage: (...args) => producer.sendMessage(...args, resQueue),
};
