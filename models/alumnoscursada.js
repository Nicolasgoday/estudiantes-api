/* jshint indent: 1 */

module.exports = function(sequelize, Sequelize) {
	return sequelize.define('alumnoscursada', {
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
			field: 'materiasIdMaterias'
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
	}, {
		tableName: 'alumnoscursada'
	});
};
