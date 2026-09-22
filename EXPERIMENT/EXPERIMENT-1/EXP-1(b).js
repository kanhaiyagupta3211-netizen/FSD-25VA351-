//Simulate DOM-like event handling in Node.js using event  
const EventEmitter = require('events');

class Button extends EventEmitter{}

const button = new Button();

button.on('click',() => {
    console.log("Button Clicked")
});

button.on('mouseover',()=> {
    console.log("Mouse is over the button (mouse button ke uper hai)");
});

button.emit('click');
button.emit('mouseover');

