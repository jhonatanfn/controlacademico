"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const alumno_1 = __importDefault(require("./alumno"));
const padre_1 = __importDefault(require("./padre"));
class padre_alumno extends sequelize_1.Model {
}
padre_alumno.init({
    padreId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: padre_1.default,
            key: 'id'
        }
    },
    alumnoId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: alumno_1.default,
            key: 'id'
        }
    }
}, {
    sequelize: connection_1.default,
    modelName: 'padre_alumno',
    timestamps: true,
});
exports.default = padre_alumno;
//# sourceMappingURL=padre_alumno.js.map