import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/connection';

class Material extends Model { }
Material.init({
   
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    subtitulo: {
        type: DataTypes.STRING
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fecha:{
        type: DataTypes.STRING
    },
    archivo:{
        type: DataTypes.STRING
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    sequelize,
    modelName: 'material',
    timestamps: true,
});

export default Material;

