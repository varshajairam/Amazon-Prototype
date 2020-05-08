// eslint-disable-next-line
const kafka = require('node-rdkafka');

const authHandler = require('./handlers/auth');
const analyticsHandler = require('./handlers/analytics');
const profileHandler = require('./handlers/profile');
const operationsHandler = require('./handlers/operations');
const cartHandler = require('./handlers/cart');
const productHandler = require('./handlers/product');

function createConsumer(topic, handler) {
  const consumer = new kafka.KafkaConsumer({
    'bootstrap.servers': process.env.BOOTSTRAP_SERVERS,
    'sasl.username': process.env.SASL_USERNAME,
    'sasl.password': process.env.SASL_PASSWORD,
    'security.protocol': process.env.SECURITY_PROTOCOL,
    'sasl.mechanisms': process.env.SASL_MECHANISMS,
    'group.id': topic,
  }, {
    'auto.offset.reset': 'earliest',
  });
  consumer.on('ready', () => {
    consumer.subscribe([topic]);
    consumer.consume();
  }).on('data', handler);
  consumer.connect();
}

function initialize(resQueue) {
  createConsumer('auth', authHandler.bind(null, resQueue));
  createConsumer('analytics', analyticsHandler.bind(null, resQueue));
  createConsumer('profile', profileHandler.bind(null, resQueue));
  createConsumer('operations', operationsHandler.bind(null, resQueue));
  createConsumer('cart', cartHandler.bind(null, resQueue));
  createConsumer('product', productHandler.bind(null, resQueue));
}

module.exports = { initialize };
