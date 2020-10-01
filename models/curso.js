/* jshint indent: 1 */

module.exports = function(sequelize, Sequelize) {
	return sequelize.define('curso', {
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
	}, {
		tableName: 'curso'
	});
};
