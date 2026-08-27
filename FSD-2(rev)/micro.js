const fs = require('fs');

console.log('1: start (sync)');

setTimeout(() => {
    console.log('2: Inside setTimeout (microtask - runs later)');
}, 0);

Promise.resolve().then(() => {
    console.log('3: Inside Promise.then (microtask - runs before setTimeout)');
});

fs.readFile(__filename, () => {
    console.log('4: Inside fs.readFile callback (I/O)');
});

console.log('5: end (sync)');