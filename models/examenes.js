/* jshint indent: 1 */

module.exports = function(sequelize, Sequelize) {
	return sequelize.define('examenes', {
		idExamenes: {
			type: Sequelize.INTEGER,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			field: 'idExamenes'
		},
		fecha: {
			type: Sequelize.DATEONLY,
			allowNull: true,
			field: 'fecha'
		},
		horarioInicio: {
			type: Sequelize.TIME,
			allowNull: true,
			field: 'horarioInicio'
		},
		horarioFin: {
			type: Sequelize.TIME,
			allowNull: true,
			field: 'horarioFin'
		},
		docenteAsignado: {
			type: Sequelize.JSON,
			allowNull: true,
			field: 'docenteAsignado'
		},
		inicioInscripcion: {
			type: Sequelize.DATEONLY,
			allowNull: true,
			field: 'inicioInscripcion'
		},
		finInscripcion: {
			type: Sequelize.STRING(45),
			allowNull: true,
			field: 'finInscripcion'
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
		},
		materiasCarrerasIdCarreras: {
			type: Sequelize.INTEGER,
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'materias',
				key: 'Carreras_idCarreras'
			},
			field: 'Materias_Carreras_idCarreras'
		}
	}, {
		tableName: 'examenes'
	});
};
