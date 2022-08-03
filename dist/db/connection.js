"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const environments_1 = require("../environments/environments");
const db = new sequelize_1.Sequelize(environments_1.environment.BASE_DATOS, environments_1.environment.USUARIO, environments_1.environment.PASSWORD, {
    host: environments_1.environment.HOST,
    dialect: 'mysql',
    pool: {
        max: 10,
        min: 0,
        acquire: 60000,
        idle: 10000
    }
});
exports.default = db;
//# sourceMappingURL=connection.js.map