

const mysql_import = require('mysql-import');
const Importer = require('./node_modules/mysql-import/mysql-import.js');
const host = process.env['NODE_ESTUDIANTE_HOST'];
const database = process.env['NODE_ESTUDIANTE_DB'];
const user = process.env['NODE_ESTUDIANTE_USER'];
const password = process.env['NODE_ESTUDIANTE_PASSWORD'];
const port ="3306";
const importer =  new Importer({host,port, user, password, database});


importer.import('crear.sql').then(()=>{
  var files_imported = importer.getImported();
  console.log('${files_imported.length} SQL file(s) imported.');
}).catch(err=>{
  console.error(err);
});