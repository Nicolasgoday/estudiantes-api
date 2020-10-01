/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('carreras', {
		idCarreras: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			field: 'idCarreras'
		},
		nombre: {
			type: DataTypes.STRING(45),
			allowNull: true,
			field: 'nombre'
		},
		departamento: {
			type: DataTypes.STRING(45),
			allowNull: true,
			field: 'departamento'
		}
	}, {
		tableName: 'carreras'
	});
};
