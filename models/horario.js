/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('horario', {
		idHorario: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			field: 'idHorario'
		},
		dia: {
			type: DataTypes.STRING(10),
			allowNull: false,
			field: 'dia'
		},
		horarioInicio: {
			type: DataTypes.TIME,
			allowNull: false,
			field: 'horarioInicio'
		},
		horarioFin: {
			type: DataTypes.TIME,
			allowNull: false,
			field: 'horarioFin'
		},
		cursoIdCurso: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'curso',
				key: 'idCurso'
			},
			field: 'Curso_idCurso'
		}
	}, {
		tableName: 'horario'
	});
};
