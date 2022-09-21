import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/connection';

class Auxiliar extends Model{}
Auxiliar.init({
    estado:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
},{
    sequelize,
    modelName:'auxiliar',
    timestamps: true,
});

export default Auxiliar;

