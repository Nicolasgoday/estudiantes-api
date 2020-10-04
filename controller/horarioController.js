const { TIME } = require("sequelize/types");
const db = require("../models");
const Horario = db.horario;
const Op = db.Sequelize.Op;

// Create and Save a new Carrera
exports.create = (req, res) => {
  const horario = {
      dia: "Lunes",
      HorarioInicio: new TIME(),
      HorarioFin: new TIME(),
      cursoId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
  };

  Horario.create(horario)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error al crear carrera."
    });
  });
};

// Retrieve all Carreras from the database.
exports.findAll = (req, res) => {
  const nombre = req.query.nombre;
  var condition = cursoId ? { cursoId: { [Op.eq]: `%${cursoId}%` } } : null;

  Carrera.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "No se pudo encontrar horarios para ese curso."
      });
    });  
};

// Find a single Carrera with an id
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

// Update a Carrera by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Horario.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Horario actualizado con exito."
        });
      } else {
        res.send({
          message: `No se pudo actualizar Horario con id=${id}.!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error actualizando Horario with id=" + id
      });
    });  
};

// Delete a Carrera with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Horario.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Horario eliminada exitosamente!"
        });
      } else {
        res.send({
          message: `No se pudo actualizar Horario con id=${id}.!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "No se pudo actualizar Horario con id=" + id
      });
    });  
};

// Delete all Carreras from the database.
exports.deleteAll = (req, res) => {
  Horario.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Horarios eliminados exitosamente!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Horarios eliminados exitosamente."
      });
    });
};

