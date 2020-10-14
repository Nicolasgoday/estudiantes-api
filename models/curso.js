/* jshint indent: 1 */

module.exports = function(sequelize, Sequelize) {
	return sequelize.define('curso', {
		idCurso: {
			type: Sequelize.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'idCurso'
		},
		datosDocente: {
			type: Sequelize.JSON,
			allowNull: true,
			field: 'datosDocente'
		},
		MateriasIdMaterias: {
			type: Sequelize.INTEGER,
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'materias',
				key: 'idMaterias'
			},
			field: 'MateriasIdMaterias'
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
	}, {
		tableName: 'curso'
	});
};
