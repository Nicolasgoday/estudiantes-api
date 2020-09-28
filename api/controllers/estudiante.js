'use strict';
/*
 'use strict' is not required but helpful for turning syntactical errors into true errors in the program flow
 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
*/

var util = require('util');
var mysql = require('mysql');
var http = require('http');
const connectionString = {host: "localhost",
                          database : 'inscripciones',
                          user: "root",
                          password: "password",
                          insecureAuth : true
                          };

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
        var idEstudiante = req.query.idEstudiante
        const coneccionDB = mysql.createConnection(connectionString);
        coneccionDB.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        coneccionDB.query('SELECT * FROM inscripciones.alumnosexamenfinal where asistencia=1 and  JSON_UNQUOTE(inscripciones.alumnosexamenfinal.datosAlumno->"$.id") = ' +  idEstudiante + ';' //HAY Q TRAER ID ESTUDIANTE DE PARAMETRO
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
  },
  inscribirEstudianteCursada: (req, res) => {
    console.log( Date() + ": /inscribirEstudianteCursada" );  
     try {
        const coneccionDB = mysql.createConnection(connectionString);
        var request = require('request');
        request('https://administrador-unla.herokuapp.com/api/estudiantes/1', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body) // Print the google web page.
                var responseJson = JSON.stringify(body);
                coneccionDB.connect(function(err) {
                  if (err) throw err;
                  console.log("Connected a web!");
                  coneccionDB.query('INSERT INTO `inscripciones`.`alumnoscursada`(`datosAlumno`,`Materias_idMaterias`,`Materias_Carreras_idCarreras`)' +
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
  },
  traerMateriasParaInscripcion: (req, res) => {
    console.log( Date() + ": /traerMateriasParaInscripcion" );  
     try {
          const coneccionDB = mysql.createConnection(connectionString);
          coneccionDB.connect(function(err) {
          if (err) throw err;
          console.log("Connected a web!");
          coneccionDB.query('select materias.nombre as materia, curso.idCurso as curso, horario.dia , horario.horarioInicio, JSON_UNQUOTE(datosDocente->"$.nombre") as nombreProfesor, JSON_UNQUOTE(datosDocente->"$.apellido") as apellidoProfesor from inscripciones.materias inner join curso on materias.idMaterias = curso.Materias_idMaterias  inner join horario on inscripciones.horario.Curso_idCurso = curso.idCurso;'       
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
  traerExamenesParaInscripcion: (req, res) => {
    /*Consulta de materias/exámenes disponibles para inscripción, los listados deben
    mostrar los días, horarios y docentes asignados*/
    console.log( Date() + ": /traerExamenesParaInscripcion" );  
     try {
        const coneccionDB = mysql.createConnection(connectionString);
        coneccionDB.connect(function(err) {
        if (err) throw err;
        console.log("Connected a web!");
        coneccionDB.query('select materias.nombre as materia, curso.idCurso as curso, examenes.fecha , examenes.horarioInicio, JSON_UNQUOTE(examenes.docenteAsignado->"$.nombre") as nombreProfesor, JSON_UNQUOTE(examenes.docenteAsignado->"$.apellido") as apellidoProfesor from examenes inner join Materias on examenes.Materias_idMaterias = Materias.idMaterias inner join curso on materias.idMaterias = curso.Materias_idMaterias  ;'       
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
bajaInscripcionMateria: (req, res) => {
  console.log( Date() + ": /bajaInscripcionMateria" );  
   try {
      var idInscripcion = req.query.idInscripcion
      const coneccionDB = mysql.createConnection(connectionString);
      coneccionDB.connect(function(err) {
      if (err) throw err;
      coneccionDB.query('DELETE FROM `inscripciones`.`alumnoscursada` WHERE idalumnosCursada = ' + idInscripcion + ';'
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
bajaInscripcionExamen: (req, res) => {
  console.log( Date() + ": /bajaInscripcionExamen" );  
   try {
      var idInscripcion = req.query.idInscripcion
      const coneccionDB = mysql.createConnection(connectionString);
      coneccionDB.connect(function(err) {
      if (err) throw err;
      coneccionDB.query('DELETE FROM `inscripciones`.`alumnosexamenfinal` WHERE idInscriptosExamen = ' + idInscripcion + ';'
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
crearAnaliticoPDF: (req, res) => {
  console.log( Date() + ": /crearAnaliticoPDF" );  
   try {
      var idEstudiante = req.query.idEstudiante
      const coneccionDB = mysql.createConnection(connectionString);
      coneccionDB.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
      coneccionDB.query('SELECT * FROM inscripciones.alumnosexamenfinal where asistencia=1 and  JSON_UNQUOTE(inscripciones.alumnosexamenfinal.datosAlumno->"$.id") = ' +  idEstudiante + ';' //HAY Q TRAER ID ESTUDIANTE DE PARAMETRO
      , function (err, result) {        
        if (err) throw err;
        const pdf = require('html-pdf');
        console.log("Result: " + result);
        const content = `<h1>Título en el PDF creado con el paquete html-pdf</h1><p>Generando un PDF con un HTML sencillo ` + result + '</p>';
        pdf.create(content).toFile('./html-pdf.pdf', function(err, res) {
          if (err){
              console.log(err);
          } else {
              console.log(res);
          }  
        });
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




