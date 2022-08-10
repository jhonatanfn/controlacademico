"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
class Institucion extends sequelize_1.Model {
}
Institucion.init({
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    direccion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    telefono: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    img: {
        type: sequelize_1.DataTypes.STRING,
    },
    departamento: {
        type: sequelize_1.DataTypes.STRING
    },
    provincia: {
        type: sequelize_1.DataTypes.STRING
    },
    distrito: {
        type: sequelize_1.DataTypes.STRING
    },
    centropoblado: {
        type: sequelize_1.DataTypes.STRING
    },
    dre: {
        type: sequelize_1.DataTypes.STRING
    },
    ugel: {
        type: sequelize_1.DataTypes.STRING
    },
    tipogestion: {
        type: sequelize_1.DataTypes.STRING
    },
    generoalumno: {
        type: sequelize_1.DataTypes.STRING
    },
    formaatencion: {
        type: sequelize_1.DataTypes.STRING
    },
    turnoatencion: {
        type: sequelize_1.DataTypes.STRING
    },
    paginaweb: {
        type: sequelize_1.DataTypes.STRING
    },
    estado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    },
}, {
    sequelize: connection_1.default,
    modelName: 'institucion',
    timestamps: true,
});
exports.default = Institucion;
//# sourceMappingURL=institucion.js.map