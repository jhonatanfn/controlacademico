"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db = new sequelize_1.Sequelize(process.env.MYSQL_ADDON_DB || 'bdcolegio', process.env.MYSQL_ADDON_USER || 'root', process.env.MYSQL_ADDON_PASSWORD || '', {
    host: process.env.MYSQL_ADDON_HOST || 'localhost',
    port: Number(process.env.MYSQL_ADDON_PORT) || 3306,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 60000,
        idle: 10000
    }
});
exports.default = db;
//# sourceMappingURL=connection.js.map