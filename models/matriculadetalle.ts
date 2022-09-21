import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/connection';

class Matriculadetalle extends Model{}
Matriculadetalle.init({
    aprobado:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    estado:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
},{
    sequelize,
    modelName:'matriculadetalle',
    timestamps: true,
});

export default Matriculadetalle;

