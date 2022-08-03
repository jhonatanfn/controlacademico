"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
class Evaluacion extends sequelize_1.Model {
}
Evaluacion.init({
    nombre: {
        type: sequelize_1.DataTypes.STRING
    },
    abreviatura: {
        type: sequelize_1.DataTypes.STRING
    },
    estado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    },
}, {
    sequelize: connection_1.default,
    modelName: 'evaluacion',
    timestamps: true,
});
exports.default = Evaluacion;
//# sourceMappingURL=evaluacion.js.map