'use strict';
/*
 'use strict' is not required but helpful for turning syntactical errors into true errors in the program flow
 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
*/

var util = require('util');
var mysql = require('mysql');
var http = require('http');

const datasource = process.env.DATASOURCE || 'DSN=test2';

module.exports = {
  alta: (req, res) => {
    console.log( Date() + ": /alta" );  
    try {
        var con = mysql.createConnection({
          host: "mysql://kv4l0861ryo46pmj:jz5iyomcy0gw8fo5@durvbryvdw2sjcm5.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/zubjgw8k5txg3o9x",
          database : 'zubjgw8k5txg3o9x',
          user: "kv4l0861ryo46pmj",
          password: "jz5iyomcy0gw8fo5",
          insecureAuth : true
        });
        con.connect(function(err) {
          if (err) throw err;
          console.log("Connected!");
          con.query('INSERT INTO `estudiante`.`estudiante` (`nombre`,`apellido`,`dni`,`mail`) VALUES ("nombre","apellido","32222222","mail@mail.com");'
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
  },
  baja: (req, res) => {
    console.log( Date() + ": /baja" );  
    try {
      var con = mysql.createConnection({
        host: "localhost",
        database : 'estudiante',
        user: "root",
        password: "password",
        insecureAuth : true
      });
      con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        con.query('DELETE FROM `estudiante`.`estudiante` WHERE idEstudiante=4;'
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
},
  modificar: (req, res) => {
    console.log( Date() + ": /modificar" );  
    try {
      var con = mysql.createConnection({
        host: "localhost",
        database : 'estudiante',
        user: "root",
        password: "password",
        insecureAuth : true
      });
      con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        con.query('UPDATE `estudiante`.`estudiante` SET `nombre` = "nombrediferente", `apellido` = "apediferente", `dni` = "123456",`mail` = "otromail@mail.com" WHERE `idEstudiante` = 4;'
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
  },
  traerAnalitico: (req, res) => {
    console.log( Date() + ": /traerAnalitico" );  
     try {
        var con = mysql.createConnection({
          host: "mysql://kv4l0861ryo46pmj:jz5iyomcy0gw8fo5@durvbryvdw2sjcm5.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/zubjgw8k5txg3o9x",
          database : 'zubjgw8k5txg3o9x',
          user: "kv4l0861ryo46pmj",
          password: "jz5iyomcy0gw8fo5",
          insecureAuth : true
        });
      con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        con.query('select * from examenes WHERE `idEstudiante` = 4 and rendido=1;' //HAY Q TRAER ID ESTUDIANTE DE PARAMETRO
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
  },
  traerEstudiante: (req, res) => {
    console.log( Date() + ": /traerEstudiante" );  
     try {
        var con = mysql.createConnection({
          host: "durvbryvdw2sjcm5.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
          database : 'zubjgw8k5txg3o9x',
          user: "kv4l0861ryo46pmj",
          password: "jz5iyomcy0gw8fo5",
          insecureAuth : true
        });
      con.connect(function(err) {
        if (err) throw err;
        console.log("Connected a web!");
        con.query('select * from estudiantes;' //HAY Q TRAER ID ESTUDIANTE DE PARAMETRO
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
  },
  inscribirEstudianteCursada: (req, res) => {
    console.log( Date() + ": /inscribirEstudianteCursada" );  
     try {
        var con = mysql.createConnection({
          host: "localhost",
          database : 'inscripciones',
          user: "root",
          password: "password",
          insecureAuth : true
        });
        var request = require('request');
        request('https://administrador-unla.herokuapp.com/api/estudiantes/1', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body) // Print the google web page.
                var responseJson = JSON.stringify(body);
                con.connect(function(err) {
                  if (err) throw err;
                  console.log("Connected a web!");
                  con.query('INSERT INTO `inscripciones`.`alumnoscursada`(`datosAlumno`,`Materias_idMaterias`,`Materias_Carreras_idCarreras`)' +
                  'VALUES('+ responseJson +',1,1);' //HAY Q TRAER ID ESTUDIANTE DE PARAMETRO
                  , function (err, result) {        
                      if (err) throw err;
                      console.log("Result: " + result);
                      return res.send(result)
                  });
                });
             }
             else{
              console.log("error") // Print the google web page.
             }
        })
       
  }
  catch (e) {
      console.error( e )
      res.status( 500 )
      res.send( e )
    }
  }
};
