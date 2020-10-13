'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.Sequelize);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;


//db.carreras.hasMany(db.materias, { as: "materias" });
//Asociaciones para materia
db.materias.belongsTo(db.carreras, {
  foreignKey: "CarrerasIdCarreras",
  as: "carreras",
});
db.materias.belongsTo(db.plan, {
  foreignKey: "planIdPlan",
  as: "plan",
});
db.materias.belongsTo(db.formaaprobacion, {
  foreignKey: "formaAprobacionIdformaAprobacion",
  as: "formaaprobacion",
});
//Asociaciones para examen
db.examenes.belongsTo(db.materias, {
  foreignKey: "MateriasIdMaterias",
  as: "materias",
});
/*
db.materias.hasMany(db.alumnoscursada, {
  foreignKey: "materiasIdMaterias",
  as: "materia",
});
db.carreras.hasMany(db.alumnoscursada, {
  foreignKey: "CarrerasIdCarreras",
  as: "carrera",
});

//db.carreras.hasMany(db.materias, { as: "materias" });
db.carreras.hasMany(db.materias, {
  foreignKey: "CarrerasIdCarreras",
  as: "carreras",
});
db.carreras.hasMany(db.materias, {
  foreignKey: "planIdPlan",
  as: "plan",
});
db.carreras.hasMany(db.materias, {
  foreignKey: "formaAprobacionIdformaAprobacion",
  as: "formaaprobacion",
});*/

module.exports = db;
