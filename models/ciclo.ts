import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/connection';

class Ciclo extends Model{}
Ciclo.init({
    nombre:{
        type:DataTypes.STRING
    },
    estado:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
},{
    sequelize,
    modelName:'ciclo',
    timestamps: true,
});

export default Ciclo;

