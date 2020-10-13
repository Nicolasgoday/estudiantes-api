/* jshint indent: 1 */

module.exports = function(sequelize, Sequelize) {
	return sequelize.define('materias', {
		idMaterias: {
			type: Sequelize.INTEGER,
			allowNull: false,
			autoIncrement: true, 
			primaryKey: true,
			field: 'idMaterias'
		},
		nombre: {
			type: Sequelize.STRING(45),
			allowNull: true,
			field: 'nombre'
		},		
		inicioInscripcion: {
			type: Sequelize.DATEONLY,
			allowNull: true,
			field: 'inicioInscripcion'
		},
		finInscripcion: {
			type: Sequelize.DATEONLY,
			allowNull: true,
			field: 'finInscripcion'
		},
		CarrerasIdCarreras: {
			type: Sequelize.INTEGER,
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'carreras',
				key: 'idCarreras'
			},
			field: 'CarrerasIdCarreras'
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
		  },
		  planIdPlan  : {
			type: Sequelize.INTEGER,
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'plan',
				key: 'idplan'
			},
			field: 'planIdPlan'
		},
		formaAprobacionIdformaAprobacion  : {
			type: Sequelize.INTEGER,
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'plan',
				key: 'idplan'
			},
			field: 'formaAprobacionIdformaAprobacion'
		}
	}, {
		tableName: 'materias'
	});
};
