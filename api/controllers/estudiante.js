'use strict';
/*
 'use strict' is not required but helpful for turning syntactical errors into true errors in the program flow
 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
*/

var util = require('util');
const odbc = require('odbc');
const datasource = process.env.DATASOURCE || 'DSN=test2';

module.exports = {
  alta: (req, res) => {
    console.log( Date() + ": /alta" );  
    try {
        console.log(JSON.stringify(req.body, null, 0))
        console.log(datasource)
        const cursor = odbc.connect('DSN=test2',(error, cursor)=>{              
          cursor.query('SELECT * FROM estudiante.estudiante',
          (error, result)=>{
            if(error){
              return res.send("<strong>Cliente creado exitosamente!</strong>")
            }else{
              return res.send(result)
            }  
          });
        });
    } catch (e) {
        console.error( e )
        res.status( 500 )
        res.send( e )
    }
  }
};
