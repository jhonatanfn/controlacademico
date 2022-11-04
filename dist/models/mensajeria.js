"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
class Mensajeria extends sequelize_1.Model {
}
Mensajeria.init({
    emisor: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    receptor: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    asunto: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    contenido: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    fecha: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    hora: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    xemisor: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false
    },
    xreceptor: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false
    },
    lemisor: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false
    },
    lreceptor: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false
    },
    cemisor: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: "list-group-item-info"
    },
    creceptor: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: "list-group-item-info"
    },
    archivo: {
        type: sequelize_1.DataTypes.STRING,
    },
    nuevo: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true,
    },
    estado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    },
}, {
    sequelize: connection_1.default,
    modelName: 'mensajeria',
    timestamps: true,
});
exports.default = Mensajeria;
//# sourceMappingURL=mensajeria.js.map