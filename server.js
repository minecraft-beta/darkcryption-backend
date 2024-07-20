const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/log-ip', (req, res) => {
  const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const logMessage = `Client IP: ${clientIp} - Date: ${new Date().toISOString()}\n`;

  // Log the IP address to the console
  console.log(logMessage);

  // Append the IP address to a log file
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
