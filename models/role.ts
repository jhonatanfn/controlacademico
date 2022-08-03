import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/connection';

class Role extends Model{}
Role.init({
    nombre:{
        type: DataTypes.STRING
    },
    estado:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
},{
    sequelize,
    modelName:'role',
    timestamps: true,
});

export default Role;