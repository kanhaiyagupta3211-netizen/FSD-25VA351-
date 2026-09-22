const http = require('http');
const Port = 3000; 

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.end("Home Page");
  } 

  else if (req.url === "/about") {
    res.end("About Page");
  } 

  else if (req.url === "/students") {
    res.end("Students Page");
  } 

  else {
    res.end("page not found");
  }

});

server.listen(Port, () => {
  console.log(`Server http://localhost:${Port}/students`);
});