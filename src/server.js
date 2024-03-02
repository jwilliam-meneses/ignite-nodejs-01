import http from 'node:http';
import { json } from './middlewares/json.js';

const users = [];

const server = http.createServer(async (req, res) => {
    const { method, url } = req;

    await json(req, res);

    if (method === 'GET' && url === '/users') {
        return res
            .end(JSON.stringify(users));
    }

    if (method === 'POST' && url === '/users') {
        const { name, email } = req.body;

        users.push({
            id: 1,
            name,
            email
        });

        return res.writeHead(201).end();
    }

    res.writeHead(404).end();
});

const url = 'http://localhost';
const port = 3333;
server.listen(port, () => console.log(`Servidor rodando em ${url}:${port}`));