import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/connection';

class Grado extends Model{}
Grado.init({
    
    nombre:{
        type: DataTypes.STRING,
        allowNull: false
    },
    estado:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
},{
    sequelize,
    modelName:'grado',
    timestamps: true,
});

export default Grado;

