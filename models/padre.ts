import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/connection';

class Padre extends Model{}
Padre.init({
    vive:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    valor:{
        type: DataTypes.STRING,
        defaultValue: 'p'
    },
    estado:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
},{
    sequelize,
    modelName:'padre',
    timestamps: true,
});

export default Padre;

