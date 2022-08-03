import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/connection';

class Alumno extends Model{}
Alumno.init({
    estado:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
},{
    sequelize,
    modelName:'alumno',
    timestamps: true,
});

export default Alumno;

