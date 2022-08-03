import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/connection';

class Docente extends Model{}
Docente.init({
    
    estado:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
},{
    sequelize,
    modelName:'docente',
    timestamps: true,
});

export default Docente;

