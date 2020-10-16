'use strict';

const jwt = require('jwt-simple');
const moment = require('moment');
const { autentificacion } = require('../../config/config');

exports.esRolAdmin = (req, res, next) => {
  
  this.autentificar(req,res,next,"ROLE_ADMIN");
  if (res.status == 200) {
      next();
  }
  return;

};

exports.esRolProfesor = (req, res, next) => {
  
  this.autentificar(req,res,next,"ROLE_PROFESORES");
  if (res.status == 200) {
      next();
  }
  return;

};

exports.esRolEstudiante = (req, res, next) => {
  
  this.autentificar(req,res,next,"ROLE_ESTUDIANTE");
  if (res.status == 200) {
      next();
  }
  return;

};

exports.esRolUser = (req, res, next) => {
  
  this.autentificar(req,res,next,"ROLE_USER");
  if (res.status == 200) {
      next();
  }
  return;

};

exports.esRolAnonymus= (req, res, next) => {
  
  this.autentificar(req,res,next,"ROLE_ANONYMUS");
  if (res.status == 200) {
      next();
  }
  return;

};

exports.autentificar = (req,res,next,role) => {

  if(!req.headers.authorization) {
    return res
      .status(403)
      .send({message: "Tu petición no tiene cabecera de autorización"});
  }
  
  const TOKEN_SECRET =  Buffer.from(autentificacion["base64-secret"]).toString('base64');
 
  var token = req.headers.authorization.split(" ")[1];
  var payload = jwt.decode(token, TOKEN_SECRET, 'HS512');
  
  if(payload.exp <= moment().unix()) {
     return res
        .status(401)
        .send({message: "El token ha expirado"});
  }
  
  req.user = payload.sub;
  console.log(payload);

  if (!(payload.auth).includes(role)) {
    return res
    .status(401)
    .send({message: "ROL NO AUTORIZADO"});
    }
    
    next();
};