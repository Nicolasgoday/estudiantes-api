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


//traer lista de examenes para inscripcion
exports.traerExamenesParaInscripcion= (req, res) => {
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
 };

 //inscribir estudiante a un examen
 exports.inscribirEstudianteExamen = (req, res) => {
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
};

//Dar de baja inscripcion a examen
exports.bajaInscripcionExamen= (req, res) => {
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
  }





