const path = require('path');
const express = require('express')
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const controller = require('./api/controllers/hello_world.js');

const swaggerDocument = require('./api/swagger/swagger.json');

const port = process.env.PORT || 8080;
const publicRoot = path.resolve(path.join(__dirname, '/'), '');
const app = express();

module.exports = app; // for testing


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/hello',controller.hello)

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
