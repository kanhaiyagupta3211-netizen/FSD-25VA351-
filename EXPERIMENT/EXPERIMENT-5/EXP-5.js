const http = require('http');
const Port = 3000; 

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/students') {
          res.end("GET : Student data");
  }

  else if(req.method === 'POST' && req.url === '/students'){
    res.end("POST: Student data");
  }

  else if (req.method === 'PUT' && req.url === '/students') {
    res.end("PUT : Student data updated");
  }

  else if (req.method === 'DELETE' && req.url === '/students') {
    res.end("DELETE : Student data deleted");
  }

  else {
    res.end("Method Not Found");
  }

});

server.listen(Port, () => {
  console.log(`Server http://localhost:${Port}/students`);
});