"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbSeed = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const area_1 = __importDefault(require("../models/area"));
const persona_1 = __importDefault(require("../models/persona"));
const role_1 = __importDefault(require("../models/role"));
const tipodocumento_1 = __importDefault(require("../models/tipodocumento"));
const usuario_1 = __importDefault(require("../models/usuario"));
const docente_1 = __importDefault(require("../models/docente"));
const alumno_1 = __importDefault(require("../models/alumno"));
const nivel_1 = __importDefault(require("../models/nivel"));
const grado_1 = __importDefault(require("../models/grado"));
const seccion_1 = __importDefault(require("../models/seccion"));
const aula_1 = __importDefault(require("../models/aula"));
const programacion_1 = __importDefault(require("../models/programacion"));
const periodo_1 = __importDefault(require("../models/periodo"));
const evaluacion_1 = __importDefault(require("../models/evaluacion"));
const ciclo_1 = __importDefault(require("../models/ciclo"));
const matricula_1 = __importDefault(require("../models/matricula"));
const seed_local = __importStar(require("./seed_local"));
const seed_heroku = __importStar(require("./seed_heroku"));
const situacion_1 = __importDefault(require("../models/situacion"));
const institucion_1 = __importDefault(require("../models/institucion"));
const hora_1 = __importDefault(require("../models/hora"));
const rango_1 = __importDefault(require("../models/rango"));
const mensajeria_1 = __importDefault(require("../models/mensajeria"));
const director_1 = __importDefault(require("../models/director"));
const competencia_1 = __importDefault(require("../models/competencia"));
const responsable_1 = __importDefault(require("../models/responsable"));
const padre_1 = __importDefault(require("../models/padre"));
const madre_1 = __importDefault(require("../models/madre"));
const matriculadetalle_1 = __importDefault(require("../models/matriculadetalle"));
const auxiliar_1 = __importDefault(require("../models/auxiliar"));
const dbSeed = () => {
    const llave = true;
    const salt = bcryptjs_1.default.genSaltSync();
    if (llave) {
        seed_local.instituciones.forEach(institucion => {
            institucion_1.default.create(institucion);
        });
        seed_local.roles.forEach(rol => {
            role_1.default.create(rol);
        });
        seed_local.situaciones.forEach(situacion => {
            situacion_1.default.create(situacion);
        });
        seed_local.areas.forEach(area => {
            area_1.default.create(area);
        });
        seed_local.competencias.forEach(competencia => {
            competencia_1.default.create(competencia);
        });
        seed_local.tipodocumentos.forEach(tipodocumento => {
            tipodocumento_1.default.create(tipodocumento);
        });
        seed_local.niveles.forEach(nivel => {
            nivel_1.default.create(nivel);
        });
        seed_local.grados.forEach(grado => {
            grado_1.default.create(grado);
        });
        seed_local.secciones.forEach(seccion => {
            seccion_1.default.create(seccion);
        });
        seed_local.periodos.forEach(periodo => {
            periodo_1.default.create(periodo);
        });
        seed_local.evaluaciones.forEach(evaluacion => {
            evaluacion_1.default.create(evaluacion);
        });
        seed_local.ciclos.forEach(ciclo => {
            ciclo_1.default.create(ciclo);
        });
        seed_local.horas.forEach(hora => {
            hora_1.default.create(hora);
        });
        seed_local.rangos.forEach(rango => {
            rango_1.default.create(rango);
        });
        seed_local.personas.forEach(persona => {
            persona_1.default.create(persona);
        });
        seed_local.usuarios.forEach(usuario => {
            usuario.password = bcryptjs_1.default.hashSync(usuario.password, salt);
            usuario_1.default.create(usuario);
        });
        seed_local.docentes.forEach(docente => {
            docente_1.default.create(docente);
        });
        seed_local.padres.forEach(padre => {
            padre_1.default.create(padre);
        });
        seed_local.madres.forEach(madre => {
            madre_1.default.create(madre);
        });
        seed_local.responsables.forEach(reponsable => {
            responsable_1.default.create(reponsable);
        });
        seed_local.alumnos.forEach(alumno => {
            alumno_1.default.create(alumno);
        });
        seed_local.auxiliares.forEach(auxiliar => {
            auxiliar_1.default.create(auxiliar);
        });
        seed_local.directores.forEach(director => {
            director_1.default.create(director);
        });
        seed_local.aulas.forEach(aula => {
            aula_1.default.create(aula);
        });
        seed_local.programaciones.forEach(programacion => {
            programacion_1.default.create(programacion);
        });
        seed_local.matriculas.forEach(matricula => {
            matricula_1.default.create(matricula);
        });
        seed_local.matriculadetalles.forEach(matriculadetalle => {
            matriculadetalle_1.default.create(matriculadetalle);
        });
        seed_local.mensajerias.forEach(mensajeria => {
            mensajeria_1.default.create(mensajeria);
        });
    }
    else {
        seed_heroku.instituciones.forEach(institucion => {
            institucion_1.default.create(institucion);
        });
        seed_heroku.roles.forEach(rol => {
            role_1.default.create(rol);
        });
        seed_heroku.situaciones.forEach(situacion => {
            situacion_1.default.create(situacion);
        });
        seed_heroku.areas.forEach(area => {
            area_1.default.create(area);
        });
        seed_heroku.competencias.forEach(competencia => {
            competencia_1.default.create(competencia);
        });
        seed_heroku.tipodocumentos.forEach(tipodocumento => {
            tipodocumento_1.default.create(tipodocumento);
        });
        seed_heroku.niveles.forEach(nivel => {
            nivel_1.default.create(nivel);
        });
        seed_heroku.grados.forEach(grado => {
            grado_1.default.create(grado);
        });
        seed_heroku.secciones.forEach(seccion => {
            seccion_1.default.create(seccion);
        });
        seed_heroku.periodos.forEach(periodo => {
            periodo_1.default.create(periodo);
        });
        seed_heroku.evaluaciones.forEach(evaluacion => {
            evaluacion_1.default.create(evaluacion);
        });
        seed_heroku.ciclos.forEach(ciclo => {
            ciclo_1.default.create(ciclo);
        });
        seed_heroku.horas.forEach(hora => {
            hora_1.default.create(hora);
        });
        seed_heroku.rangos.forEach(rango => {
            rango_1.default.create(rango);
        });
        seed_heroku.personas.forEach(persona => {
            persona_1.default.create(persona);
        });
        seed_heroku.usuarios.forEach(usuario => {
            usuario.password = bcryptjs_1.default.hashSync(usuario.password, salt);
            usuario_1.default.create(usuario);
        });
        seed_heroku.docentes.forEach(docente => {
            docente_1.default.create(docente);
        });
        seed_heroku.padres.forEach(padre => {
            padre_1.default.create(padre);
        });
        seed_heroku.madres.forEach(madre => {
            madre_1.default.create(madre);
        });
        seed_heroku.responsables.forEach(reponsable => {
            responsable_1.default.create(reponsable);
        });
        seed_heroku.alumnos.forEach(alumno => {
            alumno_1.default.create(alumno);
        });
        seed_heroku.auxiliares.forEach(auxiliar => {
            auxiliar_1.default.create(auxiliar);
        });
        seed_heroku.directores.forEach(director => {
            director_1.default.create(director);
        });
        seed_heroku.aulas.forEach(aula => {
            aula_1.default.create(aula);
        });
        seed_heroku.programaciones.forEach(programacion => {
            programacion_1.default.create(programacion);
        });
        seed_heroku.matriculas.forEach(matricula => {
            matricula_1.default.create(matricula);
        });
        seed_heroku.matriculadetalles.forEach(matriculadetalle => {
            matriculadetalle_1.default.create(matriculadetalle);
        });
        seed_heroku.mensajerias.forEach(mensajeria => {
            mensajeria_1.default.create(mensajeria);
        });
    }
};
exports.dbSeed = dbSeed;
//# sourceMappingURL=semilla.js.map