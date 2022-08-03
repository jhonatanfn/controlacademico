import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/connection';

class Evaluacion extends Model{}
Evaluacion.init({
    
    nombre:{
        type:DataTypes.STRING
    },
    abreviatura:{
        type: DataTypes.STRING
    },
    estado:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
},{
    sequelize,
    modelName:'evaluacion',
    timestamps: true,
});

export default Evaluacion;

