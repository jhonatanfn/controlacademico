"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
class Role extends sequelize_1.Model {
}
Role.init({
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    bgcolor: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    estado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    },
}, {
    sequelize: connection_1.default,
    modelName: 'role',
    timestamps: true,
});
exports.default = Role;
//# sourceMappingURL=role.js.map