// eslint-disable-next-line
const kafka = require('node-rdkafka');
const { v1: uuidv1 } = require('uuid');

function getProducer() {
  return new Promise((resolve) => {
    const producer = new kafka.Producer({
      'bootstrap.servers': process.env.BOOTSTRAP_SERVERS,
      'sasl.username': process.env.SASL_USERNAME,
      'sasl.password': process.env.SASL_PASSWORD,
      'security.protocol': 'SASL_SSL',
      'sasl.mechanisms': process.env.SASL_MECHANISMS,
      dr_msg_cb: true,
    });
    producer.on('ready', () => {
      resolve(producer);
    });
    producer.connect();
  });
}

function sendMessage(topic, message, callbackArgs, resQueue) {
	console.log("in send messafe kafka entry"); 
  getProducer().then((producer) => {

    const correlationId = uuidv1().toString();
	const messageBuffer = Buffer.from(JSON.stringify(message));
	console.log("in send messafe kafka");
    resQueue.set(correlationId, () => callbackArgs, 120);
    producer.produce(topic, -1, messageBuffer, correlationId);
    producer.flush(10000, () => {
      producer.disconnect();
    });
  });
}

module.exports = { sendMessage };
