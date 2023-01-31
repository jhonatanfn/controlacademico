"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const environments_1 = require("../environments/environments");
const db = new sequelize_1.Sequelize(process.env.MYSQL_ADDON_DB || environments_1.environment.BASE_DATOS, process.env.MYSQL_ADDON_USER || environments_1.environment.USUARIO, process.env.MYSQL_ADDON_PASSWORD || environments_1.environment.PASSWORD, {
    host: process.env.MYSQL_ADDON_HOST || environments_1.environment.HOST,
    port: Number(process.env.MYSQL_ADDON_PORT) || 3306,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 90000,
        idle: 10000
    }
});
exports.default = db;
//# sourceMappingURL=connection.js.map