import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/connection';

class Institucion extends Model{}
Institucion.init({
    nombre:{
        type: DataTypes.STRING,
        allowNull: false
    },
    direccion:{
        type:DataTypes.STRING,
        allowNull: false
    },
    telefono:{
        type:DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false
    },
    img:{
        type: DataTypes.STRING,
    },
    estado:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
},{
    sequelize,
    modelName:'institucion',
    timestamps: true,
});

export default Institucion;

