import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/connection';

class Programacion extends Model{}
Programacion.init({
    
    numeromat:{
        type: DataTypes.INTEGER,
        defaultValue:0
    },
    numeromaxmat:{
        type: DataTypes.INTEGER,
        defaultValue:30
    },
    estado:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
},{
    sequelize,
    modelName:'programacion',
    timestamps: true,
});

export default Programacion;

