"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
class Matriculadetalle extends sequelize_1.Model {
}
Matriculadetalle.init({
    aprobado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false
    },
    estado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    },
}, {
    sequelize: connection_1.default,
    modelName: 'matriculadetalle',
    timestamps: true,
});
exports.default = Matriculadetalle;
//# sourceMappingURL=matriculadetalle.js.map