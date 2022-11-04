"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const usuario_1 = __importDefault(require("../models/usuario"));
const area_1 = __importDefault(require("../models/area"));
const role_1 = __importDefault(require("../models/role"));
const tipodocumento_1 = __importDefault(require("../models/tipodocumento"));
const persona_1 = __importDefault(require("../models/persona"));
const docente_1 = __importDefault(require("../models/docente"));
const alumno_1 = __importDefault(require("../models/alumno"));
const grado_1 = __importDefault(require("../models/grado"));
const seccion_1 = __importDefault(require("../models/seccion"));
const nivel_1 = __importDefault(require("../models/nivel"));
const aula_1 = __importDefault(require("../models/aula"));
const programacion_1 = __importDefault(require("../models/programacion"));
const periodo_1 = __importDefault(require("../models/periodo"));
const matricula_1 = __importDefault(require("../models/matricula"));
const nota_1 = __importDefault(require("../models/nota"));
const evaluacion_1 = __importDefault(require("../models/evaluacion"));
const ciclo_1 = __importDefault(require("../models/ciclo"));
const material_1 = __importDefault(require("../models/material"));
const asistencia_1 = __importDefault(require("../models/asistencia"));
const situacion_1 = __importDefault(require("../models/situacion"));
const hora_1 = __importDefault(require("../models/hora"));
const horario_1 = __importDefault(require("../models/horario"));
const competencia_1 = __importDefault(require("../models/competencia"));
const matriculadetalle_1 = __importDefault(require("../models/matriculadetalle"));
const auxiliar_1 = __importDefault(require("../models/auxiliar"));
const director_1 = __importDefault(require("../models/director"));
const apreciacion_1 = __importDefault(require("../models/apreciacion"));
const responsable_1 = __importDefault(require("../models/responsable"));
const padre_1 = __importDefault(require("../models/padre"));
const madre_1 = __importDefault(require("../models/madre"));
const apreciaciondetalle_1 = __importDefault(require("../models/apreciaciondetalle"));
role_1.default.hasMany(usuario_1.default, {
    as: 'usuario',
});
usuario_1.default.belongsTo(role_1.default, {
    as: 'role'
});
area_1.default.hasMany(competencia_1.default, {
    as: 'competencia'
});
competencia_1.default.belongsTo(area_1.default, {
    as: 'area'
});
tipodocumento_1.default.hasMany(persona_1.default, {
    as: 'persona'
});
persona_1.default.belongsTo(tipodocumento_1.default, {
    as: 'tipodocumento'
});
persona_1.default.hasOne(docente_1.default, {
    as: 'docente'
});
docente_1.default.belongsTo(persona_1.default, {
    as: 'persona'
});
persona_1.default.hasOne(alumno_1.default, {
    as: 'alumno'
});
alumno_1.default.belongsTo(persona_1.default, {
    as: 'persona'
});
persona_1.default.hasMany(usuario_1.default, {
    as: 'usuario'
});
usuario_1.default.belongsTo(persona_1.default, {
    as: 'persona'
});
padre_1.default.hasMany(alumno_1.default, { as: 'alumno' });
alumno_1.default.belongsTo(padre_1.default, { as: 'padre' });
madre_1.default.hasMany(alumno_1.default, { as: 'alumno' });
alumno_1.default.belongsTo(madre_1.default, { as: 'madre' });
responsable_1.default.hasMany(alumno_1.default, { as: 'alumno' });
alumno_1.default.belongsTo(responsable_1.default, { as: 'responsable' });
persona_1.default.hasOne(padre_1.default, { as: 'padre' });
padre_1.default.belongsTo(persona_1.default, { as: 'persona' });
persona_1.default.hasOne(madre_1.default, { as: 'madre' });
madre_1.default.belongsTo(persona_1.default, { as: 'persona' });
persona_1.default.hasOne(responsable_1.default, { as: 'responsable' });
responsable_1.default.belongsTo(persona_1.default, { as: 'persona' });
nivel_1.default.hasMany(aula_1.default, {
    as: 'aula'
});
aula_1.default.belongsTo(nivel_1.default, {
    as: 'nivel'
});
grado_1.default.hasMany(aula_1.default, {
    as: 'aula'
});
aula_1.default.belongsTo(grado_1.default, {
    as: 'grado'
});
seccion_1.default.hasMany(aula_1.default, {
    as: 'aula'
});
aula_1.default.belongsTo(seccion_1.default, {
    as: 'seccion'
});
aula_1.default.hasMany(programacion_1.default, {
    as: 'programacion'
});
programacion_1.default.belongsTo(aula_1.default, {
    as: 'aula'
});
docente_1.default.hasMany(programacion_1.default, {
    as: 'programacion'
});
programacion_1.default.belongsTo(docente_1.default, {
    as: 'docente'
});
periodo_1.default.hasMany(programacion_1.default, {
    as: 'programacion'
});
programacion_1.default.belongsTo(periodo_1.default, {
    as: 'periodo'
});
area_1.default.hasMany(programacion_1.default, {
    as: 'programacion'
});
programacion_1.default.belongsTo(area_1.default, {
    as: 'area'
});
alumno_1.default.hasMany(matricula_1.default, {
    as: 'matricula'
});
matricula_1.default.belongsTo(alumno_1.default, {
    as: 'alumno'
});
matricula_1.default.hasMany(matriculadetalle_1.default, {
    as: 'matriculadetalle'
});
matriculadetalle_1.default.belongsTo(matricula_1.default, {
    as: 'matricula'
});
programacion_1.default.hasMany(matriculadetalle_1.default, {
    as: 'matriculadetalle'
});
matriculadetalle_1.default.belongsTo(programacion_1.default, {
    as: 'programacion'
});
matriculadetalle_1.default.hasMany(nota_1.default, {
    as: 'nota'
});
nota_1.default.belongsTo(matriculadetalle_1.default, {
    as: 'matriculadetalle'
});
evaluacion_1.default.hasMany(nota_1.default, {
    as: 'nota'
});
nota_1.default.belongsTo(evaluacion_1.default, {
    as: 'evaluacion'
});
ciclo_1.default.hasMany(nota_1.default, {
    as: 'nota'
});
nota_1.default.belongsTo(ciclo_1.default, {
    as: 'ciclo'
});
competencia_1.default.hasMany(nota_1.default, {
    as: 'nota'
});
nota_1.default.belongsTo(competencia_1.default, {
    as: 'competencia'
});
matriculadetalle_1.default.hasMany(asistencia_1.default, {
    as: 'asistencia'
});
asistencia_1.default.belongsTo(matriculadetalle_1.default, {
    as: 'matriculadetalle'
});
situacion_1.default.hasMany(asistencia_1.default, {
    as: 'asistencia'
});
asistencia_1.default.belongsTo(situacion_1.default, {
    as: 'situacion'
});
hora_1.default.hasMany(horario_1.default, {
    as: 'horario'
});
horario_1.default.belongsTo(hora_1.default, {
    as: 'hora'
});
programacion_1.default.hasMany(horario_1.default, {
    as: 'horario'
});
horario_1.default.belongsTo(programacion_1.default, {
    as: 'programacion'
});
programacion_1.default.hasMany(material_1.default, {
    as: 'material'
});
material_1.default.belongsTo(programacion_1.default, {
    as: 'programacion'
});
persona_1.default.hasOne(auxiliar_1.default, {
    as: 'auxiliar'
});
auxiliar_1.default.belongsTo(persona_1.default, {
    as: 'persona'
});
persona_1.default.hasOne(director_1.default, {
    as: 'director'
});
director_1.default.belongsTo(persona_1.default, {
    as: 'persona'
});
periodo_1.default.hasMany(apreciacion_1.default, {
    as: 'apreciacion'
});
apreciacion_1.default.belongsTo(periodo_1.default, {
    as: 'periodo'
});
alumno_1.default.hasMany(apreciacion_1.default, {
    as: 'apreciacion'
});
apreciacion_1.default.belongsTo(alumno_1.default, {
    as: 'alumno'
});
apreciacion_1.default.hasMany(apreciaciondetalle_1.default, {
    as: 'apreciaciondetalle'
});
apreciaciondetalle_1.default.belongsTo(apreciacion_1.default, {
    as: 'apreciacion'
});
//# sourceMappingURL=associations.js.map