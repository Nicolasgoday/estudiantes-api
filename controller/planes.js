const db = require("../models");
const Plan = db.plan;
const Op = db.Sequelize.Op;
/*
idplan int PK 
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
    
      // Create a plan
      const plan = {
        descripcion: req.body.descripcion,   
        createdAt: new Date(),
        updatedAt: new Date()
      };
    
      // Save Plan in the database
      Plan.create(plan)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Plan."
          });
        });
};

// Retrieve all Plan from the database. // TRAE TODOS LOS Plan DEL CURSO
exports.findAll = (req, res) => {
  const idPlan= req.query.idPlan;
  var condition = idPlan ? { idPlan: { [Op.like]: `%${idPlan}%` } } : null;

  Plan.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "No se pudo encontrar plan con ese nombre."
      });
    });  
};

// Find a single Plan with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Plan.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "No se encontro Plan con el id=" + id
      });
    });
};

// Update a Plan by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Plan.update(req.body, {
    where: { idPlan: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Plan actualizado con exito."
        });
      } else {
        res.send({
          message: `No se pudo actualizar Plan con id=${id}.!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Plan with id=" + id
      });
    });  
};

// Delete a Plan with the specified id in the reques
exports.delete = (req, res) => {
  const id = req.params.id;

  Plan.destroy({
    where: { idPlan: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Plan eliminada exitosamente!"
        });
      } else {
        res.send({
          message: `No se pudo eliminar Plan con id=${id}.!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "No se pudo eliminar Plan con id=" + id
      });
    });  
};

// Delete all Materia from the database.
exports.deleteAll = (req, res) => {
  Plan.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Plan eliminadas exitosamente!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Plan eliminadas exitosamente."
      });
    });
};

