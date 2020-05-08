const redis = require('redis');

const client = redis.createClient({
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST,
// password  : 'your password',
}
);

client.on('connect', (err) => {
  if (err) {
    console.log('Error occurred while connecting to Redis');
  } else {
    console.log('Connected to Redis Client');
  }
});

module.exports = client;