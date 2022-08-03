import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/connection';

class Usuario extends Model{
    static getRole() {
        throw new Error("Method not implemented.");
    }
}

Usuario.init({
    numero:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    nombre:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull:false
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    },
    habilitado:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    estado:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
},
{
    sequelize,
    modelName: 'usuario',
    timestamps: true,
});





export default Usuario;
