import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/connection';

class Apreciacion extends Model { }
Apreciacion.init({
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    responsabilidad:{
        type: DataTypes.STRING,
        defaultValue: "-"
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    sequelize,
    modelName: 'apreciacion',
    timestamps: true,
});

export default Apreciacion;

