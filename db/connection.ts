import { Sequelize } from 'sequelize';

const db = new Sequelize( 
    process.env.MYSQL_ADDON_DB || 'bdcolegio',
    process.env.MYSQL_ADDON_USER || 'root', 
    process.env.MYSQL_ADDON_PASSWORD || '',
    {
        host:  process.env.MYSQL_ADDON_HOST || 'localhost',
        port: Number(process.env.MYSQL_ADDON_PORT) || 3306,
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            acquire: 60000,
            idle: 10000
        }
    });
export default db;

