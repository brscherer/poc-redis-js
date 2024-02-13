const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { SetCommand, GetCommand } = require('./commands');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const database = {}

app.post('/set', (req, res) => {
  const { key, value } = req.body;
  const setCommand = new SetCommand(database);
  setCommand.execute(key, value);
  res.send('OK');
});

app.get('/get/:key', (req, res) => {
  const key = req.params.key;
  const getCommand = new GetCommand(database);
  const value = getCommand.execute(key);
  if (value !== undefined) {
    res.send(value);
  } else {
    res.status(404).send('Key not found');
  }
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});
