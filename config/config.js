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
  },
  "autentificacion": {
    "base64-secret": 'YmY5ZmJkZWM0MjA2YTY5YTE4YzgzZjFlMzZmNTIzYmJjNzBmZDdkNjJlMGRhOGE2MjZiZTYxZjFlMDFhMzc2Y2E3NDUyNjkyNDM5MTQ2MGQ2ZTNlMjJlZTUwMzgyNzA2MWE2Yjg5OTgyOGQ2NjNhZWU0ZTkxYjdjOTg4ZWI2ZWQ='
  }


}
