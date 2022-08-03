"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
class Nota extends sequelize_1.Model {
}
Nota.init({
    valor: {
        type: sequelize_1.DataTypes.DOUBLE,
        defaultValue: 0
    },
    fecha: {
        type: sequelize_1.DataTypes.STRING
    },
    estado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    },
}, {
    sequelize: connection_1.default,
    modelName: 'nota',
    timestamps: true,
});
exports.default = Nota;
//# sourceMappingURL=nota.js.map