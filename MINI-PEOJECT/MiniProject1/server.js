const express = require('express');
const EventEmitter = require('events');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const FILE_PATH = path.join(__dirname, 'demo.txt');

app.use(express.json());
app.use(express.static(__dirname));

// 1. EventEmitter Setup
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

myEmitter.on('greet', (name, callback) => {
  callback(`Hello, ${name}! Welcome to Node.js EventEmitter.`);
});

myEmitter.on('exit', (callback) => {
  callback('Exit event triggered successfully!');
});

// 1. EventEmitter Endpoints
app.get('/greet', (req, res) => {
  const name = req.query.name || 'Guest';
  myEmitter.emit('greet', name, (message) => {
    res.json({ event: 'greet', message });
  });
});

app.get('/exit', (req, res) => {
  myEmitter.emit('exit', (message) => {
    res.json({ event: 'exit', message });
  });
});

// 3. Event Loop Execution Order Endpoint
app.get('/eventloop', (req, res) => {
  const order = [];

  order.push('1. Synchronous Code (Call Stack)');

  setTimeout(() => {
    order.push('4. setTimeout (Timer Phase)');
  }, 0);

  setImmediate(() => {
    order.push('5. setImmediate (Check Phase)');
    res.json({ order });
  });

  process.nextTick(() => {
    order.push('2. process.nextTick (Microtask Queue)');
  });

  Promise.resolve().then(() => {
    order.push('3. Promise.then (Microtask Queue)');
  });
});

// 4. File CRUD Endpoints
app.post('/create', (req, res) => {
  const text = req.body.text || '';
  fs.writeFile(FILE_PATH, text, (err) => {
    if (err) return res.status(500).json({ error: 'Failed to create file' });
    res.json({ status: 'Created', content: text });
  });
});

app.get('/read', (req, res) => {
  fs.readFile(FILE_PATH, 'utf8', (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        return res.json({ status: 'Read', content: '[File does not exist]' });
      }
      return res.status(500).json({ error: 'Failed to read file' });
    }
    res.json({ status: 'Read', content: data });
  });
});

app.put('/update', (req, res) => {
  const text = '\n' + (req.body.text || '');
  fs.appendFile(FILE_PATH, text, (err) => {
    if (err) return res.status(500).json({ error: 'Failed to update file' });
    fs.readFile(FILE_PATH, 'utf8', (readErr, data) => {
      res.json({ status: 'Updated', content: data });
    });
  });
});

app.delete('/delete', (req, res) => {
  fs.unlink(FILE_PATH, (err) => {
    if (err && err.code !== 'ENOENT') {
      return res.status(500).json({ error: 'Failed to delete file' });
    }
    res.json({ status: 'Deleted', message: 'File cleared/removed.' });
  });
  
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});