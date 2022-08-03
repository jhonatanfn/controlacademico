"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
class Ciclo extends sequelize_1.Model {
}
Ciclo.init({
    nombre: {
        type: sequelize_1.DataTypes.STRING
    },
    estado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    },
}, {
    sequelize: connection_1.default,
    modelName: 'ciclo',
    timestamps: true,
});
exports.default = Ciclo;
//# sourceMappingURL=ciclo.js.map