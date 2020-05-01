// eslint-disable-next-line
const kafka = require('node-rdkafka');

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
  createConsumer('product', productHandler.bind(null, resQueue));
}

module.exports = { initialize };
