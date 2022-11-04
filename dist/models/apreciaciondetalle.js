"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
class Apreciaciondetalle extends sequelize_1.Model {
}
Apreciaciondetalle.init({
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    responsabilidad: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: "-"
    },
    firma: {
        type: sequelize_1.DataTypes.STRING
    },
    estado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    sequelize: connection_1.default,
    modelName: 'apreciaciondetalle',
    timestamps: true,
});
exports.default = Apreciaciondetalle;
//# sourceMappingURL=apreciaciondetalle.js.map