import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/connection';

class Apoderado extends Model{}
Apoderado.init({
   
    estado:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
},{
    sequelize,
    modelName:'apoderado',
    timestamps: true,
});

export default Apoderado;

