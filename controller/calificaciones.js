const soap = require('soap');
const url = 'https://docentes-soap-api.herokuapp.com/docentesSoap?wsdl';


exports.traerMaterias = (req, res) => {

      var args = {arg0: 31};
      var result='';
      soap.createClient(url, function(err, client) {
          client.traerMaterias(args, function(err, result) {
              console.log(result);
              res.send(result);
          });
      }); 

     
};

