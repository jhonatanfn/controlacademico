"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
class Subarea extends sequelize_1.Model {
}
Subarea.init({
    nombre: {
        type: sequelize_1.DataTypes.STRING
    },
    img: {
        type: sequelize_1.DataTypes.STRING
    },
    estado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    },
}, {
    sequelize: connection_1.default,
    modelName: 'subarea',
    timestamps: true,
});
exports.default = Subarea;
//# sourceMappingURL=subarea.js.map