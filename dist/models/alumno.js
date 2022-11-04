"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
class Alumno extends sequelize_1.Model {
}
Alumno.init({
    vivecon: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    tienediscapacidad: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    cualdiscapacidad: {
        type: sequelize_1.DataTypes.STRING
    },
    certificadiscapacidad: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    inicialprocede: {
        type: sequelize_1.DataTypes.STRING,
    },
    colegioprocede: {
        type: sequelize_1.DataTypes.STRING,
    },
    observacion: {
        type: sequelize_1.DataTypes.STRING
    },
    estado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    },
}, {
    sequelize: connection_1.default,
    modelName: 'alumno',
    timestamps: true,
});
exports.default = Alumno;
//# sourceMappingURL=alumno.js.map