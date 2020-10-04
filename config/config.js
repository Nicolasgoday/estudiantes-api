module.exports ={
  "development": {
    "username": "plataforma",
    "password": "plataforma",
    "database": "inscripciones",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username":  process.env.NODE_ESTUDIANTE_USER,
    "password": process.env.NODE_ESTUDIANTE_PASSWORD,
    "database": process.env.NODE_ESTUDIANTE_DB,
    "host": process.env.NODE_ESTUDIANTE_HOST,
    "dialect": "mysql"
  }
}
