import dotenv from 'dotenv';
import Server from './server/server';
require('./db/associations');

// Configuracion de dotenv
dotenv.config();
const server = new Server();
server.listen();