const db = require("../models");
const Carrera = db.carreras;
const Op = db.Sequelize.Op;

// Create and Save a new Carrera
exports.create = (req, res) => {
    /* Validate request
    if (!req.body.title) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
        return;
      }
    */
      // Create a Carrera
      const carrera = {
        idCarreras :1,  
        nombre: "Sistemas Distribuidos",
        departamento: "Desarrollo Productivo y Técnologico",
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
  
};

// Find a single Carrera with an id
exports.findOne = (req, res) => {
  
};

// Update a Carrera by the id in the request
exports.update = (req, res) => {
  
};

// Delete a Carrera with the specified id in the request
exports.delete = (req, res) => {
  
};

// Delete all Carreras from the database.
exports.deleteAll = (req, res) => {
  
};

// Find all published Carreras
exports.findAllPublished = (req, res) => {
  
};