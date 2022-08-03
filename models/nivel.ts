import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/connection';

class Nivel extends Model{}
Nivel.init({
   
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
    modelName:'nivel',
    timestamps: true,
});

export default Nivel;

