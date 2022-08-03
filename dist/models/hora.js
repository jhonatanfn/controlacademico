"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
class Hora extends sequelize_1.Model {
}
Hora.init({
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    inicio: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    fin: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    tipo: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 1
    },
    estado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    },
}, {
    sequelize: connection_1.default,
    modelName: 'hora',
    timestamps: true,
});
exports.default = Hora;
//# sourceMappingURL=hora.js.map