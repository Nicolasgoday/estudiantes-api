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

//generar analitico
exports.traerAnalitico= (req, res) => {
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
  };

//crear analitico en formato pdf  
exports.crearAnaliticoPDF= (req, res) => {
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
  };
  

//Modificar datos de matricula?

exports.modificarDatosContactoEstudiante= (req, res) => {
    //Modificar datos de matricula o login? de login ya existe
    ///FALTA DEFINIR COMO MANDAR LOS DATOS A LA API DE UDPATE ESTUDIANTE 
    console.log(Date() + ": /modificarDatosContactoEstudiante");
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