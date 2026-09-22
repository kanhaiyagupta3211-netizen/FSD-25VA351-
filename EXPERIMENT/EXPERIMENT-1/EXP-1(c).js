
console.log("Start");

setTimeout(() => {
    console.log("setTimeout(third)");
}, 0);

setImmediate(() => {
    console.log("setImmediate(second)");
});

process.nextTick(() => {
    console.log("process.nextTick (first)");
});

console.log("End");