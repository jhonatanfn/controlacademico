import moment from 'moment';
import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/connection';

class Nota extends Model { }
Nota.init({
    valor: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fecha: {
        type: DataTypes.STRING,
        defaultValue: moment().format('YYYY-MM-DD'),
    },
    hora: {
        type: DataTypes.STRING,
        defaultValue: moment().format('LTS')
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    sequelize,
    modelName: 'nota',
    timestamps: true,
});

export default Nota;

