
const EventEmitter = require('events');


class Element extends EventEmitter {
  constructor(name, parent = null) {
    super();
    this.name = name;
    this.parent = parent;
  }

 
  addEventListener(type, handler) {
    this.on(type, handler);
  }

 
  removeEventListener(type, handler) {
    this.off(type, handler);
  }


  dispatchEvent(type, data = null) {

    const event = {
      type,
      target: this,         
      currentTarget: this,   
      data,
      _propagationStopped: false,

    
      stopPropagation() {
        this._propagationStopped = true;
      },
    };

    this._bubble(event);
  }

 
  _bubble(event) {
    let node = this;

    while (node && !event._propagationStopped) {
      event.currentTarget = node;
      node.emit(event.type, event);
      node = node.parent;
    }
  }
}


const documentEl = new Element('document');
const formEl     = new Element('form', documentEl);
const buttonEl   = new Element('button', formEl);


function printEvent(event) {
  console.log(
    `[${event.currentTarget.name}] '${event.type}' | ` +
    `target=${event.target.name} | ` +
    `currentTarget=${event.currentTarget.name}`
  );
}


const formClickHandlerA = (event) => {
  printEvent(event);
};


const documentClickHandler = (event) => {
  printEvent(event);
};

const buttonClickHandler = (event) => {
  printEvent(event);
};

documentEl.addEventListener('click', documentClickHandler);
formEl.addEventListener('click', formClickHandlerA);
buttonEl.addEventListener('click', buttonClickHandler);

console.log('===== Question 2: DOM-like Event Handling =====\n');


console.log('--- Scenario A: Click button (normal bubbling) ---');
buttonEl.dispatchEvent('click', { message: 'Hello DOM' });


console.log('\n--- Scenario B: form calls stopPropagation() ---');


formEl.removeEventListener('click', formClickHandlerA);

const formClickHandlerB = (event) => {
  printEvent(event);
  console.log('  ↳ stopPropagation() called on form');
  event.stopPropagation();
};
formEl.addEventListener('click', formClickHandlerB);

buttonEl.dispatchEvent('click', { message: 'Stopped at form' });


console.log('\n--- Scenario C: Remove button listener, then click ---');
buttonEl.removeEventListener('click', buttonClickHandler);
buttonEl.dispatchEvent('click', { message: 'Button listener removed' });



console.log('\n--- Extra: keypress event on form (independent) ---');

formEl.addEventListener('keypress', (event) => {
  console.log(
    `[${event.currentTarget.name}] '${event.type}' | ` +
    `target=${event.target.name} | ` +
    `currentTarget=${event.currentTarget.name} | ` +
    `key=${event.data.key}`
  );
});


formEl.dispatchEvent('keypress', { key: 'Enter' });

console.log('\n===== End of Question 2 =====');