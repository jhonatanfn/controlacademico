"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
class Responsable extends sequelize_1.Model {
}
Responsable.init({
    vive: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: 1
    },
    correo: {
        type: sequelize_1.DataTypes.STRING
    },
    tipo: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    estado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    },
}, {
    sequelize: connection_1.default,
    modelName: 'responsable',
    timestamps: true,
});
exports.default = Responsable;
//# sourceMappingURL=responsable.js.map