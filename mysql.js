
var mysql = require('mysql2');
var fs = require('fs');
var readline = require('readline');

const connectionString = {host: '18.213.84.48',
                          database: process.env['NODE_ESTUDIANTE_DB'],
                          user: process.env['NODE_ESTUDIANTE_USER'],
                          password: process.env['NODE_ESTUDIANTE_PASSWORD'],
                          insecureAuth : true
                          };

const coneccionDB = mysql.createConnection(connectionString);
/*
var rl = readline.createInterface({
  input: fs.createReadStream('C:/Users/usuario/Documents/dumps/test.sql'),
  terminal: false
 });
rl.on('line', function(chunk){
  coneccionDB.query(chunk.toString('ascii'), function(err, sets, fields){
     if(err) console.log(err);
    });
});
rl.on('close', function(){
  console.log("finished");
  coneccionDB.end();
});
// hostname: 'mysql://lqo0ahe9urejc5cw:yznskdvuv9lj45on@sm9j2j5q6c8bpgyq.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/pod3i2eblsvv0rz1'

*/

var host = '18.213.84.48';
var  database = process.env['NODE_ESTUDIANTE_DB'];
var user = process.env['NODE_ESTUDIANTE_USER'];
var password = process.env['NODE_ESTUDIANTE_PASSWORD'];

const mysql_import = require('mysql-import');
const Importer = require('C:/Users/usuario/Facultad/estudiantes-api1/node_modules/mysql-import/mysql-import.js');
const importer = new Importer({host, user, password, database});

importer.import('C:/Users/usuario/Documents/dumps/crear.sql').then(()=>{
  var files_imported = importer.getImported();
  console.log('${files_imported.length} SQL file(s) imported.');
}).catch(err=>{
  console.error(err);
});