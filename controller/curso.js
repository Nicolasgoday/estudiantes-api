const db = require("../models");
const Curso = db.curso;
const Op = db.Sequelize.Op;
/*
idCurso int AI PK 
datosDocente json 
MateriasIdMaterias int PK 
createdAt datetime 
updatedAt
*/
exports.create = (req, res) => {
    /* Validate request*/
    if (!req.body.datosDocente) {
        res.status(400).send({
          message: "Faltan datos"
        });
        return;
      }
    
      // Create a curso
      const curso = {
        datosDocente: req.body.datosDocente,    
        MateriasIdMaterias: req.body.MateriasIdMaterias,
        createdAt: new Date(),
        updatedAt: new Date()
      };
    
      // Save Curso in the database
      Curso.create(curso)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Curso."
          });
        });
};

// Retrieve all Curso from the database. // TRAE TODOS LOS Curso DEL CURSO
exports.findAll = (req, res) => {
  const idCurso= req.query.idCurso;
  var condition = idCurso ? { idHoraridCursoio: { [Op.like]: `%${idCurso}%` } } : null;

  Curso.findAll({  include: ["materia"], where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "No se pudo encontrar curso con ese nombre."
      });
    });  
};

// Find a single Curso with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Curso.findByPk(id, {  include: ["materia"]})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "No se encontro Curso con el id=" + id
      });
    });
};

// Update a Curso by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Curso.update(req.body, {
    where: { idCurso: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Curso actualizado con exito."
        });
      } else {
        res.send({
          message: `No se pudo actualizar Curso con id=${id}.!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Curso with id=" + id
      });
    });  
};

// Delete a Curso with the specified id in the reques
exports.delete = (req, res) => {
  const id = req.params.id;

  Curso.destroy({
    where: { idCurso: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Curso eliminada exitosamente!"
        });
      } else {
        res.send({
          message: `No se pudo eliminar Curso con id=${id}.!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "No se pudo eliminar Curso con id=" + id
      });
    });  
};

// Delete all Materia from the database.
exports.deleteAll = (req, res) => {
  Curso.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Curso eliminadas exitosamente!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Curso eliminadas exitosamente."
      });
    });
};

