import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/connection';

class Matricula extends Model{}
Matricula.init({
    
    estado:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
},{
    sequelize,
    modelName:'matricula',
    timestamps: true,
});

export default Matricula;

