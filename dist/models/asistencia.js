"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
class Asistencia extends sequelize_1.Model {
}
Asistencia.init({
    fecha: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    hora: {
        type: sequelize_1.DataTypes.STRING
    },
    estado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    sequelize: connection_1.default,
    modelName: 'asistencia',
    timestamps: true,
});
exports.default = Asistencia;
//# sourceMappingURL=asistencia.js.map