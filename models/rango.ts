import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/connection';

class Rango extends Model{}
Rango.init({
   
    letra:{
        type: DataTypes.STRING,
        allowNull: false
    },
    inicio:{
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    fin:{
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    situacion:{
        type: DataTypes.STRING,
        allowNull: false
    },
    color:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    alias:{
        type:DataTypes.STRING,
        allowNull: false
    },
    estado:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
},{
    sequelize,
    modelName:'rango',
    timestamps: true,
});

export default Rango;