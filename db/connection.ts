import { Sequelize } from 'sequelize';
import { environment } from '../environments/environments';

const db= new Sequelize(
    environment.BASE_DATOS,
    environment.USUARIO,
    environment.PASSWORD,{
            host: environment.HOST, 
            dialect:'mysql',
            pool: {
                max: 10,
                min: 0,
                acquire: 60000,
                idle: 10000
            }
    });

export default db;