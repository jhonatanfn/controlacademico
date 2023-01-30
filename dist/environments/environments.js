"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = void 0;
exports.environment = {
    /* LOCAL
      HOST: 'localhost',
      BASE_DATOS: 'bdcolegio',
      USUARIO: 'root',
      PASSWORD: '',
    */
    /*CLEVERCLOUD */
    HOST: process.env.HOST || 'bwz9w5r5qvtblhvj3fvj-mysql.services.clever-cloud.com',
    BASE_DATOS: process.env.BASE_DATOS || 'bwz9w5r5qvtblhvj3fvj',
    USUARIO: process.env.USUARIO || 'u354a4jbczsjnjxd',
    PASSWORD: process.env.PASSWORD || 'QaJkMVf9yXyHGkBpeipw',
    PORT: Number(process.env.DB_PORT) || 3306
    /*CLEVERCLOUD2
      HOST: 'b3sifwpmanjto43xfyxb-mysql.services.clever-cloud.com',
      BASE_DATOS: 'b3sifwpmanjto43xfyxb',
      USUARIO: 'uv6pimggigpi2qc1',
      PASSWORD: 'WWpMBGbbX2rKERyADobM',
    */
};
//# sourceMappingURL=environments.js.map