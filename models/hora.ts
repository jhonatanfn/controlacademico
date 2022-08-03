import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/connection';

class Hora extends Model{}
Hora.init({
   
    nombre:{
        type: DataTypes.STRING,
        allowNull: false
    },
    inicio:{
        type: DataTypes.STRING,
        allowNull: false
    },
    fin:{
        type: DataTypes.STRING,
        allowNull: false
    },
    tipo:{
        type: DataTypes.INTEGER,
        defaultValue:1
    },
    estado:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
},{
    sequelize,
    modelName:'hora',
    timestamps: true,
});

export default Hora;

