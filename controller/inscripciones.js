
var util = require('util');
var mysql = require('mysql2')
var http = require('http');
const host = process.env['NODE_ESTUDIANTE_HOST'];
const database = process.env['NODE_ESTUDIANTE_DB'];
const user = process.env['NODE_ESTUDIANTE_USER'];
const password = process.env['NODE_ESTUDIANTE_PASSWORD'];
const port = process.env['NODE_ESTUDIANTE_DBPORT'];

const connectionString = { host: host, port: port, user: user, password: password, database: database };

//traerMaterias para inscripcion
exports.traerMateriasParaInscripcion= (req, res) => {
    /*Consulta de materias/exámenes disponibles para inscripción, los listados deben
  mostrar los días, horarios y docentes asignados*/
  console.log(Date() + ": /traerMateriasParaInscripcion");
  var aPartir = new Date();
  const DATE_FORMATER = require( 'dateformat' );

  try {
    const coneccionDB = mysql.createConnection(connectionString);
    coneccionDB.connect(function (err) {
      if (err) throw err;
      //idMaterias, nombre, inicioInscripcion, finInscripcion, CarrerasIdCarreras, createdAt, updatedAt, planIdPlan, formaAprobacionIdformaAprobacion
      var query = 'select ' + database + '.materias.idMaterias as idMaterias,' + database + '.materias.nombre as materia, ' + database + '.curso.idCurso as curso, ' + database + '.horario.dia , ' + database
                  + '.horario.horarioInicio, JSON_UNQUOTE(' + database + '.curso.datosDocente->"$.nombre") as nombreProfesor, JSON_UNQUOTE(' + database + '.curso.datosDocente->"$.apellido") as apellidoProfesor from ' 
                  + database + '.materias inner join curso on ' + database + '.materias.idMaterias = ' 
                  + database + '.curso.MateriasIdMaterias  inner join ' + database + '.horario on ' + database + '.horario.CursoIdCurso = ' + database + '.curso.idCurso '
                  +' where  materias.inicioInscripcion <= "'+ DATE_FORMATER( aPartir, "yyyy-mm-dd" ) + '" and materias.finInscripcion >= "'+ DATE_FORMATER( aPartir, "yyyy-mm-dd" ) + '";';
      console.log(query);
      coneccionDB.query(query
        , function (err, result) {
          if (err) throw err;
          console.log("Result: " + result);
          coneccionDB.destroy();
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
 };

//Inscribirser a una materia
exports.inscribirEstudianteCursada= (req, res) => {
  console.log(Date() + ": /inscribirEstudianteCursada");
  try {
    var idEstudiante = req.body.idEstudiante
    var idMateria = req.body.idMaterias
    var recordatorio = req.body.recordatorio

    const coneccionDB = mysql.createConnection(connectionString);
    var request = require('request');
    
    var token = req.headers.authorization.split(" ")[1];

    request({
      url: 'https://administrador-unla.herokuapp.com/api/estudiantes/' + idEstudiante,
      method: 'GET',
      headers: {
        'Authorization': req.headers.authorization,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      rejectUnauthorized: false
    }, function (error, response, body) {
      
      if (!error && response.statusCode == 200) {
        console.log(body) // Print the google web page.
        var responseJson = JSON.stringify(body);
        coneccionDB.connect(function (err) {
         if (err){
           res.status(500).send({
             message: "ERROR AL CONECTAR"
           });
         }
         var queryEstaInscripto = 'select count(*) as yaEstaAnotado from alumnoscursada where JSON_UNQUOTE(datosAlumno->"$.id") = '+ idEstudiante +' and MateriasIdMaterias= ' + idMateria + ';';        
         //console.log(insertarAlumno);
         coneccionDB.query(queryEstaInscripto, function (err, rows, fields){
           console.log(rows[0].yaEstaAnotado);
           if (rows[0].yaEstaAnotado == 0){  //SI ES IGUAL QUE 0 NO HAY UNA INSCRIPCION 
             //ExamenesidExamenes, datosAlumno, nota, asistencia, recordatorio, createdAt, updatedAt
             var queryInsertarAlumno = 'INSERT INTO ' + database + '.`alumnoscursada`(' + database + '.alumnoscursada.`datosAlumno`,' + database +
             '.alumnoscursada.`MateriasIdMaterias`,' + database + '.alumnoscursada.`recordatorio`, ' + database + '.alumnoscursada.`createdAt`, ' + database + '.alumnoscursada.`updatedAt`)' +
           'VALUES(' + responseJson + ',' + idMateria + ',' + recordatorio + ', NOW() , NOW() );';
             coneccionDB.query(queryInsertarAlumno, function (err, result) {
                   if (err){
                      res.status(500).send({
                      message: "ERROR AL INSERTAR"
                     });
                   }
                   coneccionDB.destroy();
                   res.status(200)
                   return res.send(result)
                 });
           }
           else{              
             coneccionDB.destroy();
             res.status(406).send({
               message: "ALUMNO YA ESTA INSCRIPTO"
             });
             return;
           }
         });
       });
     }
     else{        
       res.status(404).send({
         message: "NO EXISTE ALUMNO"
       });
       return;
     }
   });
 }
 catch (e) {
   console.log("ERROR");
   res.status(500).send({      
     message: "Falla al insertar"
   });
   return;
 }  
};

//darse de baja a una materia
exports.bajaInscripcionMateria= (req, res) => {
  console.log(Date() + ": /bajaInscripcionMateria");
  var aPartir = new Date();
  const DATE_FORMATER = require( 'dateformat' );
  var idInscripcion = req.body.idInscripcion;
  
  try {
    if (!req.body.idInscripcion) {
      res.status(400).send({
        message: "El body no puede estar vacio"
      });
      return;
  }
    const coneccionDB = mysql.createConnection(connectionString);
    coneccionDB.connect(function (err) {
        if (err) throw err;
        var enFechaBaja = 'SELECT count(*) as eliminable FROM inscripciones.alumnoscursada ' +
        'inner join materias on alumnoscursada.MateriasIdMaterias = materias.idMaterias ' +
        'where idalumnosCursada= '+ idInscripcion + ' and materias.inicioInscripcion <= "'+ DATE_FORMATER( aPartir, "yyyy-mm-dd" ) + '" and materias.finInscripcion >= "'+ DATE_FORMATER( aPartir, "yyyy-mm-dd" ) + '" ;'
        coneccionDB.query(enFechaBaja, function (err, rows, fields){
            console.log(rows[0].eliminable);
            if (rows[0].eliminable > 0){  //SI ES MAYOR QUE 0 HAY UNA INSCRIPCION Y ESTA EN FECHA DE PODER DAR DE BAJA
              var queryDelete = 'DELETE FROM ' + database + '.`alumnoscursada` WHERE ' + database + '.alumnoscursada.idalumnosCursada = ' + idInscripcion + ';';
              console.log(queryDelete);
              coneccionDB.query(queryDelete, function (err, result) {
                if (err) throw err;
                coneccionDB.destroy();
                res.status(200).send({
                  message: "OK"
                });
                return;
              });
            }
            else{
              //NO ACEPTABLE-FUERA DE FECHA
              res.status(406).send({
                message: "INSCRIPCION FUERA DE FECHA PARA ELIMINAR O NO EXISTE"
              });
              return;
            }
        });
    });
    }
    catch (e) {
      console.error(e)
      res.status(500)
      res.send(e)
    }
  }
//Traer materias en q se inscribio para examen, la trae hasta que se vence la fecha de ventana de inscripcion
exports.traerInscripcionesEstudianteCursada= (req, res) => {
  console.log(Date() + ": /traerInscripcionesEstudianteCursada");
  /*Consulta de materias/exámenes disponibles para inscripción, los listados deben
mostrar los días, horarios y docentes asignados*/
const idEstudiante = req.params.idEstudiante; 

  
var aPartir = new Date();
const DATE_FORMATER = require( 'dateformat' );

try {
  if (!req.body.idEstudiante) {
    res.status(400).send({
      message: "El body no puede estar vacio"
    });
    return;
}
  const coneccionDB = mysql.createConnection(connectionString);
  coneccionDB.connect(function (err) {
    if (err) throw err;
    //SELECT idalumnosCursada,  idMaterias, nombre, inicioInscripcion, finInscripcion
  //FROM inscripciones.alumnoscursada inner join materias on materias.idMaterias = alumnoscursada.MateriasIdMaterias 
//where  materias.finInscripcion < NOW() and JSON_UNQUOTE(datosAlumno->"$.id") = 1;
var query = 'select ' + database + '.alumnoscursada.idalumnosCursada,' + database + '.materias.idMaterias, ' 
                + database + '.materias.nombre , ' + database + '.materias.inicioInscripcion, '
                + database + '.materias.finInscripcion FROM ' + database + '.alumnoscursada ' 
                + 'inner join materias on ' + database + '.materias.idMaterias = ' 
                + database + '.alumnoscursada.MateriasIdMaterias'
                +' where  materias.finInscripcion >= "'+ DATE_FORMATER( aPartir, "yyyy-mm-dd" ) + '" and JSON_UNQUOTE(' + database + '.alumnoscursada.datosAlumno->"$.id") = '+ idEstudiante + ';';      

                console.log(query);
    coneccionDB.query(query
      , function (err, result) {
        if (err) throw err;
        console.log("Result: " + result);
        coneccionDB.destroy();
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
}

