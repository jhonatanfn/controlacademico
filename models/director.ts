import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/connection';

class Director extends Model { }
Director.init({
    observacion: {
        type: DataTypes.STRING,
    },
    vigente: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
}, {
    sequelize,
    modelName: 'director',
    timestamps: true,
});

export default Director;

