'use strict';
/*
 'use strict' is not required but helpful for turning syntactical errors into true errors in the program flow
 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
*/

var util = require('util');
var mysql = require('mysql');

const datasource = process.env.DATASOURCE || 'DSN=test2';

module.exports = {
  alta: (req, res) => {
    console.log( Date() + ": /alta" );  
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
        host: "localhost",
        database : 'estudiante',
        user: "root",
        password: "password",
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
  }
};
