/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('curso', {
		idCurso: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			field: 'idCurso'
		},
		datosDocente: {
			type: DataTypes.JSON,
			allowNull: true,
			field: 'datosDocente'
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
		}
	}, {
		tableName: 'curso'
	});
};
