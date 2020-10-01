const path = require('path');
const express = require('express')
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const estudiante = require('./api/controllers/estudiante.js');

const carrera = require('./api/carreraController.js');

const swaggerDocument = require('./api/swagger/swagger.json');
const swaggerDocumentDev = require('./api/swagger/swagger-dev.json');

const port = process.env.PORT || 8080;
const host = process.env.HOST || '0.0.0.0';

const publicRoot = path.resolve(path.join(__dirname, '/'), '');
const app = express();


const db = require("./models");
db.sequelize.sync();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocumentDev));



app.get('/traerAnalitico',estudiante.traerAnalitico)
app.get('/traerEstudiante',estudiante.traerEstudiante)
app.get('/inscribirEstudianteCursada',estudiante.inscribirEstudianteCursada)
app.get('/traerExamenesParaInscripcion',estudiante.traerExamenesParaInscripcion)
app.get('/traerMateriasParaInscripcion',estudiante.traerMateriasParaInscripcion)
app.get('/bajaInscripcionMateria',estudiante.bajaInscripcionMateria)
app.get('/bajaInscripcionExamen',estudiante.bajaInscripcionExamen)
app.get('/crearAnaliticoPDF',estudiante.crearAnaliticoPDF)

app.get('/carrera',carrera.create);

app.listen(port, host);
console.log(`Running on http://${host}:${port}/`);