import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/connection';

class Tipodocumento extends Model{}
Tipodocumento.init({
    nombre:{
        type: DataTypes.STRING
    },
    estado:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
},{
    sequelize,
    modelName:'tipodocumento',
    timestamps: true,
});

export default Tipodocumento;