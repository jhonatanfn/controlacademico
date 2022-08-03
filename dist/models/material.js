"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
class Material extends sequelize_1.Model {
}
Material.init({
    titulo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    subtitulo: {
        type: sequelize_1.DataTypes.STRING
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    fecha: {
        type: sequelize_1.DataTypes.STRING
    },
    archivo: {
        type: sequelize_1.DataTypes.STRING
    },
    estado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    sequelize: connection_1.default,
    modelName: 'material',
    timestamps: true,
});
exports.default = Material;
//# sourceMappingURL=material.js.map