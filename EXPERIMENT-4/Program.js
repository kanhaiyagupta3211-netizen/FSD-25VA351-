const http = require('http');

let items = ['Apple', 'Banana'];

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    if (req.method === 'GET') {
        res.end(JSON.stringify(items));
    }

    else if (req.method === 'POST') {
        let body = '';

        req.on('data', chunk => body += chunk);

        req.on('end', () => {
            items.push(body);
            res.end('Item added: ' + body);
        });
    }

    else if(req.method=='PUT'){
        item[0]='Updated Item';

    }

    else if(req.method == 'DELETE'){
        items.pop();
        res.end('Last item removed');
    }
});


server.listen(3000,() => console.log('Server running on http://localhost:3000'));