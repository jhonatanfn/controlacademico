import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/connection';

class Subarea extends Model{}
Subarea.init({
    
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
    modelName:'subarea',
    timestamps: true,
});

export default Subarea;