'use strict';
/*
 'use strict' is not required but helpful for turning syntactical errors into true errors in the program flow
 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
*/

var util = require('util');
var mysql = require('mysql2');
var http = require('http');
const nodemailer = require('nodemailer');
const host = process.env['NODE_ESTUDIANTE_HOST'];
const database = process.env['NODE_ESTUDIANTE_DB'];
const user = process.env['NODE_ESTUDIANTE_USER'];
const password = process.env['NODE_ESTUDIANTE_PASSWORD'];
const port = process.env['NODE_ESTUDIANTE_DBPORT'];
//VARIABLES MAIL
const smtp_server = process.env['MAILGUN_SMTP_SERVER'];
const usuario_mail = process.env['MAILGUN_SMTP_LOGIN'];
const password_mail = process.env['MAILGUN_SMTP_PASSWORD'];
const smtp_port = process.env['MAILGUN_SMTP_PORT'];
const dominio_smtp = process.env['MAILGUN_DOMAIN'];
const api_key_smtp = process.env['MAILGUN_API_KEY'];

var mg = require('nodemailer-mailgun-transport');



const connectionString = { host: host, port: port, user: user, password: password, database: database };


//traer lista de examenes para inscripcion
exports.traerExamenesParaInscripcion= (req, res) => {
  /*Consulta de materias/exámenes disponibles para inscripción, los listados deben
  mostrar los días, horarios y docentes asignados*/
  console.log(Date() + ": /traerExamenesParaInscripcion");
  var aPartir = new Date();
  const DATE_FORMATER = require( 'dateformat' );


  //console.log('La fecha actual es',DATE_FORMATER( aPartir, "yyyy-mm-dd" ));
  try {
    const coneccionDB = mysql.createConnection(connectionString);
    coneccionDB.connect(function (err) {
      if (err) throw err;
      var query = 'select ' + database + '.examenes.idExamenes ,'  + database + '.materias.nombre as materia, ' + database + '.curso.idCurso as curso, ' 
      + database + '.examenes.fecha , ' + database + '.examenes.horarioInicio, JSON_UNQUOTE(' + database
      + '.examenes.docenteAsignado->"$.nombre") as nombreProfesor, JSON_UNQUOTE(' + database + '.examenes.docenteAsignado->"$.apellido") as apellidoProfesor from ' 
      + database + '.examenes left join ' + database + '.materias on ' + database + '.examenes.MateriasIdMaterias = ' + database + '.materias.idMaterias left join ' 
      + database + '.curso on ' + database + '.materias.idMaterias = ' + database + '.curso.MateriasIdMaterias ' 
      +' where  examenes.inicioInscripcion <= "'+ DATE_FORMATER( aPartir, "yyyy-mm-dd" ) + '" and examenes.finInscripcion >= "'+ DATE_FORMATER( aPartir, "yyyy-mm-dd" ) + '";'
      console.log(query);
      coneccionDB.query(query
        , function (err, result) {
          if (err) throw err;
          coneccionDB.destroy();
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
    var request = require('request');
    var idEstudiante = req.body.idEstudiante;
    var idExamen = req.body.idExamenes;
    var recordatorio = req.body.recordatorio;
    const coneccionDB = mysql.createConnection(connectionString);
    
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
          var queryEstaInscripto = 'select count(*) as yaEstaAnotado from alumnosexamenfinal where JSON_UNQUOTE(datosAlumno->"$.id") = '+ idEstudiante +' and ExamenesidExamenes= ' + idExamen + ';';        
          //console.log(insertarAlumno);
          coneccionDB.query(queryEstaInscripto, function (err, rows, fields){

            console.log(rows[0].yaEstaAnotado);
            if (rows[0].yaEstaAnotado == 0){  //SI ES IGUAL QUE 0 NO HAY UNA INSCRIPCION 
              //ExamenesidExamenes, datosAlumno, nota, asistencia, recordatorio, createdAt, updatedAt
              var queryInsertarAlumno = 'INSERT INTO ' + database + '.`alumnosexamenfinal`(' + database + '.alumnosexamenfinal.`ExamenesidExamenes`,' + database + '.alumnosexamenfinal.`datosAlumno`,' +
              database + '.alumnosexamenfinal.`recordatorio`, ' + database + '.alumnosexamenfinal.`createdAt`, ' + database + '.alumnosexamenfinal.`updatedAt`)' +
                        'VALUES(' + idExamen + ',' + responseJson + ',' + recordatorio + ', NOW() , NOW() );';
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
          message: err + body + response + "NO EXISTE ALUMNO"
        });
        return;
      }
    })
  }
  catch (e) {
    console.log("ERROR");
    res.status(500).send({      
      message: "Falla al insertar"
    });
    return;
  }  
};

//Dar de baja inscripcion a examen
exports.bajaInscripcionExamen= (req, res) => {
  console.log(Date() + ": /bajaInscripcionExamen");
  var aPartir = new Date();
  const DATE_FORMATER = require( 'dateformat' );
  const idInscripcion = req.params.idInscriptosExamen;
  
  try {
    if (!req.params.idInscriptosExamen) {
      res.status(400).send({
        message: "El body no puede estar vacio"
      });
      return;
  }
    const coneccionDB = mysql.createConnection(connectionString);
    coneccionDB.connect(function (err) {
        if (err) throw err;
        var enFechaBaja = 'SELECT count(*) as eliminable FROM inscripciones.alumnosexamenfinal ' +
        'inner join examenes on alumnosexamenfinal.ExamenesidExamenes = examenes.idExamenes ' +
        'where idInscriptosExamen= '+idInscripcion + ' and examenes.inicioInscripcion <= "'+ DATE_FORMATER( aPartir, "yyyy-mm-dd" ) + '" and examenes.finInscripcion >= "'+ DATE_FORMATER( aPartir, "yyyy-mm-dd" ) + '" ;'
        coneccionDB.query(enFechaBaja, function (err, rows, fields){
            console.log(rows[0].eliminable);
            if (rows[0].eliminable > 0){  //SI ES MAYOR QUE 0 HAY UNA INSCRIPCION Y ESTA EN FECHA DE PODER DAR DE BAJA
              var queryDelete = 'DELETE FROM ' + database + '.`alumnosexamenfinal` WHERE ' + database + '.alumnosexamenfinal.idInscriptosExamen = ' + idInscripcion + ';';
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

exports.enviarNotificacionExamen= (req, res) => {
  console.log(Date() + ": /enviarNotificacionExamen");
  try {
    
    var aPartir = req.body.aPartir
    if (!req.body.aPartir) {
      res.status(400).send({
        message: "Falta fecha de inicio"
      });
      return;
    }

    const DATE_FORMATER = require( 'dateformat' );

    const coneccionDB = mysql.createConnection(connectionString);
    //console.log("a partir: " + aPartir);
    coneccionDB.connect(function (err) {
      if (err) throw err;
      var q = 'select JSON_UNQUOTE(alumnosexamenfinal.datosAlumno->"$.nombre") as nombreAlumno, JSON_UNQUOTE(alumnosexamenfinal.datosAlumno->"$.apellido") as apellidoAlumno, JSON_UNQUOTE(alumnosexamenfinal.datosAlumno->"$.email") as email, materias.nombre as nombreMateria, fecha as FechaExamen , horarioInicio as horarioExamen ' +    
      ' from examenes inner join inscripciones.alumnosexamenfinal on idExamenes = ExamenesidExamenes inner join materias on examenes.MateriasIdMaterias = materias.idMaterias ' + 
      'where fecha >=' + aPartir + ' and recordatorio = 1 and  JSON_UNQUOTE(alumnosexamenfinal.datosAlumno->"$.email") is not null;'  
      console.log("query: ", q);
      coneccionDB.query(q,  function (err, rows, fields) {
          if (err) throw err;
          if (rows.length) {
            //console.log('email address is', rows);
            rows.forEach(function(row) {
              //console.log('email address is', row.email);
              //console.log('key is', api_key_smtp);
              //console.log('doain address is', dominio_smtp);                    
              const auth = {
                auth: {
                  api_key: api_key_smtp,
                  domain: dominio_smtp
                },
              }
               
              const nodemailerMailgun = nodemailer.createTransport(mg(auth));
               
              nodemailerMailgun.sendMail({
                from: 'info@unla.com.ar',
                to: row.email, // An array if you have multiple recipients.
                
                subject: 'Proximo examen final',

                html: '<b>Estimado alumno: ' +  row.apellidoAlumno + ' '+  row.nombreAlumno + '</b>' + '<br><br>Registra una inscripcion para final de la materia ' 
                    + row.nombreMateria + ' el dia '+ DATE_FORMATER( row.FechaExamen, "dd-mm-yyyy" ) + ' a las' + row.horarioExamen

              }, (err, info) => {
                if (err) {
                  console.log(`Error: ${err}`);
                }
                else {
                  console.log(`Response: ${info}`);
                }
              });

            });
          } else {
            console.log('There were no results.');
          }
          coneccionDB.destroy();
          res.status(200);
          return res.send(rows)
        });
    });
    }
    catch (e) {
      console.error(e)
      res.status(500)
      res.send(e)
    }
  }

  exports.traerInscripcionesEstudianteExamen= (req, res) => {
    console.log(Date() + ": /traerInscripcionesEstudianteExamen");
    /*Consulta de materias/exámenes disponibles para inscripción, los listados deben
  mostrar los días, horarios y docentes asignados*/
  const idEstudiante = req.params.idEstudiante; 
  
    
  var aPartir = new Date();
  const DATE_FORMATER = require( 'dateformat' );
  
  try {
    if (!req.params.idEstudiante) {
      res.status(400).send({
        message: "El idEstudiante no puede estar vacio"
      });
      return;
  }
    const coneccionDB = mysql.createConnection(connectionString);
    coneccionDB.connect(function (err) {
      if (err) throw err;
    /*
	SELECT idInscriptosExamen, materias.idMaterias, nombre, examenes.inicioInscripcion, examenes.finInscripcion
  FROM alumnosexamenfinal inner join examenes on examenes.idExamenes = alumnosexamenfinal.ExamenesidExamenes 
  inner join materias on examenes.MateriasIdMaterias = materias.idMaterias
where  examenes.finInscripcion < NOW() and JSON_UNQUOTE(datosAlumno->"$.id") = 1;*/
  var query = 'select ' + database + '.alumnosexamenfinal.idInscriptosExamen,' + database + '.materias.idMaterias, ' 
                  + database + '.materias.nombre , ' + database + '.examenes.inicioInscripcion, '
                  + database + '.examenes.finInscripcion FROM ' + database + '.alumnosexamenfinal ' 
                  + 'inner join examenes on ' + database + '.examenes.idExamenes = ' + database + '.alumnosexamenfinal.ExamenesidExamenes ' 
                  + 'inner join materias on ' + database + '.examenes.MateriasIdMaterias = ' + database + '.materias.idMaterias ' 
                  +' where  examenes.finInscripcion >= "'+ DATE_FORMATER( aPartir, "yyyy-mm-dd" ) + '" and JSON_UNQUOTE(' + database + '.alumnosexamenfinal.datosAlumno->"$.id") = '+ idEstudiante + ';';      
  
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


