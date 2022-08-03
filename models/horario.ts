import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/connection';

class Horario extends Model{}
Horario.init({
    
    dia:{
        type: DataTypes.STRING,
        allowNull: false
    },
    estado:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
},{
    sequelize,
    modelName:'horario',
    timestamps: true,
});

export default Horario;

