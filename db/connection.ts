import { Sequelize } from 'sequelize';
import { environment } from '../environments/environments';

const db= new Sequelize(
    process.env.BASE_DATOS || environment.BASE_DATOS,
    process.env.USUARIO || environment.USUARIO,
    process.env.PASSWORD || environment.PASSWORD,{
            host: process.env.HOST || environment.HOST,
            dialect:'mysql',
            pool: {
                max: 10,
                min: 0,
                acquire: 60000,
                idle: 10000
            }
    });

export default db;