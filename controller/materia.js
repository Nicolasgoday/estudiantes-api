const db = require("../models");
const Materia = db.materias;
const Op = db.Sequelize.Op;
/**
 * Columns:
idMaterias int PK 
nombre varchar(45) 
inicioInscripcion date 
finInscripcion date 
Carreras_idCarreras int PK 
createdAt datetime 
updatedAt

/ */
exports.create = (req, res) => {
    /* Validate request*/
    if (!req.body.nombre) {
        res.status(400).send({
          message: "El body no puede estar vacio"
        });
        return;
      }
    
      // Create a Materia
      const materia = {
        nombre: req.body.nombre,    
        inicioInscripcion: req.body.inicioInscripcion,
        finInscripcion: req.body.finInscripcion,
        CarrerasIdCarreras: req.body.CarrerasIdCarreras,
        createdAt: new Date(),
        updatedAt: new Date(),
        planIdPlan: req.body.planIdPlan,
        formaAprobacionIdformaAprobacion: req.body.formaAprobacionIdformaAprobacion
      };
    
      // Save Materia in the database
      Materia.create(materia)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Materia."
          });
        });
};

// Retrieve all Materias from the database.
exports.findAll = (req, res) => {
  const nombre = req.query.nombre;
  var condition = nombre ? { nombre: { [Op.like]: `%${nombre}%` } } : null;

  Materia.findAll({  include: ["carreras", "plan", "formaaprobacion"], where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "No se pudo encontrar Materia con ese nombre."
      });
    });  
};

// Find a single Materia with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Materia.findByPk(id,{ include: ["carreras", "plan", "formaaprobacion"]})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "No se encontro Materia con el id=" + id
      });
    });
};

// Update a Materia by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Materia.update(req.body, {
    where: { idMaterias: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Materia actualizado con exito."
        });
      } else {
        res.send({
          message: `No se pudo actualizar Materia con id=${id}.!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating materia with id=" + id
      });
    });  
};

// Delete a Materia with the specified id in the reques
exports.delete = (req, res) => {
  const id = req.params.id;
  truncate: false

  Materia.destroy({
    where: { idMaterias: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Materia eliminada exitosamente!"
        });
      } else {
        res.send({
          message: `No se pudo eliminar Materia con id=${id}.!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err +"No se pudo eliminar Materia con id=" + id
      });
    });  
};

// Delete all Materia from the database.
exports.deleteAll = (req, res) => {
  Materia.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Materia eliminadas exitosamente!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Materia eliminadas exitosamente."
      });
    });
};

