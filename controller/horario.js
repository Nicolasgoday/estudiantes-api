const db = require("../models");
const Horario = db.horario;
const Op = db.Sequelize.Op;
/**
 * Columns:
idHorario int AI PK 
dia varchar(10) 
horarioInicio time 
horarioFin time 
Curso_idCurso int PK 
createdAt datetime 
updatedAt datetime

/ */
exports.create = (req, res) => {
    /* Validate request*/
    if (!req.body.dia) {
        res.status(400).send({
          message: "El body no puede estar vacio"
        });
        return;
      }
    
      // Create a horario
      const horario = {
        dia: req.body.dia,    
        horarioInicio: req.body.horarioInicio,
        horarioFin: req.body.horarioFin,
        Curso_idCurso: req.body.Curso_idCurso,
        createdAt: new Date(),
        updatedAt: new Date()
      };
    
      // Save horario in the database
      Horario.create(horario)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the horario."
          });
        });
};

// Retrieve all horarios from the database. // TRAE TODOS LOS HORARIOS DEL CURSO
exports.findAll = (req, res) => {
  const idHorario = req.query.idHorario;
  var condition = idHorario ? { idHorario: { [Op.like]: `%${idHorario}%` } } : null;

  Horario.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "No se pudo encontrar Horario con ese nombre."
      });
    });  
};

// Find a single Horario with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Horario.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "No se encontro horario con el id=" + id
      });
    });
};

// Update a Horario by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Horario.update(req.body, {
    where: { idHorario: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Horario actualizado con exito."
        });
      } else {
        res.send({
          message: `No se pudo actualizar horario con id=${id}.!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });  
};

// Delete a Horario with the specified id in the reques
exports.delete = (req, res) => {
  const id = req.params.id;

  Horario.destroy({
    where: { idHorario: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Horario eliminada exitosamente!"
        });
      } else {
        res.send({
          message: `No se pudo eliminar Horario con id=${id}.!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "No se pudo eliminar Horario con id=" + id
      });
    });  
};

// Delete all Materia from the database.
exports.deleteAll = (req, res) => {
  Horario.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Horario eliminadas exitosamente!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Horario eliminadas exitosamente."
      });
    });
};

