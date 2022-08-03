import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/connection';

class Asistencia extends Model { }
Asistencia.init({
    
    fecha:{
        type: DataTypes.STRING,
        allowNull: false
    },
    hora:{
        type: DataTypes.STRING
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    sequelize,
    modelName: 'asistencia',
    timestamps: true,
});

export default Asistencia;

