"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
class Matricula extends sequelize_1.Model {
}
Matricula.init({
    fecha: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: (0, moment_1.default)().format('YYYY-MM-DD'),
    },
    hora: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: (0, moment_1.default)().format('LTS')
    },
    estado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    },
}, {
    sequelize: connection_1.default,
    modelName: 'matricula',
    timestamps: true,
});
exports.default = Matricula;
//# sourceMappingURL=matricula.js.map