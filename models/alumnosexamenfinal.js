/* jshint indent: 1 */

module.exports = function(sequelize, Sequelize) {
	return sequelize.define('alumnosexamenfinal', {
		idInscriptosExamen: {
			type: Sequelize.INTEGER,
			allowNull: false,
			primaryKey: true,
			field: 'idInscriptosExamen'
		},
		examenesIdExamenes: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: 'examenes',
				key: 'idExamenes'
			},
			field: 'Examenes_idExamenes'
		},
		examenesMateriasIdMaterias: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: 'examenes',
				key: 'Materias_idMaterias'
			},
			field: 'Examenes_Materias_idMaterias'
		},
		examenesMateriasCarrerasIdCarreras: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: 'examenes',
				key: 'Materias_Carreras_idCarreras'
			},
			field: 'Examenes_Materias_Carreras_idCarreras'
		},
		datosAlumno: {
			type: Sequelize.JSON,
			allowNull: true,
			field: 'datosAlumno'
		},
		nota: {
			type: Sequelize.INTEGER,
			allowNull: true,
			field: 'nota'
		},
		asistencia: {
			type: Sequelize.BOOLEAN,
			allowNull: true,
			field: 'asistencia'
		},
		recordatorio: {
			type: Sequelize.BOOLEAN,
			allowNull: true,
			defaultValue: '0',
			field: 'recordatorio'
		}
	}, {
		tableName: 'alumnosexamenfinal'
	});
};
