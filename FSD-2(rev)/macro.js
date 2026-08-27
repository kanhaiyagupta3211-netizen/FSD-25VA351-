const fs = require('fs');

console.log('1: start (sync)');


setTimeout(() => {
    console.log('2: Inside setTimeout (macrotask - Timersphase )');
}, 0);


setImmediate(() => {
    console.log('3: Inside setImmediate (macrotask - Check phase)');
});


process.nextTick(()=>{
    console.log('4:process.nextTick (hghest priority microtask)');
});

Promise.resolve().then(() => {
    console.log('5:Promise.then(microtask))');
});

console.log('6: end (sync)');