"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.materiales = exports.notas = exports.matriculas = exports.programaciones = exports.aulas = exports.alumnos = exports.apoderados = exports.docentes = exports.usuarios = exports.personas = exports.subareas = exports.ciclos = exports.evaluaciones = exports.periodos = exports.secciones = exports.grados = exports.niveles = exports.tipodocumentos = exports.areas = exports.roles = void 0;
const moment_1 = __importDefault(require("moment"));
exports.roles = [
    { nombre: "ADMINISTRADOR" },
    { nombre: "DOCENTE" },
    { nombre: "ALUMNO" }
];
exports.areas = [
    { nombre: "MATEMATICA" },
    { nombre: "COMUNICACION" },
    { nombre: "INGLES" },
    { nombre: "CIENCIAS SOCIALES" },
    { nombre: "CIENCIA Y TECNOLOGIA" }
];
exports.tipodocumentos = [
    { nombre: 'DNI' },
    { nombre: 'CEDULA' }
];
exports.niveles = [
    { nombre: 'INICIAL' },
    { nombre: 'PRIMARIA' },
    { nombre: 'SECUNDARIA' }
];
exports.grados = [
    { nombre: '3 AÑOS' },
    { nombre: '4 AÑOS' },
    { nombre: '5 AÑOS' },
    { nombre: 'PRIMERO' },
    { nombre: 'SEGUNDO' },
    { nombre: 'TERCERO' },
    { nombre: 'CUARTO' },
    { nombre: 'QUINTO' },
    { nombre: 'SEXTO' }
];
exports.secciones = [
    { nombre: 'UNICA' }
];
exports.periodos = [
    { nombre: '2022' }
];
exports.evaluaciones = [
    { nombre: 'PRACTICA' },
    { nombre: 'TRABAJO' },
    { nombre: 'INTERVENCION ORAL' },
    { nombre: 'EXAMEN' }
];
exports.ciclos = [
    { nombre: 'BIMESTRE 1' },
    { nombre: 'BIMESTRE 2' },
    { nombre: 'BIMESTRE 3' },
    { nombre: 'BIMESTRE 4' }
];
exports.subareas = [
    { nombre: "ALGEBRA", areaId: 4 },
    { nombre: "GEOMETRIA", areaId: 4 },
    { nombre: "ARITMETICA", areaId: 4 },
    { nombre: "RAZ.LOGICO", areaId: 4 },
    { nombre: "RAZ.MAT I", areaId: 4 },
    { nombre: "TRIGONOMETRIA", areaId: 4 },
    { nombre: "LENGUA", areaId: 14 },
    { nombre: "LITERATURA", areaId: 14 },
    { nombre: "RAZ. VERBAL", areaId: 14 },
    { nombre: "INGLES", areaId: 24 },
    { nombre: "CIENCIAS SOCIALES", areaId: 34 },
    { nombre: "FISICA", areaId: 44 },
    { nombre: "QUIMICA", areaId: 44 },
    { nombre: "BIOLOGIA", areaId: 44 },
];
exports.personas = [
    /* administrador*/
    { numero: '46556963', nombres: 'DARWIN JHONATAN', apellidopaterno: 'FLORES', apellidomaterno: 'NUÑEZ', tipodocumentoId: 4 },
    /* docentes*/
    { numero: '44409214', nombres: 'FLAVIO', apellidopaterno: 'GARCIA', apellidomaterno: 'RIVERA', tipodocumentoId: 4 },
    { numero: '46378155', nombres: 'MILAGROS ANALY', apellidopaterno: 'GOMEZ', apellidomaterno: 'ENCALADA', tipodocumentoId: 4 },
    { numero: '40357419', nombres: 'JOSE JAVIER', apellidopaterno: 'YARLEQUE', apellidomaterno: 'VILCHEZ', tipodocumentoId: 4 },
    { numero: '40213876', nombres: 'DANTE JOEL', apellidopaterno: 'CABREJOS', apellidomaterno: 'REYES', tipodocumentoId: 4 },
    /* apoderados*/
    { numero: '42215224', nombres: 'ROSA MIRELLA', apellidopaterno: 'JUAREZ', apellidomaterno: 'CARAMANTIN', tipodocumentoId: 4 },
    { numero: '33668077', nombres: 'JAIME RICARDO', apellidopaterno: 'PINTADO', apellidomaterno: 'CALLE', tipodocumentoId: 4 },
    { numero: '42136288', nombres: 'SINTHIA', apellidopaterno: 'DIONISIO', apellidomaterno: 'CORDOVA', tipodocumentoId: 4 },
    { numero: '40134863', nombres: 'ROXANA DEL PILAR', apellidopaterno: 'ANASTACIO', apellidomaterno: 'CAMPOS', tipodocumentoId: 4 },
    { numero: '41979708', nombres: 'CORDOVA', apellidopaterno: 'VILLEGAS', apellidomaterno: 'JOHANNA IVONNE', tipodocumentoId: 4 },
    { numero: '28032999', nombres: 'BERTHA ANA', apellidopaterno: 'SALDARRIAGA', apellidomaterno: 'MORAN', tipodocumentoId: 4 },
    { numero: '80446280', nombres: 'MARTHA', apellidopaterno: 'QUISPE', apellidomaterno: 'SAUCEDO', tipodocumentoId: 4 },
    { numero: '25431443', nombres: 'MARTIN', apellidopaterno: 'CHUICA', apellidomaterno: 'ADRIANZEN', tipodocumentoId: 4 },
    { numero: '33666766', nombres: 'ROSA MIRELLA', apellidopaterno: 'ADRIANZEN', apellidomaterno: 'CHERRES', tipodocumentoId: 4 },
    { numero: '46538404', nombres: 'KAREN YENYFFER', apellidopaterno: 'PACHERRES', apellidomaterno: 'ODAR', tipodocumentoId: 4 },
    /* alumnos*/
    { numero: '67675770', nombres: 'ADRIANA FERNANDA', apellidopaterno: 'MORE', apellidomaterno: 'JUAREZ', tipodocumentoId: 4 },
    { numero: '34776686', nombres: 'RICARDO GLEISSNER', apellidopaterno: 'PINTADO', apellidomaterno: 'ORDOÑEZ', tipodocumentoId: 4 },
    { numero: '66796519', nombres: 'MARCO OSVALDO', apellidopaterno: 'TORRES', apellidomaterno: 'DIONISIO', tipodocumentoId: 4 },
    { numero: '23522439', nombres: 'ANDERSON ASAEL', apellidopaterno: 'LOZADA', apellidomaterno: 'ANASTACIO', tipodocumentoId: 4 },
    { numero: '94375916', nombres: 'KEVIN', apellidopaterno: 'PALACIOS', apellidomaterno: 'CORDOVA', tipodocumentoId: 4 },
    { numero: '79069307', nombres: 'ALONSO', apellidopaterno: 'INGA', apellidomaterno: 'SALDARRIAGA', tipodocumentoId: 4 },
    { numero: '56066411', nombres: 'MARIA FERNANDA', apellidopaterno: 'JIMENEZ', apellidomaterno: 'QUISPE', tipodocumentoId: 4 },
    { numero: '93625136', nombres: 'JUNIOR MARTIN', apellidopaterno: 'CHUICA', apellidomaterno: 'MONTENEGRO', tipodocumentoId: 4 },
    { numero: '95831424', nombres: 'ALEXANDRA', apellidopaterno: 'CORNEJO', apellidomaterno: 'ADRIANZEN', tipodocumentoId: 4 },
    { numero: '18205639', nombres: 'DANNA', apellidopaterno: 'DURAN', apellidomaterno: 'PACHERRES', tipodocumentoId: 4 },
    /* desconocido*/
    { numero: '00000000', nombres: 'DESCONOCIDO', apellidopaterno: 'DESCONOCIDO', apellidomaterno: 'DESCONOCIDO', tipodocumentoId: 4 }
];
exports.usuarios = [
    /* administrador*/
    { nombre: "Jhonatan", email: "jhonatan@iepgutemberg.com", password: "123456", roleId: 4, personaId: 4 },
    /* docentes*/
    { nombre: "Flavio", email: "flavio@iepgutemberg.com", password: "123456", roleId: 14, personaId: 14 },
    { nombre: "Milagros", email: "milagros@iepgutemberg.com", password: "123456", roleId: 14, personaId: 24 },
    { nombre: "Jose", email: "jose@iepgutemberg.com", password: "123456", roleId: 14, personaId: 34 },
    { nombre: "Dante", email: "dante@iepgutemberg.com", password: "123456", roleId: 14, personaId: 44 },
    /* alumnos*/
    { nombre: "Adriana", email: "adriana@iepgutemberg.com", password: "123456", roleId: 24, personaId: 154 },
    { nombre: "Ricardo", email: "ricardo@iepgutemberg.com", password: "123456", roleId: 24, personaId: 164 },
    { nombre: "Marco", email: "marco@iepgutemberg.com", password: "123456", roleId: 24, personaId: 174 },
    { nombre: "Anderson", email: "anderson@iepgutemberg.com", password: "123456", roleId: 24, personaId: 184 },
    { nombre: "Kevin", email: "kevin@iepgutemberg.com", password: "123456", roleId: 24, personaId: 194 },
    { nombre: "Alonso", email: "alonso@iepgutemberg.com", password: "123456", roleId: 24, personaId: 204 },
    { nombre: "Maria", email: "maria@iepgutemberg.com", password: "123456", roleId: 24, personaId: 214 },
    { nombre: "Junior", email: "junior@iepgutemberg.com", password: "123456", roleId: 24, personaId: 224 },
    { nombre: "Alexandra", email: "alexandra@iepgutemberg.com", password: "123456", roleId: 24, personaId: 234 },
    { nombre: "Danna", email: "danna@iepgutemberg.com", password: "123456", roleId: 24, personaId: 244 },
];
exports.docentes = [
    { personaId: 14 },
    { personaId: 24 },
    { personaId: 34 },
    { personaId: 44 },
];
exports.apoderados = [
    { personaId: 54 },
    { personaId: 64 },
    { personaId: 74 },
    { personaId: 84 },
    { personaId: 94 },
    { personaId: 104 },
    { personaId: 114 },
    { personaId: 124 },
    { personaId: 134 },
    { personaId: 144 }
];
exports.alumnos = [
    { personaId: 154, apoderadoId: 4 },
    { personaId: 164, apoderadoId: 14 },
    { personaId: 174, apoderadoId: 24 },
    { personaId: 184, apoderadoId: 34 },
    { personaId: 194, apoderadoId: 44 },
    { personaId: 204, apoderadoId: 54 },
    { personaId: 214, apoderadoId: 64 },
    { personaId: 224, apoderadoId: 74 },
    { personaId: 234, apoderadoId: 84 },
    { personaId: 244, apoderadoId: 94 }
];
exports.aulas = [
    { nombre: 'AULA 3 AÑOS', nivelId: 4, gradoId: 4, seccionId: 4 },
    { nombre: 'AULA 4 AÑOS', nivelId: 4, gradoId: 14, seccionId: 4 },
    { nombre: 'AULA 5 AÑOS', nivelId: 4, gradoId: 24, seccionId: 4 },
    { nombre: 'AULA 1 PRIMARIA', nivelId: 14, gradoId: 34, seccionId: 4 },
    { nombre: 'AULA 2 PRIMARIA', nivelId: 14, gradoId: 44, seccionId: 4 },
    { nombre: 'AULA 3 PRIMARIA', nivelId: 14, gradoId: 54, seccionId: 4 },
    { nombre: 'AULA 4 PRIMARIA', nivelId: 14, gradoId: 64, seccionId: 4 },
    { nombre: 'AULA 5 PRIMARIA', nivelId: 14, gradoId: 74, seccionId: 4 },
    { nombre: 'AULA 6 PRIMARIA', nivelId: 14, gradoId: 84, seccionId: 4 },
    { nombre: 'AULA 1 SECUNDARIA', nivelId: 24, gradoId: 34, seccionId: 4 },
    { nombre: 'AULA 2 SECUNDARIA', nivelId: 24, gradoId: 44, seccionId: 4 },
    { nombre: 'AULA 3 SECUNDARIA', nivelId: 24, gradoId: 54, seccionId: 4 },
    { nombre: 'AULA 4 SECUNDARIA', nivelId: 24, gradoId: 64, seccionId: 4 },
    { nombre: 'AULA 5 SECUNDARIA', nivelId: 24, gradoId: 74, seccionId: 4 }
];
exports.programaciones = [
    { aulaId: 134, docenteId: 4, subareaId: 4, periodoId: 4 },
    { aulaId: 134, docenteId: 14, subareaId: 14, periodoId: 4 },
    { aulaId: 134, docenteId: 24, subareaId: 24, periodoId: 4 },
    { aulaId: 134, docenteId: 34, subareaId: 34, periodoId: 4 }
];
exports.matriculas = [
    { alumnoId: 4, programacionId: 4 },
    { alumnoId: 4, programacionId: 14 },
    { alumnoId: 4, programacionId: 24 },
    { alumnoId: 4, programacionId: 34 },
    { alumnoId: 14, programacionId: 4 },
    { alumnoId: 14, programacionId: 14 },
    { alumnoId: 14, programacionId: 24 },
    { alumnoId: 14, programacionId: 34 },
    { alumnoId: 24, programacionId: 4 },
    { alumnoId: 24, programacionId: 14 },
    { alumnoId: 24, programacionId: 24 },
    { alumnoId: 24, programacionId: 34 },
    { alumnoId: 34, programacionId: 4 },
    { alumnoId: 34, programacionId: 14 },
    { alumnoId: 34, programacionId: 24 },
    { alumnoId: 34, programacionId: 34 },
    { alumnoId: 44, programacionId: 4 },
    { alumnoId: 44, programacionId: 14 },
    { alumnoId: 44, programacionId: 24 },
    { alumnoId: 44, programacionId: 34 },
    { alumnoId: 54, programacionId: 4 },
    { alumnoId: 54, programacionId: 14 },
    { alumnoId: 54, programacionId: 24 },
    { alumnoId: 54, programacionId: 34 },
    { alumnoId: 64, programacionId: 4 },
    { alumnoId: 64, programacionId: 14 },
    { alumnoId: 64, programacionId: 24 },
    { alumnoId: 64, programacionId: 34 },
    { alumnoId: 74, programacionId: 4 },
    { alumnoId: 74, programacionId: 14 },
    { alumnoId: 74, programacionId: 24 },
    { alumnoId: 74, programacionId: 34 },
    { alumnoId: 84, programacionId: 4 },
    { alumnoId: 84, programacionId: 14 },
    { alumnoId: 84, programacionId: 24 },
    { alumnoId: 84, programacionId: 34 },
    { alumnoId: 94, programacionId: 4 },
    { alumnoId: 94, programacionId: 14 },
    { alumnoId: 94, programacionId: 24 },
    { alumnoId: 94, programacionId: 34 }
];
exports.notas = [
    { matriculaId: 4, evaluacionId: 4, cicloId: 4, valor: 14, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 4, evaluacionId: 14, cicloId: 4, valor: 12, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 14, evaluacionId: 4, cicloId: 4, valor: 10, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 14, evaluacionId: 14, cicloId: 4, valor: 16, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 24, evaluacionId: 4, cicloId: 4, valor: 11, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 24, evaluacionId: 14, cicloId: 4, valor: 19, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 34, evaluacionId: 4, cicloId: 4, valor: 12, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 34, evaluacionId: 14, cicloId: 4, valor: 17, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 44, evaluacionId: 4, cicloId: 4, valor: 6, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 44, evaluacionId: 14, cicloId: 4, valor: 15, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 54, evaluacionId: 4, cicloId: 4, valor: 20, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 54, evaluacionId: 14, cicloId: 4, valor: 18, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 64, evaluacionId: 4, cicloId: 4, valor: 14, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 64, evaluacionId: 14, cicloId: 4, valor: 14, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 74, evaluacionId: 4, cicloId: 4, valor: 12, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 74, evaluacionId: 14, cicloId: 4, valor: 11, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 84, evaluacionId: 4, cicloId: 4, valor: 10, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 84, evaluacionId: 14, cicloId: 4, valor: 7, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 94, evaluacionId: 4, cicloId: 4, valor: 16, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 94, evaluacionId: 14, cicloId: 4, valor: 15, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 104, evaluacionId: 4, cicloId: 4, valor: 14, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 104, evaluacionId: 14, cicloId: 4, valor: 20, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 114, evaluacionId: 4, cicloId: 4, valor: 17, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 114, evaluacionId: 14, cicloId: 4, valor: 13, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 124, evaluacionId: 4, cicloId: 4, valor: 11, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 124, evaluacionId: 14, cicloId: 4, valor: 12, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 134, evaluacionId: 4, cicloId: 4, valor: 16, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 134, evaluacionId: 14, cicloId: 4, valor: 10, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 144, evaluacionId: 4, cicloId: 4, valor: 9, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 144, evaluacionId: 14, cicloId: 4, valor: 13, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 154, evaluacionId: 4, cicloId: 4, valor: 11, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 154, evaluacionId: 14, cicloId: 4, valor: 13, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 164, evaluacionId: 4, cicloId: 4, valor: 10, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 164, evaluacionId: 14, cicloId: 4, valor: 10, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 174, evaluacionId: 4, cicloId: 4, valor: 10, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 174, evaluacionId: 14, cicloId: 4, valor: 14, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 184, evaluacionId: 4, cicloId: 4, valor: 17, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 184, evaluacionId: 14, cicloId: 4, valor: 13, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 194, evaluacionId: 4, cicloId: 4, valor: 18, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 194, evaluacionId: 14, cicloId: 4, valor: 19, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 204, evaluacionId: 4, cicloId: 4, valor: 15, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 204, evaluacionId: 14, cicloId: 4, valor: 12, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 214, evaluacionId: 4, cicloId: 4, valor: 14, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 214, evaluacionId: 14, cicloId: 4, valor: 11, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 224, evaluacionId: 4, cicloId: 4, valor: 10, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 224, evaluacionId: 14, cicloId: 4, valor: 12, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 234, evaluacionId: 4, cicloId: 4, valor: 9, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 234, evaluacionId: 14, cicloId: 4, valor: 11, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 244, evaluacionId: 4, cicloId: 4, valor: 8, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 244, evaluacionId: 14, cicloId: 4, valor: 4, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 254, evaluacionId: 4, cicloId: 4, valor: 18, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 254, evaluacionId: 14, cicloId: 4, valor: 18, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 264, evaluacionId: 4, cicloId: 4, valor: 12, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 264, evaluacionId: 14, cicloId: 4, valor: 12, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 274, evaluacionId: 4, cicloId: 4, valor: 18, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 274, evaluacionId: 14, cicloId: 4, valor: 11, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 284, evaluacionId: 4, cicloId: 4, valor: 16, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 284, evaluacionId: 14, cicloId: 4, valor: 12, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 294, evaluacionId: 4, cicloId: 4, valor: 11, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 294, evaluacionId: 14, cicloId: 4, valor: 14, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 304, evaluacionId: 4, cicloId: 4, valor: 12, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 304, evaluacionId: 14, cicloId: 4, valor: 10, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 314, evaluacionId: 4, cicloId: 4, valor: 16, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 314, evaluacionId: 14, cicloId: 4, valor: 16, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 324, evaluacionId: 4, cicloId: 4, valor: 17, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 324, evaluacionId: 14, cicloId: 4, valor: 13, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 334, evaluacionId: 4, cicloId: 4, valor: 20, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 334, evaluacionId: 14, cicloId: 4, valor: 13, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 344, evaluacionId: 4, cicloId: 4, valor: 12, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 344, evaluacionId: 14, cicloId: 4, valor: 14, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 354, evaluacionId: 4, cicloId: 4, valor: 15, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 354, evaluacionId: 14, cicloId: 4, valor: 12, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 364, evaluacionId: 4, cicloId: 4, valor: 12, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 364, evaluacionId: 14, cicloId: 4, valor: 12, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 374, evaluacionId: 4, cicloId: 4, valor: 18, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 374, evaluacionId: 14, cicloId: 4, valor: 14, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 384, evaluacionId: 4, cicloId: 4, valor: 12, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 384, evaluacionId: 14, cicloId: 4, valor: 12, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 394, evaluacionId: 4, cicloId: 4, valor: 14, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 394, evaluacionId: 14, cicloId: 4, valor: 14, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
];
exports.materiales = [
    { titulo: "Lorem ipsum dolor sit amet consectetur adipisicing elit", descripcion: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt quo itaque voluptatem nam, repellendus,assumenda consectetur unde distinctio vitae fugit id neque accusamus labore maiores quaerat laudantium inventore eligendi! ", programacionId: 4, fecha: (0, moment_1.default)().format('YYYY-MM-DD'), archivo: "https://res.cloudinary.com/archivos/image/upload/v1643918075/material/qnamfhnsgkkbs9rqearb.pdf" },
    { titulo: "Lorem ipsum dolor sit amet consectetur adipisicing elit", descripcion: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt quo itaque voluptatem nam, repellendus,assumenda consectetur unde distinctio vitae fugit id neque accusamus labore maiores quaerat laudantium inventore eligendi! ", programacionId: 4, fecha: (0, moment_1.default)().format('YYYY-MM-DD'), archivo: "https://res.cloudinary.com/archivos/image/upload/v1643918075/material/qnamfhnsgkkbs9rqearb.pdf" },
    { titulo: "Lorem ipsum dolor sit amet consectetur adipisicing elit", descripcion: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt quo itaque voluptatem nam, repellendus,assumenda consectetur unde distinctio vitae fugit id neque accusamus labore maiores quaerat laudantium inventore eligendi! ", programacionId: 14, fecha: (0, moment_1.default)().format('YYYY-MM-DD'), archivo: "https://res.cloudinary.com/archivos/image/upload/v1643918075/material/qnamfhnsgkkbs9rqearb.pdf" },
    { titulo: "Lorem ipsum dolor sit amet consectetur adipisicing elit", descripcion: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt quo itaque voluptatem nam, repellendus,assumenda consectetur unde distinctio vitae fugit id neque accusamus labore maiores quaerat laudantium inventore eligendi! ", programacionId: 14, fecha: (0, moment_1.default)().format('YYYY-MM-DD'), archivo: "https://res.cloudinary.com/archivos/image/upload/v1643918075/material/qnamfhnsgkkbs9rqearb.pdf" },
    { titulo: "Lorem ipsum dolor sit amet consectetur adipisicing elit", descripcion: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt quo itaque voluptatem nam, repellendus,assumenda consectetur unde distinctio vitae fugit id neque accusamus labore maiores quaerat laudantium inventore eligendi! ", programacionId: 24, fecha: (0, moment_1.default)().format('YYYY-MM-DD'), archivo: "https://res.cloudinary.com/archivos/image/upload/v1643918075/material/qnamfhnsgkkbs9rqearb.pdf" },
    { titulo: "Lorem ipsum dolor sit amet consectetur adipisicing elit", descripcion: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt quo itaque voluptatem nam, repellendus,assumenda consectetur unde distinctio vitae fugit id neque accusamus labore maiores quaerat laudantium inventore eligendi! ", programacionId: 24, fecha: (0, moment_1.default)().format('YYYY-MM-DD'), archivo: "https://res.cloudinary.com/archivos/image/upload/v1643918075/material/qnamfhnsgkkbs9rqearb.pdf" },
    { titulo: "Lorem ipsum dolor sit amet consectetur adipisicing elit", descripcion: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt quo itaque voluptatem nam, repellendus,assumenda consectetur unde distinctio vitae fugit id neque accusamus labore maiores quaerat laudantium inventore eligendi! ", programacionId: 34, fecha: (0, moment_1.default)().format('YYYY-MM-DD'), archivo: "https://res.cloudinary.com/archivos/image/upload/v1643918075/material/qnamfhnsgkkbs9rqearb.pdf" },
    { titulo: "Lorem ipsum dolor sit amet consectetur adipisicing elit", descripcion: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt quo itaque voluptatem nam, repellendus,assumenda consectetur unde distinctio vitae fugit id neque accusamus labore maiores quaerat laudantium inventore eligendi! ", programacionId: 34, fecha: (0, moment_1.default)().format('YYYY-MM-DD'), archivo: "https://res.cloudinary.com/archivos/image/upload/v1643918075/material/qnamfhnsgkkbs9rqearb.pdf" },
];
//# sourceMappingURL=seed.js.map