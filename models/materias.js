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
		idCarrera: {
			type: Sequelize.INTEGER,
			allowNull: true,
			field: 'idCarrera'
		},
		materiascol: {
			type: Sequelize.STRING(45),
			allowNull: true,
			field: 'Materiascol'
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
		carrerasIdCarreras: {
			type: Sequelize.INTEGER,
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'carreras',
				key: 'idCarreras'
			},
			field: 'Carreras_idCarreras'
		}
	}, {
		tableName: 'materias'
	});
};
