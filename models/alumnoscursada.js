/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('alumnoscursada', {
		idalumnosCursada: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			field: 'idalumnosCursada'
		},
		datosAlumno: {
			type: DataTypes.JSON,
			allowNull: true,
			field: 'datosAlumno'
		},
		notaCursada: {
			type: DataTypes.INTEGER,
			allowNull: true,
			field: 'notaCursada'
		},
		materiasIdMaterias: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'materias',
				key: 'idMaterias'
			},
			field: 'Materias_idMaterias'
		},
		materiasCarrerasIdCarreras: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'materias',
				key: 'Carreras_idCarreras'
			},
			field: 'Materias_Carreras_idCarreras'
		},
		recordatorio: {
			type: DataTypes.BOOLEAN,
			allowNull: true,
			defaultValue: '0',
			field: 'recordatorio'
		}
	}, {
		tableName: 'alumnoscursada'
	});
};
