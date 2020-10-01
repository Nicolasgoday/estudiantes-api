/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('materias', {
		idMaterias: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			field: 'idMaterias'
		},
		nombre: {
			type: DataTypes.STRING(45),
			allowNull: true,
			field: 'nombre'
		},
		idCarrera: {
			type: DataTypes.INTEGER,
			allowNull: true,
			field: 'idCarrera'
		},
		materiascol: {
			type: DataTypes.STRING(45),
			allowNull: true,
			field: 'Materiascol'
		},
		inicioInscripcion: {
			type: DataTypes.DATEONLY,
			allowNull: true,
			field: 'inicioInscripcion'
		},
		finInscripcion: {
			type: DataTypes.DATEONLY,
			allowNull: true,
			field: 'finInscripcion'
		},
		carrerasIdCarreras: {
			type: DataTypes.INTEGER,
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
