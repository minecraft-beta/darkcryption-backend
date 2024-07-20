const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.json());

// Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.post('/log-ip', (req, res) => {
  const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const logMessage = `Client IP: ${clientIp} - Date: ${new Date().toISOString()}\n`;

  console.log(logMessage);

  fs.appendFile('server.log', logMessage, (err) => {
    if (err) {
      console.error('Error writing to log file:', err);
      res.status(500).send('Error logging IP address');
      return;
    }
    res.status(200).send('IP address logged');
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
