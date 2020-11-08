const soap = require('soap');
const url = process.env['SERVER_WS_DOCENTES'];
const isEmpty = require('is-empty');


exports.traerMaterias = (req, res) => {
    console.log('/traerMaterias');
      var result='';
      //var options  = req.headers;
      try {
        if (isEmpty(req.params.id)) {
          res.status(400).send({
            message: "El id no puede estar vacio"
          });
          return;
           }

      var args = {arg0: req.params.id};

      soap.createClient(url, function(err, client) {
          client.traerMaterias(args, function(err, result) {

            if (isEmpty(result)) {
                res.status(400).send({
                  message: "Usted no posee materias"
                });
                return;
             }else{

                console.log(result.return);
                res.send(result.return);

             }            

          });
      }); 

    }
    catch (e) {
      console.error(e)
      res.status(500)
      res.send(e)
     }      
     
};


exports.listadoAlumnosPorMateria = (req, res) => {
    console.log('/listadoAlumnosPorMateria');
    var result='';
    try {
      if (isEmpty(req.body)) {
        res.status(400).send({
          message: "El body no puede estar vacio"
        });
        return;
         }

    var args = {arg0: req.body.idDocente,arg1: req.body.idMateria};    
    soap.createClient(url, function(err, client) {
        client.listadoAlumnosPorMateria(args, function(err, result) {

          if (isEmpty(result)) {
              res.status(400).send({
                message: "No se encontraron alumnos"
              });
              return;
           }else{

              console.log(result.return);
              res.send(result.return);

           }            

        });
    }); 

  }
  catch (e) {
    console.error(e)
    res.status(500)
    res.send(e)
   }      
   
};

exports.listadoAlumnosPorMateriaExamen = (req, res) => {
  console.log('/listadoAlumnosPorMateriaExamen');
  var result='';
  try {
    if (isEmpty(req.body)) {
      res.status(400).send({
        message: "El body no puede estar vacio"
      });
      return;
       }

  var args = {arg0: req.body.idDocente,arg1: req.body.idMateria};    
  soap.createClient(url, function(err, client) {
      client.listadoAlumnosPorMateriaExamen(args, function(err, result) {

        if (isEmpty(result)) {
            res.status(400).send({
              message: "No se encontraron alumnos"
            });
            return;
         }else{

            console.log(result.return);
            res.send(result.return);

         }            

      });
  }); 

}
catch (e) {
  console.error(e)
  res.status(500)
  res.send(e)
 }      
 
};


exports.cargaNotasFinales = (req, res) => {
    console.log('/cargaNotasFinales');
    var result='';
    try {
      if (isEmpty(req.body)) {
        res.status(400).send({
          message: "El body no puede estar vacio"
        });
        return;
         }

    var args = {arg0: req.body.idDocente,
                arg1: req.body.idMateria, 
                arg2:{
                    asistencia:req.body.asistencia,
                    examenesidExamenes:req.body.examenesidExamenes,
                    idInscriptosExamen:req.body.idInscriptosExamen,
                    nota:req.body.nota,
                    recordatorio:req.body.recordatorio
                }};  
    
    
    soap.createClient(url, function(err, client) {
        client.cargaNotasFinales(args, function(err, result) {

          if (isEmpty(result)) {
              res.status(400).send({
                message: "No se pudo completar la operación"
              });
              return;
           }else{

              console.log(result.return);
              res.send(result.return);

           }            

        });
    }); 

  }
  catch (e) {
    console.error(e)
    res.status(500)
    res.send(e)
   }      
   
};


exports.cargaNotasCursada = (req, res) => {
    console.log('/cargaNotasCursada');
    var result='';
    try {
      if (isEmpty(req.body)) {
        res.status(400).send({
          message: "El body no puede estar vacio"
        });
        return;
         }

    var args = {arg0: req.body.idDocente,
                arg1: req.body.idMateria, 
                arg2:{
                    idalumnosCursada:req.body.idalumnosCursada,
                    materiasIdMaterias:req.body.materiasIdMaterias,
                    notaCursada:req.body.notaCursada,
                    recordatorio:req.body.recordatorio
                }};  
    
    
    soap.createClient(url, function(err, client) {
        client.cargaNotasCursada(args, function(err, result) {

          if (isEmpty(result)) {
              res.status(400).send({
                message: "No se pudo completar la operación"
              });
              return;
           }else{

              console.log(result.return);
              res.send(result.return);

           }            

        });
    }); 

  }
  catch (e) {
    console.error(e)
    res.status(500)
    res.send(e)
   }      
   
};



function enviarNotaDe (args, tipoACargar)  {
  console.log("voy a enviar: " ,args , "es de tipo: ", tipoACargar);

  if (tipoACargar == 'cursada'){
      soap.createClient(url, function(err, client) {
          client.cargaNotasCursada(args, function(err, result) {
            console.log( "envio a cursdas", args);
            if (isEmpty(result)) {
                res.status(400).send({
                  message: "No se pudo completar la operación"
                });
                return;
            }else{
              message: "cargado"
            }            

          });
      });
    }
  else if (tipoACargar == 'final') {
      soap.createClient(url, function(err, client) {
        client.cargaNotasFinales(args, function(err, result) {
          console.log( "envio a finales", args);
          if (isEmpty(result)) {
              res.status(400).send({
                message: "No se pudo completar la operación"
              });
              return;
          }else{
            message: "cargado"
          }            

        });
    }); 
  }
}


exports.cargaNotasCursadaDesdeArchivo = (req, res) =>  {
  var multer  = require('multer')();
  const FormData = require('form-data');
  const axios = require('axios');
  const fs = require('fs');
  const xlsx = require('xlsx');
  const json = require('json');

  const fileRecievedFromClient = req.file; //File Object sent in 'fileFieldName' field in multipart/form-data
  console.log(req.file)

  let form = new FormData();
  form.append('fileFieldName', fileRecievedFromClient.buffer, fileRecievedFromClient.originalname);

  
  let workbook = xlsx.read(req.file.buffer, {type:"buffer"});
  console.log(workbook.Strings);
  var sheet_name_list = workbook.SheetNames;
  sheet_name_list.forEach(function(y) {
    var worksheet = workbook.Sheets[y];
    var headers = {};
    var data = [];
    var celdas = 0;
    for(z in worksheet) {        
        if(z[0] === '!') continue;
        //parse out the column, row, and value
        var tt = 0;
        for (var i = 0; i < z.length; i++) {
            if (!isNaN(z[i])) {
                tt = i;
                break;
            }
        };
        var col = z.substring(0,tt);
        var row = parseInt(z.substring(tt));
        var value = worksheet[z].v;
        //console.log(value); // QQQQQQQQ
        //store header names
        if(row == 1 && value) {
          var value = value.replace(/ /g, "");
            headers[col] = value;
            continue;
        }

        if(!data[row]) data[row]={};
        data[row][headers[col]] = value;
     

        
    }
    //drop those first two rows which are empty
    data.shift();
    data.shift();
       
    var args = {
      arg0:  req.param('idDocente'),//arg0: req.body.idDocente,
      arg1:  req.param('idMateria') //arg1: req.body.idMateria, 
      };  
      console.log( "args :", req.param('idDocente'));
      console.log( "args :", req.param('idMateria'));

    var fila=0;  
    while ( fila <= (data.length-1 )){
      /*
      console.log( data[fila].ID ); 
      console.log( data[fila].Alumno); 
      console.log( data[fila].NotaCursada); 
   */     var argN;
          if ( req.param('tipoACargar') == 'cursada') {
              argN =  "{\"arg2" + "\":{\"idalumnosCursada\":"+data[fila].ID+",\"notaCursada\":" +
                              data[fila].NotaCursada+",\"asistencia\":1}}"; 
          }
          else {
            argN =  "{\"arg2" + "\":{\"idInscriptosExamen\":"+data[fila].ID+",\"nota\":" +
                              data[fila].NotaCursada+",\"asistencia\":1}}"; 
          }


          console.log(argN);
          const json = argN;
          const obj = JSON.parse(json);
              
          //POSIBLE console.log(JSON.stringify(args)  + JSON.stringify(arg1));
          //{ idalumnosCursada: 4, materiasIdMaterias: undefined, notaCursada: 3 }

          var under = require('underscore'); // npm install underscore to install        

        var args = under.extend({},args, obj);  
        //console.log( "sumados ", Object.assign(args, obj) ) ;
        //console.log( "targer", args ) ;
        //console.log( "nuevo arg" ) ;
        enviarNotaDe(args, req.param('tipoACargar'))
        fila = ++fila ;
    }        
});

 

  res.send();
  /*
  axios.post('http://server2url/fileUploadToServer2', form, {
          headers: {
              'Content-Type': `multipart/form-data; boundary=${form._boundary}`
          }
      }).then((responseFromServer2) => {
          res.send("SUCCESS")
      }).catch((err) => {
          res.send("ERROR")
      })*/
      
};