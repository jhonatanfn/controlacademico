import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/connection';

class Madre extends Model{}
Madre.init({
    vive:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    valor:{
        type: DataTypes.STRING,
        defaultValue: 'm'
    },
    estado:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
},{
    sequelize,
    modelName:'madre',
    timestamps: true,
});

export default Madre;

