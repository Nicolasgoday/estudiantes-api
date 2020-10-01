'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('carreras', {
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
    })


    await queryInterface.createTable('materias',  {
      idMaterias: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        field: 'idMaterias'
      },
      nombre: {
        type: Sequelize.STRING(45),
        allowNull: true,
        field: 'nombre'
      },
      idCarrera: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'idCarrera'
      },
      materiascol: {
        type: Sequelize.STRING(45),
        allowNull: true,
        field: 'Materiascol'
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
      carrerasIdCarreras: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'carreras',
          key: 'idCarreras'
        },
        field: 'Carreras_idCarreras'
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
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.dropTable('carreras');
    await queryInterface.dropTable('materias');
    await queryInterface.dropTable('alumnoscursada');
     
  }
};
