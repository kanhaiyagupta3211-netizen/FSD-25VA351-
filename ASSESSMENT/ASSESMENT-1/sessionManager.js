const EventEmitter = require('events');

class SessionManager extends EventEmitter {
  constructor() {
    super();

    this.on('greet', (username) => {
      console.log(`Hello, ${username}! Welcome.`);
    });

    this.on('exit', (code) => {
      console.log(`Session closed with code ${code}. Goodbye!`);
    });

    this.once('greet', () => {
      console.log('First login of the day!');
    });

    this.on('error', (err) => {
      console.error(`Error captured: ${err.message}`);
    });
  }


  trigger(command, ...args) {
    if (command === 'greet' || command === 'exit') {
      this.emit(command, ...args);
    } else {
      console.log(`Unknown event: ${command}`);
    }
  }
}



console.log('===== Question 1: User Session Manager =====\n');

const session = new SessionManager();

console.log('--- Emitting greet 3 times ---');
session.emit('greet', 'Alice');
session.emit('greet', 'Bob');
session.emit('greet', 'Charlie');


console.log(`\nListener count for 'greet': ${session.listenerCount('greet')}`);

console.log('\n--- Emitting exit with code 0 ---');
session.emit('exit', 0);

console.log("\n--- Triggering unknown event: 'login' ---");
session.trigger('login');


console.log('\n--- Emitting error event ---');
session.emit('error', new Error('Session token expired'));

console.log('\n===== End of Question 1 =====');