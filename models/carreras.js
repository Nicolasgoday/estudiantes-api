/* jshint indent: 1 */

module.exports = function(sequelize, Sequelize) {
	return sequelize.define('carreras', {
		idCarreras: {
			type: Sequelize.INTEGER,
			allowNull: false,
			primaryKey: true,
			field: 'idCarreras'
		},
		nombre: {
			type: Sequelize.STRING(45),
			allowNull: true,
			field: 'nombre'
		},
		departamento: {
			type: Sequelize.STRING(45),
			allowNull: true,
			field: 'departamento'
		}
	}, {
		tableName: 'carreras'
	});
};
