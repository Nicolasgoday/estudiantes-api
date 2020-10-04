const path = require('path');
const express = require('express')
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const estudiante = require('./controller/estudiante.js');
const carrera = require('./controller/carreraController.js');

const swaggerDocument = require('./swagger/swagger.json');
const swaggerDocumentDev = require('./swagger/swagger-dev.json');

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/config/config.js')[env];
const port = process.env.PORT || 8080;
const host = process.env.HOST || '0.0.0.0';

const publicRoot = path.resolve(path.join(__dirname, '/'), '');
const app = express();

if (config.use_env_variable) {
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}else{
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocumentDev));    
}


app.get('/traerAnalitico',estudiante.traerAnalitico)
app.get('/modificarDatosContactoEstudiante',estudiante.modificarDatosContactoEstudiante)
app.post('/inscribirEstudianteCursada',estudiante.inscribirEstudianteCursada) 
app.post('/inscribirEstudianteExamen',estudiante.inscribirEstudianteExamen)
app.get('/traerExamenesParaInscripcion',estudiante.traerExamenesParaInscripcion)
app.get('/traerMateriasParaInscripcion',estudiante.traerMateriasParaInscripcion)
app.delete('/bajaInscripcionMateria',estudiante.bajaInscripcionMateria)
app.delete('/bajaInscripcionExamen',estudiante.bajaInscripcionExamen)
app.post('/crearAnaliticoPDF',estudiante.crearAnaliticoPDF)

// Create a new Carrera
app.post("/carrera", carrera.create);
// Lista carreras
app.get("/carrera", carrera.findAll);
// Carrera por id
app.get("/carrera/:id", carrera.findOne);
// Update carrera por id
app.put("/carrera/:id", carrera.update);
// Delete Carrera por id
app.delete("/carrera/:id", carrera.delete);

// Crear un nuevo horario
app.post("/horario", carrera.create);
// Lista horarios
app.get("/horario", carrera.findAll);
// horarios por id
app.get("/horario/:id", carrera.findOne);
// Update horarios por id
app.put("/horario/:id", carrera.update);
// Delete horarios por id
app.delete("/horario/:id", carrera.delete);

app.listen(port, host);
console.log(`Running on http://${host}:${port}/`);