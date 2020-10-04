'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
/*	
nombre varchar(45) 
idCarrera int 
Materiascol varchar(45) 
inicioInscripcion date 
finInscripcion date 
Carreras_idCarreras int PK 
createdAt datetime 
updatedAt datetime
*/
    await queryInterface.createTable('materias',{
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
