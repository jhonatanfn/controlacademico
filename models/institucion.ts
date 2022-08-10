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
    departamento:{
        type: DataTypes.STRING
    },
    provincia:{
        type: DataTypes.STRING
    },
    distrito:{
        type: DataTypes.STRING
    },
    centropoblado:{
        type: DataTypes.STRING
    },
    dre:{
        type: DataTypes.STRING
    },
    ugel:{
        type: DataTypes.STRING
    },
    tipogestion:{
        type: DataTypes.STRING
    },
    generoalumno:{
        type: DataTypes.STRING
    },
    formaatencion:{
        type: DataTypes.STRING
    },
    turnoatencion:{
        type: DataTypes.STRING
    },
    paginaweb:{
        type: DataTypes.STRING
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

