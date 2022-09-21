import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/connection';

class Madre extends Model{}
Madre.init({
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

