"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
class Director extends sequelize_1.Model {
}
Director.init({
    observacion: {
        type: sequelize_1.DataTypes.STRING,
    },
    vigente: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 1
    },
    estado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    },
}, {
    sequelize: connection_1.default,
    modelName: 'director',
    timestamps: true,
});
exports.default = Director;
//# sourceMappingURL=director.js.map