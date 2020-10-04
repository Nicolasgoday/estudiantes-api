'use strict';
/*
 'use strict' is not required but helpful for turning syntactical errors into true errors in the program flow
 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
*/

var util = require('util');
var mysql = require('mysql2');
var http = require('http');
const host = process.env['NODE_ESTUDIANTE_HOST'];
const database = process.env['NODE_ESTUDIANTE_DB'];
const user = process.env['NODE_ESTUDIANTE_USER'];
const password = process.env['NODE_ESTUDIANTE_PASSWORD'];
const port = process.env['NODE_ESTUDIANTE_DBPORT'];

const connectionString = { host: host, port: port, user: user, password: password, database: database };


module.exports = {
  traerAnalitico: (req, res) => {
    console.log(Date() + ": /traerAnalitico");
    try {
      var idEstudiante = req.query.idEstudiante
      const coneccionDB = mysql.createConnection(connectionString);
      coneccionDB.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
        coneccionDB.query('SELECT * FROM ' + database + '.alumnosexamenfinal where ' + database + '.alumnosexamenfinal.asistencia=1 and  JSON_UNQUOTE(' + database + '.alumnosexamenfinal.datosAlumno->"$.id") = ' + idEstudiante + ';' //HAY Q TRAER ID ESTUDIANTE DE PARAMETRO
          , function (err, result) {
            if (err) throw err;
            console.log("Result: " + result);
            res.status(200)
            return res.send(result)
          });
      });
    }
    catch (e) {
      console.error(e)
      res.status(500)
      res.send(e)
    }
  },
  inscribirEstudianteCursada: (req, res) => {
    console.log(Date() + ": /inscribirEstudianteCursada");
    try {
      var idEstudiante = req.query.idEstudiante
      var idCarrera = req.query.idCarrera
      var idMateria = req.query.idMateria
      var recordatorio = req.query.recordatorio
      const coneccionDB = mysql.createConnection(connectionString);
      var request = require('request');
      request('https://administrador-unla.herokuapp.com/api/estudiantes/1', function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log(body) // Print the google web page.
          var responseJson = JSON.stringify(body);
          coneccionDB.connect(function (err) {
            if (err) throw err;

            var toQuery = 'INSERT INTO ' + database + '.`alumnoscursada`(' + database + '.alumnoscursada.`datosAlumno`,' + database +
              '.alumnoscursada.`Materias_idMaterias`,' + database + '.alumnoscursada.`Materias_Carreras_idCarreras` , ' +
              database + '.alumnoscursada.`recordatorio`, ' + database + '.alumnoscursada.`createdAt`, ' + database + '.alumnoscursada.`updatedAt`)' +
              'VALUES(' + responseJson + ',' + idMateria + ',' + idCarrera + ',' + recordatorio + ', NOW() , NOW() ' +
              ');';
            //console.log(toQuery);
            coneccionDB.query(toQuery //HAY Q TRAER ID ESTUDIANTE DE PARAMETRO
              , function (err, result) {
                if (err) throw err;
                res.status(200)
                return res.send(result)
              });
          });
        }
        else {
          res.status(404)
          console.log("error") // Print the google web page.
        }
      })

    }
    catch (e) {
      console.error(e)
      res.status(500)
      res.send(e)
    }
  },
  inscribirEstudianteExamen: (req, res) => {
    console.log(Date() + ": /inscribirEstudianteExamen");
    try {
      var idEstudiante = req.query.idEstudiante;
      var idExamen = req.query.idExamen;
      var idCarrera = req.query.idCarrera;
      var idMateria = req.query.idMateria;
      var recordatorio = req.query.recordatorio;
      const coneccionDB = mysql.createConnection(connectionString);
      var request = require('request');
      request('https://administrador-unla.herokuapp.com/api/estudiantes/1', function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log(body) // Print the google web page.
          var responseJson = JSON.stringify(body);
          coneccionDB.connect(function (err) {
            if (err) throw err;
            var toQuery = 'INSERT INTO ' + database + '.`alumnosexamenfinal`(' + database + '.alumnosexamenfinal.`Examenes_idExamenes`,' + database + '.alumnosexamenfinal.`datosAlumno`,' + database +
              '.alumnosexamenfinal.`Examenes_Materias_idMaterias`,' + database + '.alumnosexamenfinal.`Examenes_Materias_Carreras_idCarreras` , ' +
              database + '.alumnosexamenfinal.`recordatorio`, ' + database + '.alumnosexamenfinal.`createdAt`, ' + database + '.alumnosexamenfinal.`updatedAt`)' +
              'VALUES(' + idExamen + ',' + responseJson + ',' + idMateria + ',' + idCarrera + ',' + recordatorio + ', NOW() , NOW() ' +
              ');';
            console.log(toQuery);
            coneccionDB.query(toQuery //HAY Q TRAER ID ESTUDIANTE DE PARAMETRO
              , function (err, result) {
                if (err) throw err;
                res.status(200)
                return res.send(result)
              });
          });
        }
        else {
          res.status(404)
          console.log("error") // Print the google web page.
        }
      })

    }
    catch (e) {
      console.error(e)
      res.status(500)
      res.send(e)
    }
  },
  modificarDatosContactoEstudiante: (req, res) => {  ///FALTA DEFINIR COMO MANDAR LOS DATOS A LA API DE UDPATE ESTUDIANTE 
    console.log(Date() + ": /traerEstudiante");
    try {

      var idEstudiante = req.query.idEstudiante;
      var domicilio = req.query.domicilio;
      var email = req.query.email;
      var telefono = req.query.telefono;

      const coneccionDB = mysql.createConnection(connectionString);

      var request = require('request');
      request('https://administrador-unla.herokuapp.com/api/estudiantes/1', function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log(body) // Print the google web page.
          var responseJson = JSON.stringify(body);
          coneccionDB.connect(function (err) {
            if (err) throw err;
            console.log("Connected a web!");
            /// CHEQUEAR ESTADO CONEXION
          });
        }
        else {
          console.log("error") // Print the google web page.
        }
      })
    }
    catch (e) {
      console.error(e)
      res.status(500)
      res.send(e)
    }
  },
  traerMateriasParaInscripcion: (req, res) => {
    console.log(Date() + ": /traerMateriasParaInscripcion");
    try {

      const coneccionDB = mysql.createConnection(connectionString);
      coneccionDB.connect(function (err) {
        if (err) throw err;
        console.log("Connected a web!");
        coneccionDB.query('select ' + database + '.materias.nombre as materia, ' + database + '.curso.idCurso as curso, ' + database + '.horario.dia , ' + database + '.horario.horarioInicio, JSON_UNQUOTE(' + database + '.curso.datosDocente->"$.nombre") as nombreProfesor, JSON_UNQUOTE(' + database + '.curso.datosDocente->"$.apellido") as apellidoProfesor from ' + database + '.materias inner join curso on ' + database + '.materias.idMaterias = ' + database + '.curso.Materias_idMaterias  inner join ' + database + '.horario on ' + database + '.horario.Curso_idCurso = ' + database + '.curso.idCurso;'
          , function (err, result) {
            if (err) throw err;
            console.log("Result: " + result);

            return res.send(result)
          });
      });
    }
    catch (e) {
      console.error(e)
      res.status(500)
      res.send(e)
    }
  },
  traerExamenesParaInscripcion: (req, res) => {
    /*Consulta de materias/exámenes disponibles para inscripción, los listados deben
    mostrar los días, horarios y docentes asignados*/
    console.log(Date() + ": /traerExamenesParaInscripcion");
    try {
      const coneccionDB = mysql.createConnection(connectionString);
      coneccionDB.connect(function (err) {
        if (err) throw err;
        console.log("Connected a web!");
        coneccionDB.query('select ' + database + '.materias.nombre as materia, ' + database + '.curso.idCurso as curso, ' + database + '.examenes.fecha , ' + database + '.examenes.horarioInicio, JSON_UNQUOTE(' + database + '.examenes.docenteAsignado->"$.nombre") as nombreProfesor, JSON_UNQUOTE(' + database + '.examenes.docenteAsignado->"$.apellido") as apellidoProfesor from ' + database + '.examenes inner join ' + database + '.materias on ' + database + '.examenes.Materias_idMaterias = ' + database + '.materias.idMaterias inner join ' + database + '.curso on ' + database + '.materias.idMaterias = ' + database + '.curso.Materias_idMaterias  ;'
          , function (err, result) {
            if (err) throw err;
            console.log("Result: " + result);

            return res.send(result)
          });
      });
    }
    catch (e) {
      console.error(e)
      res.status(500)
      res.send(e)
    }
  },
  bajaInscripcionMateria: (req, res) => {
    console.log(Date() + ": /bajaInscripcionMateria");
    try {
      var idInscripcion = req.query.idInscripcion
      const coneccionDB = mysql.createConnection(connectionString);
      coneccionDB.connect(function (err) {
        if (err) throw err;
        coneccionDB.query('DELETE FROM ' + database + '.`alumnoscursada` WHERE ' + database + '.alumnoscursada.idalumnosCursada = ' + idInscripcion + ';'
          , function (err, result) {
            if (err) throw err;
            console.log("Result: " + result);

            return res.send(result)
          });
      });
    }
    catch (e) {
      console.error(e)
      res.status(500)
      res.send(e)
    }
  },
  bajaInscripcionExamen: (req, res) => {
    console.log(Date() + ": /bajaInscripcionExamen");
    try {
      var idInscripcion = req.query.idInscripcion
      const coneccionDB = mysql.createConnection(connectionString);
      coneccionDB.connect(function (err) {
        if (err) throw err;
        coneccionDB.query('DELETE FROM ' + database + '.`alumnosexamenfinal` WHERE ' + database + '.alumnosexamenfinal.idInscriptosExamen = ' + idInscripcion + ';'
          , function (err, result) {
            if (err) throw err;
            console.log("Result: " + result);

            return res.send(result)
          });
      });
    }
    catch (e) {
      console.error(e)
      res.status(500)
      res.send(e)
    }
  },
  crearAnaliticoPDF: (req, res) => {
    console.log(Date() + ": /crearAnaliticoPDF");
    try {
      var idEstudiante = req.query.idEstudiante
      const coneccionDB = mysql.createConnection(connectionString);
      coneccionDB.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
        coneccionDB.query('SELECT * FROM ' + database + '.alumnosexamenfinal where ' + database + '.alumnosexamenfinal.asistencia=1 and  JSON_UNQUOTE(' + database + '.alumnosexamenfinal.datosAlumno->"$.id") = ' + idEstudiante + ';' //HAY Q TRAER ID ESTUDIANTE DE PARAMETRO
          , function (err, result) {
            if (err) throw err;
            const pdf = require('html-pdf');
            console.log("Result: " + result);
            const content = `<h1>Título en el PDF creado con el paquete html-pdf</h1><p>Generando un PDF con un HTML sencillo ` + result + '</p>';
            pdf.create(content).toFile('./html-pdf.pdf', function (err, res) {
              if (err) {
                console.log(err);
              } else {
                console.log(res);
              }
            });
          });
      });
    }
    catch (e) {
      console.error(e)
      res.status(500)
      res.send(e)
    }
  }
};




