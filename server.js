const express = require('express');
const app = express();
const http = require('http').createServer(app);

app.get('/', async (req, res) => {
  res.send('<h1>Motiff Square Server </h1>');
});

const PORT = process.env.PORT || 3001;

const server = async () => {
  try {
    http.listen(PORT, () => {
      console.log('Server started on ', PORT);
    });
  } catch (error) {
    console.log(error);
  }
};

server();
