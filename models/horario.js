/* jshint indent: 1 */

module.exports = function(sequelize, Sequelize) {
	return sequelize.define('horario', {
		idHorario: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
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
		Curso_idCurso: {
			type: Sequelize.INTEGER,
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
