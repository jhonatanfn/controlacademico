import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/connection';

class Area extends Model{}
Area.init({
    
    nombre:{
        type: DataTypes.STRING
    },
    img:{
        type: DataTypes.STRING
    },
    estado:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
},{
    sequelize,
    modelName:'area',
    timestamps: true,
});

export default Area;

