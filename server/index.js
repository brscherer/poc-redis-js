const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { SetCommand, GetCommand, AppendCommand, DeleteCommand, HGetCommand, HSetCommand } = require('./commands');

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
  const { key } = req.params;
  const getCommand = new GetCommand(database);
  const value = getCommand.execute(key);
  if (value !== undefined) {
    res.send(value);
  } else {
    res.status(404).send('Key not found');
  }
});

app.post('/append/:key', (req, res) => {
  const { key } = req.params;
  const { value } = req.body;
  const appendCommand = new AppendCommand(database);
  appendCommand.execute(key, value);
  res.send('OK');
});

app.delete('/delete/:key', (req, res) => {
  const { key } = req.params;
  const deleteCommand = new DeleteCommand(database);
  const value = deleteCommand.execute(key);
  if (value) {
    res.send("Key deleted successfully");
  } else {
    res.status(404).send('Key not found');
  }
});

app.post('/hset', (req, res) => {
  const { hash, key, value } = req.body;
  const hSetCommand = new HSetCommand(database);
  hSetCommand.execute(hash, key, value);
  res.send('OK');
});

app.get('/hget/:hash/:key', (req, res) => {
  const { hash, key } = req.params;
  const hGetCommand = new HGetCommand(database);
  const value = hGetCommand.execute(hash, key);
  if (value !== undefined) {
    res.send(value);
  } else {
    res.status(404).send('Key not found');
  }
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});
