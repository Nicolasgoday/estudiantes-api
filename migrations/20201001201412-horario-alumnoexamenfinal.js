'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.createTable('horario',{
      idHorario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        field: 'idHorario'
      },
      dia: {
        type: Sequelize.STRING(10),
        allowNull: false,
        field: 'dia'
      },
      horarioInicio: {
        type: Sequelize.TIME,
        allowNull: false,
        field: 'horarioInicio'
      },
      horarioFin: {
        type: Sequelize.TIME,
        allowNull: false,
        field: 'horarioFin'
      },
      cursoIdCurso: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'curso',
          key: 'idCurso'
        },
        field: 'Curso_idCurso'
      }
    }); 

     await queryInterface.createTable('alumnosexamenfinal',  {
      idInscriptosExamen: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        field: 'idInscriptosExamen'
      },
      examenesIdExamenes: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'examenes',
          key: 'idExamenes'
        },
        field: 'Examenes_idExamenes'
      },
      examenesMateriasIdMaterias: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'examenes',
          key: 'Materias_idMaterias'
        },
        field: 'Examenes_Materias_idMaterias'
      },
      examenesMateriasCarrerasIdCarreras: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'examenes',
          key: 'Materias_Carreras_idCarreras'
        },
        field: 'Examenes_Materias_Carreras_idCarreras'
      },
      datosAlumno: {
        type: Sequelize.JSON,
        allowNull: true,
        field: 'datosAlumno'
      },
      nota: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'nota'
      },
      asistencia: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        field: 'asistencia'
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

    await queryInterface.dropTable('horario');
    await queryInterface.dropTable('alumnosexamenfinal');
   
  }
};
