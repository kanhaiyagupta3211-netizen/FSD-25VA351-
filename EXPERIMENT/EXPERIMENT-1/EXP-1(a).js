//Create a custom EventEmitter that Triggers "greet"or"exit"
const EventEmitter = require('events');
const myEmitter = new EventEmitter();

myEmitter.on('greet', (name) => {
    console.log(`Hello, ${name}! Welcome to Node.js`);
});

myEmitter.on('exit', () => {
    console.log("Application closed");
});

myEmitter.emit('greet', 'KANAHIYA');
myEmitter.emit('exit')