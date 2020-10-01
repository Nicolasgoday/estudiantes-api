/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('examenes', {
		idExamenes: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			field: 'idExamenes'
		},
		fecha: {
			type: DataTypes.DATEONLY,
			allowNull: true,
			field: 'fecha'
		},
		horarioInicio: {
			type: DataTypes.TIME,
			allowNull: true,
			field: 'horarioInicio'
		},
		horarioFin: {
			type: DataTypes.TIME,
			allowNull: true,
			field: 'horarioFin'
		},
		docenteAsignado: {
			type: DataTypes.JSON,
			allowNull: true,
			field: 'docenteAsignado'
		},
		inicioInscripcion: {
			type: DataTypes.DATEONLY,
			allowNull: true,
			field: 'inicioInscripcion'
		},
		finInscripcion: {
			type: DataTypes.STRING(45),
			allowNull: true,
			field: 'finInscripcion'
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
		}
	}, {
		tableName: 'examenes'
	});
};
