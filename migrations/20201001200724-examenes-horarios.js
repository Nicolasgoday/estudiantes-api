'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('carreras',{
      idCarreras: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        field: 'idCarreras'
      },
      nombre: {
        type: Sequelize.STRING(45),
        allowNull: true,
        field: 'nombre'
      },
      departamento: {
        type: Sequelize.STRING(45),
        allowNull: true,
        field: 'departamento'
      }
    });

     await queryInterface.createTable('examenes',{
     idExamenes: {
       type: Sequelize.INTEGER,
       allowNull: false,
       primaryKey: true,
       field: 'idExamenes'
     },
     fecha: {
       type: Sequelize.DATEONLY,
       allowNull: true,
       field: 'fecha'
     },
     horarioInicio: {
       type: Sequelize.TIME,
       allowNull: true,
       field: 'horarioInicio'
     },
     horarioFin: {
       type: Sequelize.TIME,
       allowNull: true,
       field: 'horarioFin'
     },
     docenteAsignado: {
       type: Sequelize.JSON,
       allowNull: true,
       field: 'docenteAsignado'
     },
     inicioInscripcion: {
       type: Sequelize.DATEONLY,
       allowNull: true,
       field: 'inicioInscripcion'
     },
     finInscripcion: {
       type: Sequelize.STRING(45),
       allowNull: true,
       field: 'finInscripcion'
     },
     materiasIdMaterias: {
       type: Sequelize.INTEGER,
       allowNull: false,
       primaryKey: true,
       references: {
         model: 'materias',
         key: 'idMaterias'
       },
       field: 'Materias_idMaterias'
     },
     materiasCarrerasIdCarreras: {
       type: Sequelize.INTEGER,
       allowNull: false,
       primaryKey: true,
       references: {
         model: 'materias',
         key: 'Carreras_idCarreras'
       },
       field: 'Materias_Carreras_idCarreras'
     }
   });
    
  },

  down: async (queryInterface, Sequelize) => {

     await queryInterface.dropTable('carreras');
     await queryInterface.dropTable('examenes');     
  }
};
