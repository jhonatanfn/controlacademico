import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/connection';

class Competencia extends Model{}
Competencia.init({
    descripcion:{
        type: DataTypes.STRING,
        allowNull: false
    },
    estado:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
},{
    sequelize,
    modelName:'competencia',
    timestamps: true,
});

export default Competencia;

