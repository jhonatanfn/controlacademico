import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/connection';

class Aula extends Model{}
Aula.init({
    nombre:{
        type: DataTypes.STRING,
        allowNull: false
    },
    tipovalor:{
        type: DataTypes.INTEGER,
    },
    estado:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
},{
    sequelize,
    modelName:'aula',
    timestamps: true,
});

export default Aula;

