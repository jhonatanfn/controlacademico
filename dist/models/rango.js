"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
class Rango extends sequelize_1.Model {
}
Rango.init({
    letra: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    inicio: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: false
    },
    fin: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: false
    },
    situacion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    color: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    alias: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    estado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    },
}, {
    sequelize: connection_1.default,
    modelName: 'rango',
    timestamps: true,
});
exports.default = Rango;
//# sourceMappingURL=rango.js.map