const db = require("../models");
const Formaprobacion = db.formaaprobacion;
const Op = db.Sequelize.Op;
/*
descripcion varchar(45) 
createdAt datetime 
updatedAt datetime
*/
exports.create = (req, res) => {
    /* Validate request*/
    if (!req.body.descripcion) {
        res.status(400).send({
          message: "Faltan datos"
        });
        return;
      }
    
      // Create a formaprobacion
      const formaprobacion = {
        descripcion: req.body.descripcion,    
        createdAt: new Date(),
        updatedAt: new Date()
      };
    
      // Save Formaprobacion in the database
      Formaprobacion.create(formaprobacion)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Formaprobacion."
          });
        });
};

// Retrieve all Formaprobacion from the database. // TRAE TODOS LOS Formaprobacion DEL CURSO
exports.findAll = (req, res) => {
  const idFormaAprobacion= req.query.idFormaAprobacion;
  var condition = idFormaAprobacion ? { idFormaAprobacion: { [Op.like]: `%${idFormaAprobacion}%` } } : null;

  Formaprobacion.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "No se pudo encontrar formaprobacion con ese nombre."
      });
    });  
};

// Find a single Formaprobacion with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Formaprobacion.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "No se encontro Formaprobacion con el id=" + id
      });
    });
};

// Update a Formaprobacion by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Formaprobacion.update(req.body, {
    where: { idFormaAprobacion: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Formaprobacion actualizado con exito."
        });
      } else {
        res.send({
          message: `No se pudo actualizar Formaprobacion con id=${id}.!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Formaprobacion with id=" + id
      });
    });  
};

// Delete a Formaprobacion with the specified id in the reques
exports.delete = (req, res) => {
  const id = req.params.id;

  Formaprobacion.destroy({
    where: { idFormaAprobacion: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Formaprobacion eliminada exitosamente!"
        });
      } else {
        res.send({
          message: `No se pudo eliminar Formaprobacion con id=${id}.!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "No se pudo eliminar Formaprobacion con id=" + id
      });
    });  
};

// Delete all Materia from the database.
exports.deleteAll = (req, res) => {
  Formaprobacion.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Formaprobacion eliminadas exitosamente!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Formaprobacion eliminadas exitosamente."
      });
    });
};

