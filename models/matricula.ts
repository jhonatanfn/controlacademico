import moment from 'moment';
import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/connection';

class Matricula extends Model{}
Matricula.init({
    fecha: {
        type: DataTypes.STRING,
        defaultValue: moment().format('YYYY-MM-DD'),
    },
    hora: {
        type: DataTypes.STRING,
        defaultValue: moment().format('LTS')
    },
    estado:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
},{
    sequelize,
    modelName:'matricula',
    timestamps: true,
});

export default Matricula;

