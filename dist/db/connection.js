"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const environments_1 = require("../environments/environments");
const db = new sequelize_1.Sequelize(process.env.BASE_DATOS || environments_1.environment.BASE_DATOS, process.env.USUARIO || environments_1.environment.USUARIO, process.env.PASSWORD || environments_1.environment.PASSWORD, {
    host: process.env.HOST || environments_1.environment.HOST,
    port: Number(process.env.DB_PORT) || environments_1.environment.DB_PORT,
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