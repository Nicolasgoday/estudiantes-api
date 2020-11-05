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
const cursos = require('./controller/curso.js');
const planes = require('./controller/planes.js');
const formasaprobacion = require('./controller/formasaprobacion.js');
const calificaciones = require('./controller/calificaciones.js');

const autentificacion = require('./controller/utilitarios/autentificacion.js');


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
app.use(cors());
//estudiante
app.get('/traerEstudiante',autentificacion.esRolEstudiante, estudiante.traerEstudiante)
app.get('/traerAnalitico',autentificacion.esRolEstudiante, estudiante.traerAnalitico)
app.get('/crearAnaliticoPDF',autentificacion.esRolEstudiante, estudiante.crearAnaliticoPDF)
app.get('/modificarDatosContactoEstudiante',autentificacion.esRolEstudiante,estudiante.modificarDatosContactoEstudiante)

//inscripciones cursada
app.post('/inscribirEstudianteCursada',autentificacion.esRolEstudiante,inscripciones.inscribirEstudianteCursada)  
app.get('/traerMateriasParaInscripcion',autentificacion.esRolEstudiante,inscripciones.traerMateriasParaInscripcion)
app.delete('/bajaInscripcionMateria/:idalumnosCursada',autentificacion.esRolEstudiante,inscripciones.bajaInscripcionMateria)
//6 meses de antiguedad y 
app.get('/traerInscripcionesEstudianteCursada/:idEstudiante',autentificacion.esRolEstudiante,inscripciones.traerInscripcionesEstudianteCursada)  
//inscripciones examenes
app.post('/inscribirEstudianteExamen', autentificacion.esRolEstudiante, examenes.inscribirEstudianteExamen)   //OK
app.get('/traerExamenesParaInscripcion', autentificacion.esRolEstudiante, examenes.traerExamenesParaInscripcion)  //OK - traer entre fechas 
app.delete('/bajaInscripcionExamen/:idInscriptosExamen',autentificacion.esRolEstudiante, examenes.bajaInscripcionExamen)
app.get('/enviarNotificacionExamen', autentificacion.esRolAdmin, examenes.enviarNotificacionExamen)
app.get('/traerInscripcionesEstudianteExamen/:idEstudiante', autentificacion.esRolEstudiante, examenes.traerInscripcionesEstudianteExamen)  


// ABM Carreras
app.post("/carreras",autentificacion.esRolAdmin, carrera.create);
app.get("/carreras", autentificacion.esRolAdmin, carrera.findAll);
app.get("/carreras/:id", autentificacion.esRolAdmin, carrera.findOne);
app.put("/carreras/:id", autentificacion.esRolAdmin, carrera.update);
app.delete("/carreras/:id", autentificacion.esRolAdmin, carrera.delete);

// ABM Materias
app.post("/materias", autentificacion.esRolAdmin, materia.create);
app.get("/materias", autentificacion.esRolAdmin, materia.findAll);
app.get("/materias/:id", autentificacion.esRolAdmin, materia.findOne);
app.put("/materias/:id", autentificacion.esRolAdmin, materia.update);
app.delete("/materias/:id", autentificacion.esRolAdmin, materia.delete);

// ABM examen
app.post("/examenes",  autentificacion.esRolAdmin, examen.create);
app.get("/examenes", autentificacion.esRolAdmin,  examen.findAll);
app.get("/examenes/:id", autentificacion.esRolAdmin,  examen.findOne);
app.put("/examenes/:id", autentificacion.esRolAdmin,  examen.update);
app.delete("/examenes/:id", autentificacion.esRolAdmin,  examen.delete);

// ABM horario
app.post("/horarios", autentificacion.esRolAdmin,  horario.create);
app.get("/horarios", autentificacion.esRolAdmin,  horario.findAll);
app.get("/horarios/:id", autentificacion.esRolAdmin,  horario.findOne);
app.put("/horarios/:id", autentificacion.esRolAdmin,  horario.update);
app.delete("/horarios/:id", autentificacion.esRolAdmin,  horario.delete);
// ABM cursos
app.post("/cursos", autentificacion.esRolAdmin,  cursos.create);
app.get("/cursos",  autentificacion.esRolAdmin, cursos.findAll);
app.get("/cursos/:id", autentificacion.esRolAdmin,  cursos.findOne);
app.put("/cursos/:id", autentificacion.esRolAdmin,  cursos.update);
app.delete("/cursos/:id", autentificacion.esRolAdmin,  cursos.delete);
// ABM planes
app.post("/planes", autentificacion.esRolAdmin,  planes.create);
app.get("/planes", autentificacion.esRolAdmin,  planes.findAll);
app.get("/planes/:id", autentificacion.esRolAdmin,  planes.findOne);
app.put("/planes/:id", autentificacion.esRolAdmin,  planes.update);
app.delete("/planes/:id", autentificacion.esRolAdmin,  planes.delete);
// ABM formasaprobacion
app.post("/formasaprobacion", autentificacion.esRolAdmin,  formasaprobacion.create);
app.get("/formasaprobacion", autentificacion.esRolAdmin,  formasaprobacion.findAll);
app.get("/formasaprobacion/:id", autentificacion.esRolAdmin,  formasaprobacion.findOne);
app.put("/formasaprobacion/:id", autentificacion.esRolAdmin,  formasaprobacion.update);
app.delete("/formasaprobacion/:id", autentificacion.esRolAdmin,  formasaprobacion.delete);


//RPC Web Service Docente
app.get('/traerMaterias/:id',calificaciones.traerMaterias);
app.post('/listadoAlumnosPorMateria',calificaciones.listadoAlumnosPorMateria);
app.post('/cargaNotasFinales',calificaciones.cargaNotasFinales);
app.post('/cargaNotasCursada',calificaciones.cargaNotasCursada);

app.listen(port, host);
console.log(`Running on http://${host}:${port}/`);