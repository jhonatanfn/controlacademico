import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/connection';

class Alumno extends Model { }
Alumno.init({
    vivecon: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    tienediscapacidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    cualdiscapacidad: {
        type: DataTypes.STRING
    },
    certificadiscapacidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    inicialprocede: {
        type: DataTypes.STRING,
    },
    colegioprocede: {
        type: DataTypes.STRING,
    },
    observacion: {
        type: DataTypes.STRING
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
}, {
    sequelize,
    modelName: 'alumno',
    timestamps: true,
});

export default Alumno;

