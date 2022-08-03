import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/connection';

class Seccion extends Model{}
Seccion.init({
   
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
    modelName:'seccion',
    timestamps: true,
});

export default Seccion;

