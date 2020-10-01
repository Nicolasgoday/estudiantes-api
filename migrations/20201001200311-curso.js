'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.createTable('curso',{
		idCurso: {
			type: Sequelize.INTEGER,
			allowNull: false,
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
		}
	});

  },

  down: async (queryInterface, Sequelize) => {

     await queryInterface.dropTable('curso');
     
  }
};
