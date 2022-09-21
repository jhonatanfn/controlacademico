import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/connection';

class Padre extends Model{}
Padre.init({
    estado:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
},{
    sequelize,
    modelName:'padre',
    timestamps: true,
});

export default Padre;

