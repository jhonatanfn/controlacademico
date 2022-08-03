"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
class Seccion extends sequelize_1.Model {
}
Seccion.init({
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    estado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    },
}, {
    sequelize: connection_1.default,
    modelName: 'seccion',
    timestamps: true,
});
exports.default = Seccion;
//# sourceMappingURL=seccion.js.map