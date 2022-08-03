import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/connection';

class Nota extends Model{}
Nota.init({
    
    valor:{
        type: DataTypes.DOUBLE,
        defaultValue:0
    },
    fecha:{
        type: DataTypes.STRING
    },
    estado:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
},{
    sequelize,
    modelName:'nota',
    timestamps: true,
});

export default Nota;

