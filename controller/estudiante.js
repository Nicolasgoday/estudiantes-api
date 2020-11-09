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
const DATE_FORMATER = require( 'dateformat' );
const fs = require('fs');

const connectionString = { host: host, port: port, user: user, password: password, database: database };


//generar analitico
exports.traerAnalitico= (req, res) => {
    console.log(Date() + ": /traerAnalitico");
    try {
      var idEstudiante = req.params.idEstudiante
      const coneccionDB = mysql.createConnection(connectionString);
      coneccionDB.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
        coneccionDB.query('SELECT idInscriptosExamen,ExamenesidExamenes,datosAlumno,nota,asistencia,recordatorio,materias.nombre   FROM alumnosexamenfinal inner join examenes on examenes.idExamenes=ExamenesidExamenes inner join materias on materias.idMaterias=examenes.MateriasIdMaterias where alumnosexamenfinal.asistencia=1 and  JSON_UNQUOTE( alumnosexamenfinal.datosAlumno->"$.id") = ' + idEstudiante + ';'
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

//crear analitico en formato pdf  
exports.crearAnaliticoPDF= (req, res) => {
    console.log(Date() + ": /crearAnaliticoPDF");
    try {
      var request = require('request'); 
      var idEstudiante = req.params.idEstudiante
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
        console.log(response.statusCode + "ERRROR  "+error);
        if (!error && response.statusCode == 200) { 
          console.log(body) // Print the google web page.
          var responseJson = JSON.parse(body);
          
          const query = 'SELECT ' + database + '.materias.nombre, ' + database + '.examenes.fecha, ' + database + '.alumnosexamenfinal.nota, "formaAprobacion" as formaAprobacion, "Acta"  as acta, "plan" as plan FROM ' + database + '.alumnosexamenfinal ' +        
          'inner join ' + database + '.examenes on ' + database + '.alumnosexamenfinal.ExamenesidExamenes = ' + database + '.examenes.idExamenes ' +
          'inner join ' + database + '.materias on ' + database + '.examenes.MateriasIdMaterias = ' + database + '.materias.idMaterias ' +
           'where ' + database + '.alumnosexamenfinal.asistencia=1 and JSON_UNQUOTE(' + database + '.alumnosexamenfinal.datosAlumno->"$.id") = '+ idEstudiante + ';' ;
          coneccionDB.connect(function (err) {
            if (err){
             res.status(500).send({
                message: "ERROR AL CONECTAR"
              });
            }
            console.log("Connected!");
            coneccionDB.query(query, function (err, rows, fields){
                if (err) throw err;                 
                    const pdf = require('html-pdf');
                    var content = `<h2>Certificado analitico </h2>` +  '</p><h3>Alumno: ' + responseJson.nombre +' '+ responseJson.apellido + '</h3></p>';          
                      content = content + '<table class="egt" width=500  text-align="left"><tr style="text-align:left"><th>Materia</th><th>Fecha</th><th>Nota</th><th>Forma aprob.</th><th>Acta</th><th>Plan</th></tr>'

                      if (rows.length) {               
                        rows.forEach(function(row) {
                            content = content + '<tr text-align="left" style ="font-family:Times New Roman"><td WIDTH="200"><FONT FACE="courier new" size=1>' + row.nombre + '</FONT>' +
                                                                                                          '</td><td WIDTH="100" ><FONT FACE="courier new" size=1>'+ DATE_FORMATER( row.fecha, "dd-mm-yyyy" ) + '</FONT>' +
                                                                                                          '</td><td WIDTH="50"><FONT FACE="courier new" size=1>' + row.nota + '</FONT>' +
                                                                                                          '</td><td WIDTH="50"><FONT FACE="courier new" size=1>'+ row.formaAprobacion + '</FONT>' +
                                                                                                          '</td><td WIDTH="50"><FONT FACE="courier new" size=1>'+ row.acta + '</FONT>' +
                                                                                                          '</td><td WIDTH="50"><FONT FACE="courier new" size=1>'+ row.plan +'</FONT></td></tr>'
                        });
                      }
                      content = content + '</table>';

                      pdf.create(content).toFile(__dirname +'./images/' + responseJson.nombre + responseJson.apellido + '.pdf', function (err, res) {                                                                          
                          if (err) {
                            throw err;
                          } else {
                            console.log("ok");
                          }
                        });   
                      });
                      coneccionDB.destroy();
                      res.status(200);
                      res.sendFile(__dirname + '/images/' + responseJson.nombre + responseJson.apellido + '.pdf');                     
          });
        }
        else if (response.statusCode != 200){
          res.status(response.statusCode);
          res.send(response.statusCode);
        }
      });
    }
    catch (e) {
      console.error(e)
      res.status(500)
      res.send(e)
    }        
}

//Modificar datos de matricula?

exports.modificarDatosContactoEstudiante= (req, res) => {
    //Modificar datos de matricula o login? de login ya existe
    ///FALTA DEFINIR COMO MANDAR LOS DATOS A LA API DE UDPATE ESTUDIANTE 
    console.log(Date() + ": /modificarDatosContactoEstudiante");
    try {

      var idEstudiante = req.body.idEstudiante;
      var domicilio = req.body.domicilio;
      var email = req.body.email;
      var telefono = req.body.telefono;

      const coneccionDB = mysql.createConnection(connectionString);

      var request = require('request');
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
};

//llama al procedimiento remoto del servicio de administrador para traer el Estudiante
exports.traerEstudiante= (req, res) => {
    console.log( Date() + ": /traerEstudiante" );  
     try {
      const coneccionDB = mysql.createConnection(connectionString);
      con.connect(function(err) {
        if (err) throw err;
        console.log("Connected a web!");
        coneccionDB.query('select * from estudiantes where ;' //HAY Q TRAER ID ESTUDIANTE DE PARAMETRO
        , function (err, result) {        
          if (err) throw err;
          console.log("Result: " + result);
          coneccionDB.destroy();
          res.status(200);
          return res.send(result)
        });
      });
  }
  catch (e) {
      console.error( e )
      res.status( 500 )
      res.send( e )
    }
  };