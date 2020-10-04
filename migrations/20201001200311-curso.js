'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.createTable('curso',{
		idCurso: {
			type: Sequelize.INTEGER,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			field: 'idCurso'
		},
		datosDocente: {
			type: Sequelize.JSON,
			allowNull: true,
			field: 'datosDocente'
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

     await queryInterface.dropTable('curso');
     
  }
};
