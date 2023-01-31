import { Sequelize } from 'sequelize';
import { environment } from '../environments/environments';

const db = new Sequelize( 
    process.env.MYSQL_ADDON_DB || environment.BASE_DATOS,
    process.env.MYSQL_ADDON_USER || environment.USUARIO, 
    process.env.MYSQL_ADDON_PASSWORD || environment.PASSWORD,
    {
        host:  process.env.MYSQL_ADDON_HOST || environment.HOST,
        port: Number(process.env.MYSQL_ADDON_PORT) || 3306,
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            acquire: 90000,
            idle: 10000
        }
    });
export default db;

