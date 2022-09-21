import moment from 'moment';
import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/connection';

class Asistencia extends Model { }
Asistencia.init({
    fecha: {
        type: DataTypes.STRING,
        defaultValue: moment().format('YYYY-MM-DD'),
    },
    hora: {
        type: DataTypes.STRING,
        defaultValue: moment().format('LTS')
    },
    observacion:{
        type: DataTypes.STRING
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    sequelize,
    modelName: 'asistencia',
    timestamps: true,
});

export default Asistencia;

