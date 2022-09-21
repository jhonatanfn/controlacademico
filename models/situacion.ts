import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/connection';

class Situacion extends Model{}
Situacion.init({
    nombre:{
        type: DataTypes.STRING
    },
    abreviatura:{
        type: DataTypes.STRING
    },
    color:{
        type: DataTypes.STRING,
        defaultValue: 'secondary'
    },
    estado:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
},{
    sequelize,
    modelName:'situacion',
    timestamps: true,
});

export default Situacion;

