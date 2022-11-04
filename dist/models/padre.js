"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
class Padre extends sequelize_1.Model {
}
Padre.init({
    vive: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    },
    valor: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: 'p'
    },
    estado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    sequelize: connection_1.default,
    modelName: 'padre',
    timestamps: true,
});
exports.default = Padre;
//# sourceMappingURL=padre.js.map