"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const connection_1 = __importDefault(require("../db/connection"));
const usuario_1 = __importDefault(require("../routes/usuario"));
const auth_1 = __importDefault(require("../routes/auth"));
const area_1 = __importDefault(require("../routes/area"));
const role_1 = __importDefault(require("../routes/role"));
const upload_1 = __importDefault(require("../routes/upload"));
const docente_1 = __importDefault(require("../routes/docente"));
const tipodocumento_1 = __importDefault(require("../routes/tipodocumento"));
const nivel_1 = __importDefault(require("../routes/nivel"));
const grado_1 = __importDefault(require("../routes/grado"));
const seccion_1 = __importDefault(require("../routes/seccion"));
const persona_1 = __importDefault(require("../routes/persona"));
const alumno_1 = __importDefault(require("../routes/alumno"));
const aula_1 = __importDefault(require("../routes/aula"));
const periodo_1 = __importDefault(require("../routes/periodo"));
const programacion_1 = __importDefault(require("../routes/programacion"));
const matricula_1 = __importDefault(require("../routes/matricula"));
const nota_1 = __importDefault(require("../routes/nota"));
const ciclo_1 = __importDefault(require("../routes/ciclo"));
const evaluacion_1 = __importDefault(require("../routes/evaluacion"));
const material_1 = __importDefault(require("../routes/material"));
const asistencia_1 = __importDefault(require("../routes/asistencia"));
const situacion_1 = __importDefault(require("../routes/situacion"));
const institucion_1 = __importDefault(require("../routes/institucion"));
const hora_1 = __importDefault(require("../routes/hora"));
const horario_1 = __importDefault(require("../routes/horario"));
const rango_1 = __importDefault(require("../routes/rango"));
const semilla_1 = require("../seeders/semilla");
const pdf_1 = __importDefault(require("../routes/pdf"));
const mensajeria_1 = __importDefault(require("../routes/mensajeria"));
const padre_1 = __importDefault(require("../routes/padre"));
const madre_1 = __importDefault(require("../routes/madre"));
const competencia_1 = __importDefault(require("../routes/competencia"));
const matriculadetalle_1 = __importDefault(require("../routes/matriculadetalle"));
const auxiliar_1 = __importDefault(require("../routes/auxiliar"));
const director_1 = __importDefault(require("../routes/director"));
const apreciacion_1 = __importDefault(require("../routes/apreciacion"));
const responsable_1 = __importDefault(require("../routes/responsable"));
const apreciaciondetalle_1 = __importDefault(require("../routes/apreciaciondetalle"));
class Server {
    constructor() {
        this.llave = false;
        this.apiPaths = {
            usuarios: '/api/usuarios',
            auth: '/api/auth',
            areas: '/api/areas',
            roles: '/api/roles',
            subareas: '/api/subareas',
            uploads: '/api/uploads',
            docentes: '/api/docentes',
            tipodocumentos: '/api/tipodocumentos',
            niveles: '/api/niveles',
            grados: '/api/grados',
            secciones: '/api/secciones',
            personas: '/api/personas',
            alumnos: '/api/alumnos',
            apoderados: '/api/apoderados',
            aulas: '/api/aulas',
            periodos: '/api/periodos',
            programaciones: '/api/programaciones',
            matriculas: '/api/matriculas',
            notas: '/api/notas',
            ciclos: '/api/ciclos',
            evaluaciones: '/api/evaluaciones',
            materiales: '/api/materiales',
            asistencias: '/api/asistencias',
            pdfs: '/api/pdfs',
            situaciones: '/api/situaciones',
            instituciones: '/api/instituciones',
            horas: '/api/horas',
            horarios: '/api/horarios',
            rangos: '/api/rangos',
            mensajerias: '/api/mensajerias',
            padres: '/api/padres',
            madres: '/api/madres',
            competencias: '/api/competencias',
            matriculadetalles: '/api/matriculadetalles',
            auxiliares: '/api/auxiliares',
            directores: '/api/directores',
            apreciaciones: '/api/apreciaciones',
            responsables: '/api/responsables',
            apreciaciondetalles: '/api/apreciaciondetalles'
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '8000';
        this.dbConnection();
        this.middlewares();
        this.routes();
    }
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.sync({ force: this.llave }).then(() => {
                    if (this.llave) {
                        (0, semilla_1.dbSeed)();
                    }
                    else {
                        console.log("No execution seed");
                    }
                });
                console.log('Database online');
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    middlewares() {
        // Cors
        this.app.use((0, cors_1.default)());
        // Lectura del body
        this.app.use(express_1.default.json());
        // Carpeta publica
        this.app.use(express_1.default.static('public'));
    }
    routes() {
        this.app.use(this.apiPaths.usuarios, usuario_1.default);
        this.app.use(this.apiPaths.auth, auth_1.default);
        this.app.use(this.apiPaths.areas, area_1.default);
        this.app.use(this.apiPaths.roles, role_1.default);
        this.app.use(this.apiPaths.uploads, upload_1.default);
        this.app.use(this.apiPaths.docentes, docente_1.default);
        this.app.use(this.apiPaths.tipodocumentos, tipodocumento_1.default);
        this.app.use(this.apiPaths.niveles, nivel_1.default);
        this.app.use(this.apiPaths.grados, grado_1.default);
        this.app.use(this.apiPaths.secciones, seccion_1.default);
        this.app.use(this.apiPaths.personas, persona_1.default);
        this.app.use(this.apiPaths.alumnos, alumno_1.default);
        this.app.use(this.apiPaths.aulas, aula_1.default);
        this.app.use(this.apiPaths.periodos, periodo_1.default);
        this.app.use(this.apiPaths.programaciones, programacion_1.default);
        this.app.use(this.apiPaths.matriculas, matricula_1.default);
        this.app.use(this.apiPaths.notas, nota_1.default);
        this.app.use(this.apiPaths.ciclos, ciclo_1.default);
        this.app.use(this.apiPaths.evaluaciones, evaluacion_1.default);
        this.app.use(this.apiPaths.materiales, material_1.default);
        this.app.use(this.apiPaths.asistencias, asistencia_1.default);
        this.app.use(this.apiPaths.situaciones, situacion_1.default);
        this.app.use(this.apiPaths.pdfs, pdf_1.default);
        this.app.use(this.apiPaths.instituciones, institucion_1.default);
        this.app.use(this.apiPaths.horas, hora_1.default);
        this.app.use(this.apiPaths.horarios, horario_1.default);
        this.app.use(this.apiPaths.rangos, rango_1.default);
        this.app.use(this.apiPaths.mensajerias, mensajeria_1.default);
        this.app.use(this.apiPaths.padres, padre_1.default);
        this.app.use(this.apiPaths.madres, madre_1.default);
        this.app.use(this.apiPaths.competencias, competencia_1.default);
        this.app.use(this.apiPaths.matriculadetalles, matriculadetalle_1.default);
        this.app.use(this.apiPaths.auxiliares, auxiliar_1.default);
        this.app.use(this.apiPaths.directores, director_1.default);
        this.app.use(this.apiPaths.apreciaciones, apreciacion_1.default);
        this.app.use(this.apiPaths.responsables, responsable_1.default);
        this.app.use(this.apiPaths.apreciaciondetalles, apreciaciondetalle_1.default);
        this.app.get('*', (req, res) => {
            res.sendFile(path_1.default.resolve(__dirname, '../../public/index.html'));
        });
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log("Servidor corriendo en el puerto: " + this.port);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map