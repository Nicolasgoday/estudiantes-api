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
			type: Sequelize.DATEONLY,
			allowNull: true,
			field: 'finInscripcion'
		},
		MateriasIdMaterias: {
			type: Sequelize.INTEGER,
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'materias',
				key: 'idMaterias'
			},
			field: 'MateriasIdMaterias'
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
		  acta: {
			type: Sequelize.STRING(45),
			allowNull: true,
			field: 'acta'
		}
	}, {
		tableName: 'examenes'
	});
};
