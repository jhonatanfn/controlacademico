import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/connection';

class Apreciacion extends Model { }
Apreciacion.init({
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

