import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/connection';

class Responsable extends Model{}
Responsable.init({
    estado:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
},{
    sequelize,
    modelName:'responsable',
    timestamps: true,
});

export default Responsable;