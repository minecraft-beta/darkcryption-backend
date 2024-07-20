const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1261432791824990230/STXNnMXn9KzAgsjZ5J7kE4Dr0gIaUD-dJbOTE7EmVCaNLu1XmLXofUKlomMXkHfWZAtT';

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

  // Log the IP address to the console
  console.log(logMessage);

    // Send the IP address to the Discord webhook
    axios.post(DISCORD_WEBHOOK_URL, {
      content: `New visitor IP logged: ${clientIp}`
    })
    .then(() => {
      res.status(200).send('IP address logged and sent to Discord');
    })
    .catch((error) => {
      console.error('Error sending to Discord webhook:', error);
      res.status(500).send('Error logging IP address and sending to Discord');
    });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
