
var util = require('util');
var mysql = require('mysql2');
var http = require('http');
const host = process.env['NODE_ESTUDIANTE_HOST'];
const database = process.env['NODE_ESTUDIANTE_DB'];
const user = process.env['NODE_ESTUDIANTE_USER'];
const password = process.env['NODE_ESTUDIANTE_PASSWORD'];
const port = process.env['NODE_ESTUDIANTE_DBPORT'];

const connectionString = { host: host, port: port, user: user, password: password, database: database };

//traerMaterias para inscripcion
exports.traerMateriasParaInscripcion= (req, res) => {
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
  };

//Inscribirser a una materia
exports.inscribirEstudianteCursada= (req, res) => {
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
};  


//darse de baja a una materia
exports.bajaInscripcionMateria= (req, res) => {
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
};
 

