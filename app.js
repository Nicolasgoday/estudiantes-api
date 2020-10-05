const path = require('path');
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const inscripciones = require('./controller/inscripciones.js');
const examenes = require('./controller/examenes.js');
const estudiante = require('./controller/estudiante.js');
const carrera = require('./controller/carrera.js');
const materia = require('./controller/materia.js');
const examen = require('./controller/examen.js');
const horario = require('./controller/horario.js');

const swaggerDocument = require('./swagger/swagger.json');
const swaggerDocumentDev = require('./swagger/swagger-dev.json');

const env = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 8080;
const host = process.env.HOST || '0.0.0.0';

const publicRoot = path.resolve(path.join(__dirname, '/'), '');
const app = express();

if (env =="production") {
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}else{
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocumentDev));    
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
//estudiante
app.get('/traerEstudiante',estudiante.traerEstudiante)
app.get('/traerAnalitico',estudiante.traerAnalitico)
app.post('/crearAnaliticoPDF',estudiante.crearAnaliticoPDF)
app.get('/modificarDatosContactoEstudiante',estudiante.modificarDatosContactoEstudiante)

//inscripciones cursada
app.post('/inscribirEstudianteCursada',inscripciones.inscribirEstudianteCursada) 
app.get('/traerMateriasParaInscripcion',inscripciones.traerMateriasParaInscripcion)
app.delete('/bajaInscripcionMateria',inscripciones.bajaInscripcionMateria)
//inscripciones examenes
app.post('/inscribirEstudianteExamen',examenes.inscribirEstudianteExamen)
app.get('/traerExamenesParaInscripcion',examenes.traerExamenesParaInscripcion)
app.delete('/bajaInscripcionExamen',examenes.bajaInscripcionExamen)


// ABM Carreras
app.post("/carrera", carrera.create);
app.get("/carrera", carrera.findAll);
app.get("/carrera/:id", carrera.findOne);
app.put("/carrera/:id", carrera.update);
app.delete("/carrera/:id", carrera.delete);

// ABM Materias
app.post("/materia", materia.create);
app.get("/materia", materia.findAll);
app.get("/materia/:id", materia.findOne);
app.put("/materia/:id", materia.update);
app.delete("/materia/:id", materia.delete);

// ABM examen
app.post("/examen", examen.create);
app.get("/examen", examen.findAll);
app.get("/examen/:id", examen.findOne);
app.put("/examen/:id", examen.update);
app.delete("/examen/:id", examen.delete);

// ABM horario
app.post("/horario", horario.create);
app.get("/horario", horario.findAll);
app.get("/horario/:id", horario.findOne);
app.put("/horario/:id", horario.update);
app.delete("/horario/:id", horario.delete);

app.listen(port, host);
console.log(`Running on http://${host}:${port}/`);