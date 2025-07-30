const http = require('http');

const checkHealth = (port, path = '/') => {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: port,
      path: path,
      method: 'GET',
      timeout: 2000
    };

    const req = http.request(options, (res) => {
      if (res.statusCode === 200) {
        resolve(`Service on port ${port} is healthy`);
      } else {
        reject(`Service on port ${port} returned status ${res.statusCode}`);
      }
    });

    req.on('error', (err) => {
      reject(`Service on port ${port} is not responding: ${err.message}`);
    });

    req.on('timeout', () => {
      reject(`Service on port ${port} timed out`);
      req.destroy();
    });

    req.end();
  });
};

Promise.all([
  checkHealth(3000), // Frontend
  checkHealth(3001, '/api/health') // Backend Health Check
])
  .then(results => {
    console.log('Health check passed:', results);
    process.exit(0);
  })
  .catch(error => {
    console.error('Health check failed:', error);
    process.exit(1);
  });
