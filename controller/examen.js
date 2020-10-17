const db = require("../models");
const Examen = db.examenes;
const Op = db.Sequelize.Op;
/**
 * Columns:
-- idExamenes int AI PK 
fecha date 
horarioInicio time 
horarioFin time 
docenteAsignado json 
inicioInscripcion date 
finInscripcion varchar(45) 
Materias_idMaterias int PK 
Materias_Carreras_idCarreras int PK 
createdAt datetime 
updatedAt datetime

/ */
exports.create = (req, res) => {
    /* Validate request*/
    if (!req.body.fecha) {
        res.status(400).send({
          message: "El body no puede estar vacio"
        });
        return;
      }
    
      // Create a Examen
      const examen = {
        fecha: req.body.fecha,    
        horarioInicio: req.body.horarioInicio,
        horarioFin: req.body.horarioFin,
        docenteAsignado: req.body.docenteAsignado,
        inicioInscripcion: req.body.inicioInscripcion,
        finInscripcion: req.body.finInscripcion,
        MateriasIdMaterias : req.body.MateriasIdMaterias,
        acta: req.body.acta,
        createdAt: new Date(),
        updatedAt: new Date()
      };
    
      // Save examen in the database
      Examen.create(examen)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the examen."
          });
        });
};

// Retrieve all examen from the database.
exports.findAll = (req, res) => {
  const fecha = req.query.fecha;
  var condition = fecha ? { fecha: { [Op.like]: `%${fecha}%` } } : null;

  Examen.findAll({  include: ["materias"] , where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "No se pudo encontrar examen con ese fecha."
      });
    });  
};

// Find a single examen with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Examen.findByPk(id, { include: ["materias"] })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "No se encontro examen con el id=" + id
      });
    });
};

// Update a examen by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Examen.update(req.body, {
    where: { idExamenes: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Examen actualizado con exito."
        });
      } else {
        res.send({
          message: `No se pudo actualizar examen con id=${id}.!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err + " Error updating Examen with id=" + id
      });
    });  
};

// Delete a examen with the specified id in the reques
exports.delete = (req, res) => {
  const id = req.params.id;

  Examen.destroy({
    where: { idExamenes: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Examen eliminada exitosamente!"
        });
      } else {
        res.send({
          message: `(num dif 1)No se pudo eliminar Examen con id=${id}.!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "ERROR; No se pudo eliminar Examen con id=" + id
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

