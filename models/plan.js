/* jshint indent: 1 */

module.exports = function(sequelize, Sequelize) {
	return sequelize.define('plan', {
		idPlan: {
			type: Sequelize.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'idPlan'
		},
		descripcion: {
			type: Sequelize.STRING(45),
			allowNull: true,
			field: 'descripcion'
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
		tableName: 'plan'
	});
};
