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
app.post("/carreras", carrera.create);
app.get("/carreras", carrera.findAll);
app.get("/carreras/:id", carrera.findOne);
app.put("/carreras/:id", carrera.update);
app.delete("/carreras/:id", carrera.delete);

// ABM Materias
app.post("/materias", materia.create);
app.get("/materias", materia.findAll);
app.get("/materias/:id", materia.findOne);
app.put("/materias/:id", materia.update);
app.delete("/materias/:id", materia.delete);

// ABM examen
app.post("/examenes", examen.create);
app.get("/examenes", examen.findAll);
app.get("/examenes/:id", examen.findOne);
app.put("/examenes/:id", examen.update);
app.delete("/examenes/:id", examen.delete);

// ABM horario
app.post("/horarios", horario.create);
app.get("/horarios", horario.findAll);
app.get("/horarios/:id", horario.findOne);
app.put("/horarios/:id", horario.update);
app.delete("/horarios/:id", horario.delete);

app.listen(port, host);
console.log(`Running on http://${host}:${port}/`);