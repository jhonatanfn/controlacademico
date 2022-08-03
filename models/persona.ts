import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/connection';

class Persona extends Model{}
Persona.init({
    numero:{
        type:DataTypes.STRING,
        allowNull: false
    },
    nombres:{
        type: DataTypes.STRING,
        allowNull:false
    },
    apellidopaterno:{
        type: DataTypes.STRING,
        allowNull:false
    },
    apellidomaterno:{
        type: DataTypes.STRING,
        allowNull:false
    },
    direccion:{
        type:DataTypes.STRING
    },
    telefono:{
        type:DataTypes.STRING
    },
    img:{
        type:DataTypes.STRING
    },
    estado:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
},{
    sequelize,
    modelName:'persona',
    timestamps: true,
});

export default Persona;