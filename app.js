const path = require('path');
const express = require('express')
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const controller = require('./api/controllers/hello_world.js');

const swaggerDocument = require('./api/swagger/swagger.json');

const port = process.env.PORT || 8080;
const host = process.env.HOST || '0.0.0.0';

const publicRoot = path.resolve(path.join(__dirname, '/'), '');
const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/hello',controller.hello)

app.listen(port, host);
console.log(`Running on http://${host}:${port}`);