import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/connection';

class Apreciaciondetalle extends Model { }
Apreciaciondetalle.init({
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    responsabilidad: {
        type: DataTypes.STRING,
        defaultValue: "-"
    },
    firma: {
        type: DataTypes.STRING
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    sequelize,
    modelName: 'apreciaciondetalle',
    timestamps: true,
});

export default Apreciaciondetalle;

