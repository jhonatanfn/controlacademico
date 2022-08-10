import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/connection';

class Periodo extends Model{}
Periodo.init({

    nombre:{
        type: DataTypes.STRING,
        allowNull: false
    },
    fechainicial:{
        type: DataTypes.STRING,
        allowNull: false
    },
    fechafinal:{
        type: DataTypes.STRING,
        allowNull: false
    },
    estado:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    
},{
    sequelize,
    modelName:'periodo',
    timestamps: true,
});

export default Periodo;

