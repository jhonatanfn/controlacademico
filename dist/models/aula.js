"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
class Aula extends sequelize_1.Model {
}
Aula.init({
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    tipovalor: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    estado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    sequelize: connection_1.default,
    modelName: 'aula',
    timestamps: true,
});
exports.default = Aula;
//# sourceMappingURL=aula.js.map