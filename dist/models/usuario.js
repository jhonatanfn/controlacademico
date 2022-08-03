"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
class Usuario extends sequelize_1.Model {
    static getRole() {
        throw new Error("Method not implemented.");
    }
}
Usuario.init({
    numero: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    habilitado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    },
    estado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    sequelize: connection_1.default,
    modelName: 'usuario',
    timestamps: true,
});
exports.default = Usuario;
//# sourceMappingURL=usuario.js.map