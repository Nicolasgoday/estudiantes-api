const db = require("../models");
const Carrera = db.carreras;
const Op = db.Sequelize.Op;

// Create and Save a new Carrera
exports.create = (req, res) => {
    /* Validate request*/
    if (!req.body) {
        res.status(400).send({
          message: "El body no puede estar vacio"
        });
        return;
      }
    
      // Create a Carrera
      const carrera = {
        nombre: req.body.nombre,
        departamento: req.body.departamento,
        createdAt: new Date(),
        updatedAt: new Date()
      };
    
      // Save Carrera in the database
      Carrera.create(carrera)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Carrera."
          });
        });
};

// Retrieve all Carreras from the database.
exports.findAll = (req, res) => {
  const nombre = req.query.nombre;
  var condition = nombre ? { nombre: { [Op.like]: `%${nombre}%` } } : null;

  Carrera.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "No se pudo encontrar carrera con ese nombre."
      });
    });  
};

// Find a single Carrera with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Carrera.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "No se encontro carrera con el id=" + id
      });
    });
};

// Update a Carrera by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Carrera.update(req.body, {
    where: { idCarreras: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Carrera actualizado con exito."
        });
      } else {
        res.send({
          message: `No se pudo actualizar carrera con id=${id}.!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });  
};

// Delete a Carrera with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Carrera.destroy({
    where: { idCarreras: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Carrera eliminada exitosamente!"
        });
      } else {
        res.send({
          message: `No se pudo actualizar carrera con id=${id}.!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "No se pudo actualizar carrera con id=" + id
      });
    });  
};

// Delete all Carreras from the database.
exports.deleteAll = (req, res) => {
  Carrera.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Carreras eliminadas exitosamente!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Carreras eliminadas exitosamente."
      });
    });
};

