import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/connection';

class Mensajeria extends Model{}
Mensajeria.init({
   
    emisor:{
        type: DataTypes.STRING,
        allowNull: false
    },
    receptor:{
        type: DataTypes.STRING,
        allowNull: false
    },
    asunto:{
        type: DataTypes.STRING,
        allowNull: false
    },
    contenido:{
        type: DataTypes.STRING,
        allowNull: false
    },
    fecha:{
        type: DataTypes.STRING,
        allowNull: false
    },
    hora:{
        type: DataTypes.STRING,
        allowNull: false
    },
    xemisor:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    xreceptor:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    lemisor:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    lreceptor:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    cemisor:{
        type: DataTypes.STRING,
        defaultValue: "list-group-item-info"
    },
    creceptor:{
        type: DataTypes.STRING,
        defaultValue: "list-group-item-info"
    },
    archivo:{
        type: DataTypes.STRING,
    },
    nuevo:{
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    estado:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
},{
    sequelize,
    modelName:'mensajeria',
    timestamps: true,
});

export default Mensajeria;

