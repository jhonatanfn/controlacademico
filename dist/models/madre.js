"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
class Madre extends sequelize_1.Model {
}
Madre.init({
    vive: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    },
    valor: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: 'm'
    },
    estado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    sequelize: connection_1.default,
    modelName: 'madre',
    timestamps: true,
});
exports.default = Madre;
//# sourceMappingURL=madre.js.map