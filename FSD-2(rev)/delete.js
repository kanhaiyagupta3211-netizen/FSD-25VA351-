const fs = require('fs');


fs.unlink('yourfile.txt', (err) => {
  if (err) console.error(err);
  else console.log('File deleted!');
});