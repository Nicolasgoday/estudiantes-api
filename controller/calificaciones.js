const soap = require('soap');
const url = process.env['SERVER_WS_DOCENTES'];
const isEmpty = require('is-empty');


exports.traerMaterias = (req, res) => {
    console.log('/traerMaterias');
      var result='';
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
              const lstMateriasAlumnos =result.return;
              lstMateriasAlumnos.forEach(materias => { 
                materias.datosAlumno=JSON.parse(materias.datosAlumno); 
              }); 
              res.send(lstMateriasAlumnos);

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

exports.traerAlumnosPorMateriaExamen = (req, res) => {
  console.log('/traerAlumnosPorMateriaExamen');
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
      client.traerAlumnosPorMateriaExamen(args, function(err, result) {

        if (isEmpty(result)) {
            res.status(400).send({
              message: "No se encontraron alumnos"
            });
            return;
         }else{
            console.log(result.return);                       
            const lstMateriasAlumnos =result.return;
            lstMateriasAlumnos.forEach(materias => { 
              materias.datosAlumno=JSON.parse(materias.datosAlumno); 
            }); 
            res.send(lstMateriasAlumnos);

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

