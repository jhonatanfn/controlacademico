"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
class Persona extends sequelize_1.Model {
}
Persona.init({
    dni: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    nombres: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    apellidopaterno: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    apellidomaterno: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    domicilio: {
        type: sequelize_1.DataTypes.STRING
    },
    telefono: {
        type: sequelize_1.DataTypes.STRING
    },
    nacionalidad: {
        type: sequelize_1.DataTypes.STRING
    },
    distrito: {
        type: sequelize_1.DataTypes.STRING
    },
    fechanacimiento: {
        type: sequelize_1.DataTypes.STRING
    },
    sexo: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    correo: {
        type: sequelize_1.DataTypes.STRING
    },
    img: {
        type: sequelize_1.DataTypes.STRING
    },
    estado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    sequelize: connection_1.default,
    modelName: 'persona',
    timestamps: true,
});
exports.default = Persona;
//# sourceMappingURL=persona.js.map