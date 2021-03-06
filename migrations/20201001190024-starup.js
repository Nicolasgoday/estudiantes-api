'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('carreras', {
      idCarreras: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
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
      },
      createdAt: {
        type: Sequelize.DATEONLY,
        allowNull: true,
        field: 'createdAt'
      },
      updatedAt: {
        type: Sequelize.DATEONLY,
        allowNull: true,
        field: 'updatedAt'
      }
    })


    await queryInterface.createTable('materias',  {
      idMaterias: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true, 
        primaryKey: true,
        field: 'idMaterias'
      },
      nombre: {
        type: Sequelize.STRING(45),
        allowNull: true,
        field: 'nombre'
      },		
      inicioInscripcion: {
        type: Sequelize.DATEONLY,
        allowNull: true,
        field: 'inicioInscripcion'
      },
      finInscripcion: {
        type: Sequelize.DATEONLY,
        allowNull: true,
        field: 'finInscripcion'
      },
      CarrerasIdCarreras: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'carreras',
          key: 'idCarreras'
        },
        field: 'CarrerasIdCarreras'
      },
      createdAt: {
        type: Sequelize.DATEONLY,
        allowNull: true,
        field: 'createdAt'
        },
        updatedAt: {
        type: Sequelize.DATEONLY,
        allowNull: true,
        field: 'updatedAt'
        },
        planIdPlan  : {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'plan',
          key: 'idplan'
        },
        field: 'planIdPlan'
      },
      formaAprobacionIdformaAprobacion  : {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'plan',
          key: 'idplan'
        },
        field: 'formaAprobacionIdformaAprobacion'
      }
    })

    await queryInterface.createTable('alumnoscursada',  {
      idalumnosCursada: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        field: 'idalumnosCursada'
      },
      datosAlumno: {
        type: Sequelize.JSON,
        allowNull: true,
        field: 'datosAlumno'
      },
      notaCursada: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'notaCursada'
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
      },
      recordatorio: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: '0',
        field: 'recordatorio'
      },
      createdAt: {
        type: Sequelize.DATEONLY,
        allowNull: true,
        field: 'createdAt'
      },
      updatedAt: {
        type: Sequelize.DATEONLY,
        allowNull: true,
        field: 'updatedAt'
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.dropTable('carreras');
    await queryInterface.dropTable('materias');
    await queryInterface.dropTable('alumnoscursada');
     
  }
};
