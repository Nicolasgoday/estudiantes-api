/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('alumnosexamenfinal', {
		idInscriptosExamen: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			field: 'idInscriptosExamen'
		},
		examenesIdExamenes: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'examenes',
				key: 'idExamenes'
			},
			field: 'Examenes_idExamenes'
		},
		examenesMateriasIdMaterias: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'examenes',
				key: 'Materias_idMaterias'
			},
			field: 'Examenes_Materias_idMaterias'
		},
		examenesMateriasCarrerasIdCarreras: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'examenes',
				key: 'Materias_Carreras_idCarreras'
			},
			field: 'Examenes_Materias_Carreras_idCarreras'
		},
		datosAlumno: {
			type: DataTypes.JSON,
			allowNull: true,
			field: 'datosAlumno'
		},
		nota: {
			type: DataTypes.INTEGER,
			allowNull: true,
			field: 'nota'
		},
		asistencia: {
			type: DataTypes.BOOLEAN,
			allowNull: true,
			field: 'asistencia'
		},
		recordatorio: {
			type: DataTypes.BOOLEAN,
			allowNull: true,
			defaultValue: '0',
			field: 'recordatorio'
		}
	}, {
		tableName: 'alumnosexamenfinal'
	});
};
