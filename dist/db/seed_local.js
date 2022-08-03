"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.materiales = exports.notas = exports.matriculas = exports.programaciones = exports.aulas = exports.usuarios = exports.alumnos = exports.apoderados = exports.docentes = exports.personas = exports.subareas = exports.ciclos = exports.evaluaciones = exports.periodos = exports.secciones = exports.grados = exports.niveles = exports.tipodocumentos = exports.areas = exports.roles = void 0;
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
    { nombre: '3AÑOS' },
    { nombre: '4AÑOS' },
    { nombre: '5AÑOS' },
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
    { nombre: 'PRACTICA CALIFICADA' },
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
    { nombre: "ALGEBRA", areaId: 1 },
    { nombre: "GEOMETRIA", areaId: 1 },
    { nombre: "ARITMETICA", areaId: 1 },
    { nombre: "RAZ.LOGICO", areaId: 1 },
    { nombre: "RAZ.MAT I", areaId: 1 },
    { nombre: "TRIGONOMETRIA", areaId: 1 },
    { nombre: "LENGUA", areaId: 2 },
    { nombre: "LITERATURA", areaId: 2 },
    { nombre: "RAZ. VERBAL", areaId: 2 },
    { nombre: "INGLES", areaId: 3 },
    { nombre: "CIENCIAS SOCIALES", areaId: 4 },
    { nombre: "FISICA", areaId: 5 },
    { nombre: "QUIMICA", areaId: 5 },
    { nombre: "BIOLOGIA", areaId: 5 },
];
exports.personas = [
    /* administrador*/
    { numero: '46556963', nombres: 'DARWIN JHONATAN', apellidopaterno: 'FLORES', apellidomaterno: 'NUÑEZ', tipodocumentoId: 1 },
    /* docentes*/
    { numero: '44409214', nombres: 'FLAVIO', apellidopaterno: 'GARCIA', apellidomaterno: 'RIVERA', tipodocumentoId: 1 },
    { numero: '46378155', nombres: 'MILAGROS ANALY', apellidopaterno: 'GOMEZ', apellidomaterno: 'ENCALADA', tipodocumentoId: 1 },
    { numero: '40357419', nombres: 'JOSE JAVIER', apellidopaterno: 'YARLEQUE', apellidomaterno: 'VILCHEZ', tipodocumentoId: 1 },
    { numero: '40213876', nombres: 'DANTE JOEL', apellidopaterno: 'CABREJOS', apellidomaterno: 'REYES', tipodocumentoId: 1 },
    /* apoderados*/
    { numero: '42215224', nombres: 'ROSA MIRELLA', apellidopaterno: 'JUAREZ', apellidomaterno: 'CARAMANTIN', tipodocumentoId: 1 },
    { numero: '33668077', nombres: 'JAIME RICARDO', apellidopaterno: 'PINTADO', apellidomaterno: 'CALLE', tipodocumentoId: 1 },
    { numero: '42136288', nombres: 'SINTHIA', apellidopaterno: 'DIONISIO', apellidomaterno: 'CORDOVA', tipodocumentoId: 1 },
    { numero: '40134863', nombres: 'ROXANA DEL PILAR', apellidopaterno: 'ANASTACIO', apellidomaterno: 'CAMPOS', tipodocumentoId: 1 },
    { numero: '41979708', nombres: 'CORDOVA', apellidopaterno: 'VILLEGAS', apellidomaterno: 'JOHANNA IVONNE', tipodocumentoId: 1 },
    { numero: '28032999', nombres: 'BERTHA ANA', apellidopaterno: 'SALDARRIAGA', apellidomaterno: 'MORAN', tipodocumentoId: 1 },
    { numero: '80446280', nombres: 'MARTHA', apellidopaterno: 'QUISPE', apellidomaterno: 'SAUCEDO', tipodocumentoId: 1 },
    { numero: '25431443', nombres: 'MARTIN', apellidopaterno: 'CHUICA', apellidomaterno: 'ADRIANZEN', tipodocumentoId: 1 },
    { numero: '33666766', nombres: 'ROSA MIRELLA', apellidopaterno: 'ADRIANZEN', apellidomaterno: 'CHERRES', tipodocumentoId: 1 },
    { numero: '46538404', nombres: 'KAREN YENYFFER', apellidopaterno: 'PACHERRES', apellidomaterno: 'ODAR', tipodocumentoId: 1 },
    /* alumnos*/
    { numero: '67675770', nombres: 'ADRIANA FERNANDA', apellidopaterno: 'MORE', apellidomaterno: 'JUAREZ', tipodocumentoId: 1 },
    { numero: '34776686', nombres: 'RICARDO GLEISSNER', apellidopaterno: 'PINTADO', apellidomaterno: 'ORDOÑEZ', tipodocumentoId: 1 },
    { numero: '66796519', nombres: 'MARCO OSVALDO', apellidopaterno: 'TORRES', apellidomaterno: 'DIONISIO', tipodocumentoId: 1 },
    { numero: '23522439', nombres: 'ANDERSON ASAEL', apellidopaterno: 'LOZADA', apellidomaterno: 'ANASTACIO', tipodocumentoId: 1 },
    { numero: '94375916', nombres: 'KEVIN', apellidopaterno: 'PALACIOS', apellidomaterno: 'CORDOVA', tipodocumentoId: 1 },
    { numero: '79069307', nombres: 'ALONSO', apellidopaterno: 'INGA', apellidomaterno: 'SALDARRIAGA', tipodocumentoId: 1 },
    { numero: '56066411', nombres: 'MARIA FERNANDA', apellidopaterno: 'JIMENEZ', apellidomaterno: 'QUISPE', tipodocumentoId: 1 },
    { numero: '93625136', nombres: 'JUNIOR MARTIN', apellidopaterno: 'CHUICA', apellidomaterno: 'MONTENEGRO', tipodocumentoId: 1 },
    { numero: '95831424', nombres: 'ALEXANDRA', apellidopaterno: 'CORNEJO', apellidomaterno: 'ADRIANZEN', tipodocumentoId: 1 },
    { numero: '18205639', nombres: 'DANNA', apellidopaterno: 'DURAN', apellidomaterno: 'PACHERRES', tipodocumentoId: 1 },
    /* desconocido*/
    { numero: '00000000', nombres: 'DESCONOCIDO', apellidopaterno: 'DESCONOCIDO', apellidomaterno: 'DESCONOCIDO', tipodocumentoId: 1 }
];
exports.docentes = [
    { personaId: 2 },
    { personaId: 3 },
    { personaId: 4 },
    { personaId: 5 }
];
exports.apoderados = [
    { personaId: 6 },
    { personaId: 7 },
    { personaId: 8 },
    { personaId: 9 },
    { personaId: 10 },
    { personaId: 11 },
    { personaId: 12 },
    { personaId: 13 },
    { personaId: 14 },
    { personaId: 15 }
];
exports.alumnos = [
    { personaId: 16, apoderadoId: 1 },
    { personaId: 17, apoderadoId: 2 },
    { personaId: 18, apoderadoId: 3 },
    { personaId: 19, apoderadoId: 4 },
    { personaId: 20, apoderadoId: 5 },
    { personaId: 21, apoderadoId: 6 },
    { personaId: 22, apoderadoId: 7 },
    { personaId: 23, apoderadoId: 8 },
    { personaId: 24, apoderadoId: 9 },
    { personaId: 25, apoderadoId: 10 }
];
exports.usuarios = [
    /* administrador*/
    { nombre: "Jhonatan", email: "jhonatan@iepgutemberg.com", password: "123456", roleId: 1, personaId: 1 },
    /* docentes*/
    { nombre: "Flavio", email: "flavio@iepgutemberg.com", password: "123456", roleId: 2, personaId: 2 },
    { nombre: "Milagros", email: "milagros@iepgutemberg.com", password: "123456", roleId: 2, personaId: 3 },
    { nombre: "Jose", email: "jose@iepgutemberg.com", password: "123456", roleId: 2, personaId: 4 },
    { nombre: "Dante", email: "dante@iepgutemberg.com", password: "123456", roleId: 2, personaId: 5 },
    /* alumnos*/
    { nombre: "Adriana", email: "adriana@iepgutemberg.com", password: "123456", roleId: 3, personaId: 16 },
    { nombre: "Ricardo", email: "ricardo@iepgutemberg.com", password: "123456", roleId: 3, personaId: 17 },
    { nombre: "Marco", email: "marco@iepgutemberg.com", password: "123456", roleId: 3, personaId: 18 },
    { nombre: "Anderson", email: "anderson@iepgutemberg.com", password: "123456", roleId: 3, personaId: 19 },
    { nombre: "Kevin", email: "kevin@iepgutemberg.com", password: "123456", roleId: 3, personaId: 20 },
    { nombre: "Alonso", email: "alonso@iepgutemberg.com", password: "123456", roleId: 3, personaId: 21 },
    { nombre: "Maria", email: "maria@iepgutemberg.com", password: "123456", roleId: 3, personaId: 22 },
    { nombre: "Junior", email: "junior@iepgutemberg.com", password: "123456", roleId: 3, personaId: 23 },
    { nombre: "Alexandra", email: "alexandra@iepgutemberg.com", password: "123456", roleId: 3, personaId: 24 },
    { nombre: "Danna", email: "danna@iepgutemberg.com", password: "123456", roleId: 3, personaId: 25 },
];
exports.aulas = [
    { nombre: 'AULA 3 AÑOS', nivelId: 1, gradoId: 1, seccionId: 1 },
    { nombre: 'AULA 4 AÑOS', nivelId: 1, gradoId: 2, seccionId: 1 },
    { nombre: 'AULA 5 AÑOS', nivelId: 1, gradoId: 3, seccionId: 1 },
    { nombre: 'AULA 1 PRIMARIA', nivelId: 2, gradoId: 4, seccionId: 1 },
    { nombre: 'AULA 2 PRIMARIA', nivelId: 2, gradoId: 5, seccionId: 1 },
    { nombre: 'AULA 3 PRIMARIA', nivelId: 2, gradoId: 6, seccionId: 1 },
    { nombre: 'AULA 4 PRIMARIA', nivelId: 2, gradoId: 7, seccionId: 1 },
    { nombre: 'AULA 5 PRIMARIA', nivelId: 2, gradoId: 8, seccionId: 1 },
    { nombre: 'AULA 6 PRIMARIA', nivelId: 2, gradoId: 9, seccionId: 1 },
    { nombre: 'AULA 1 SECUNDARIA', nivelId: 3, gradoId: 4, seccionId: 1 },
    { nombre: 'AULA 2 SECUNDARIA', nivelId: 3, gradoId: 5, seccionId: 1 },
    { nombre: 'AULA 3 SECUNDARIA', nivelId: 3, gradoId: 6, seccionId: 1 },
    { nombre: 'AULA 4 SECUNDARIA', nivelId: 3, gradoId: 7, seccionId: 1 },
    { nombre: 'AULA 5 SECUNDARIA', nivelId: 3, gradoId: 8, seccionId: 1 }
];
exports.programaciones = [
    {
        numeromat: 10,
        aulaId: 14,
        docenteId: 1,
        subareaId: 1,
        periodoId: 1,
    },
    {
        numeromat: 10,
        aulaId: 14,
        docenteId: 2,
        subareaId: 2,
        periodoId: 1,
    },
    {
        numeromat: 10,
        aulaId: 14,
        docenteId: 3,
        subareaId: 3,
        periodoId: 1,
    },
    {
        numeromat: 10,
        aulaId: 14,
        docenteId: 4,
        subareaId: 4,
        periodoId: 1,
    }
];
exports.matriculas = [
    { alumnoId: 1, programacionId: 1 },
    { alumnoId: 1, programacionId: 2 },
    { alumnoId: 1, programacionId: 3 },
    { alumnoId: 1, programacionId: 4 },
    { alumnoId: 2, programacionId: 1 },
    { alumnoId: 2, programacionId: 2 },
    { alumnoId: 2, programacionId: 3 },
    { alumnoId: 2, programacionId: 4 },
    { alumnoId: 3, programacionId: 1 },
    { alumnoId: 3, programacionId: 2 },
    { alumnoId: 3, programacionId: 3 },
    { alumnoId: 3, programacionId: 4 },
    { alumnoId: 4, programacionId: 1 },
    { alumnoId: 4, programacionId: 2 },
    { alumnoId: 4, programacionId: 3 },
    { alumnoId: 4, programacionId: 4 },
    { alumnoId: 5, programacionId: 1 },
    { alumnoId: 5, programacionId: 2 },
    { alumnoId: 5, programacionId: 3 },
    { alumnoId: 5, programacionId: 4 },
    { alumnoId: 6, programacionId: 1 },
    { alumnoId: 6, programacionId: 2 },
    { alumnoId: 6, programacionId: 3 },
    { alumnoId: 6, programacionId: 4 },
    { alumnoId: 7, programacionId: 1 },
    { alumnoId: 7, programacionId: 2 },
    { alumnoId: 7, programacionId: 3 },
    { alumnoId: 7, programacionId: 4 },
    { alumnoId: 8, programacionId: 1 },
    { alumnoId: 8, programacionId: 2 },
    { alumnoId: 8, programacionId: 3 },
    { alumnoId: 8, programacionId: 4 },
    { alumnoId: 9, programacionId: 1 },
    { alumnoId: 9, programacionId: 2 },
    { alumnoId: 9, programacionId: 3 },
    { alumnoId: 9, programacionId: 4 },
    { alumnoId: 10, programacionId: 1 },
    { alumnoId: 10, programacionId: 2 },
    { alumnoId: 10, programacionId: 3 },
    { alumnoId: 10, programacionId: 4 }
];
exports.notas = [
    { matriculaId: 1, evaluacionId: 1, cicloId: 1, valor: 14, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 1, evaluacionId: 2, cicloId: 1, valor: 12, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 2, evaluacionId: 1, cicloId: 1, valor: 10, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 2, evaluacionId: 2, cicloId: 1, valor: 16, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 3, evaluacionId: 1, cicloId: 1, valor: 11, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 3, evaluacionId: 2, cicloId: 1, valor: 19, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 4, evaluacionId: 1, cicloId: 1, valor: 12, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 4, evaluacionId: 2, cicloId: 1, valor: 17, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 5, evaluacionId: 1, cicloId: 1, valor: 6, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 5, evaluacionId: 2, cicloId: 1, valor: 15, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 6, evaluacionId: 1, cicloId: 1, valor: 20, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 6, evaluacionId: 2, cicloId: 1, valor: 18, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 7, evaluacionId: 1, cicloId: 1, valor: 14, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 7, evaluacionId: 2, cicloId: 1, valor: 14, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 8, evaluacionId: 1, cicloId: 1, valor: 12, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 8, evaluacionId: 2, cicloId: 1, valor: 11, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 9, evaluacionId: 1, cicloId: 1, valor: 10, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 9, evaluacionId: 2, cicloId: 1, valor: 7, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 10, evaluacionId: 1, cicloId: 1, valor: 16, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 10, evaluacionId: 2, cicloId: 1, valor: 15, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 11, evaluacionId: 1, cicloId: 1, valor: 14, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 11, evaluacionId: 2, cicloId: 1, valor: 20, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 12, evaluacionId: 1, cicloId: 1, valor: 17, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 12, evaluacionId: 2, cicloId: 1, valor: 13, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 13, evaluacionId: 1, cicloId: 1, valor: 11, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 13, evaluacionId: 2, cicloId: 1, valor: 12, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 14, evaluacionId: 1, cicloId: 1, valor: 16, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 14, evaluacionId: 2, cicloId: 1, valor: 10, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 15, evaluacionId: 1, cicloId: 1, valor: 9, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 15, evaluacionId: 2, cicloId: 1, valor: 13, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 16, evaluacionId: 1, cicloId: 1, valor: 11, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 16, evaluacionId: 2, cicloId: 1, valor: 13, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 17, evaluacionId: 1, cicloId: 1, valor: 10, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 17, evaluacionId: 2, cicloId: 1, valor: 10, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 18, evaluacionId: 1, cicloId: 1, valor: 10, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 18, evaluacionId: 2, cicloId: 1, valor: 14, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 19, evaluacionId: 1, cicloId: 1, valor: 17, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 19, evaluacionId: 2, cicloId: 1, valor: 13, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 20, evaluacionId: 1, cicloId: 1, valor: 18, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 20, evaluacionId: 2, cicloId: 1, valor: 19, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 21, evaluacionId: 1, cicloId: 1, valor: 15, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 21, evaluacionId: 2, cicloId: 1, valor: 12, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 22, evaluacionId: 1, cicloId: 1, valor: 14, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 22, evaluacionId: 2, cicloId: 1, valor: 11, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 23, evaluacionId: 1, cicloId: 1, valor: 10, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 23, evaluacionId: 2, cicloId: 1, valor: 12, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 24, evaluacionId: 1, cicloId: 1, valor: 9, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 24, evaluacionId: 2, cicloId: 1, valor: 11, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 25, evaluacionId: 1, cicloId: 1, valor: 8, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 25, evaluacionId: 2, cicloId: 1, valor: 4, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 26, evaluacionId: 1, cicloId: 1, valor: 18, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 26, evaluacionId: 2, cicloId: 1, valor: 18, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 27, evaluacionId: 1, cicloId: 1, valor: 12, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 27, evaluacionId: 2, cicloId: 1, valor: 12, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 28, evaluacionId: 1, cicloId: 1, valor: 18, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 28, evaluacionId: 2, cicloId: 1, valor: 11, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 29, evaluacionId: 1, cicloId: 1, valor: 16, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 29, evaluacionId: 2, cicloId: 1, valor: 12, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 30, evaluacionId: 1, cicloId: 1, valor: 11, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 30, evaluacionId: 2, cicloId: 1, valor: 14, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 31, evaluacionId: 1, cicloId: 1, valor: 12, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 31, evaluacionId: 2, cicloId: 1, valor: 10, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 32, evaluacionId: 1, cicloId: 1, valor: 16, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 32, evaluacionId: 2, cicloId: 1, valor: 16, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 33, evaluacionId: 1, cicloId: 1, valor: 17, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 33, evaluacionId: 2, cicloId: 1, valor: 13, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 34, evaluacionId: 1, cicloId: 1, valor: 20, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 34, evaluacionId: 2, cicloId: 1, valor: 13, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 35, evaluacionId: 1, cicloId: 1, valor: 12, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 35, evaluacionId: 2, cicloId: 1, valor: 14, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 36, evaluacionId: 1, cicloId: 1, valor: 15, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 36, evaluacionId: 2, cicloId: 1, valor: 12, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 37, evaluacionId: 1, cicloId: 1, valor: 12, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 37, evaluacionId: 2, cicloId: 1, valor: 12, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 38, evaluacionId: 1, cicloId: 1, valor: 18, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 38, evaluacionId: 2, cicloId: 1, valor: 14, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 39, evaluacionId: 1, cicloId: 1, valor: 12, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 39, evaluacionId: 2, cicloId: 1, valor: 12, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 40, evaluacionId: 1, cicloId: 1, valor: 14, fecha: (0, moment_1.default)().format('YYYY-MM-DD') },
    { matriculaId: 40, evaluacionId: 2, cicloId: 1, valor: 14, fecha: (0, moment_1.default)().format('YYYY-MM-DD') }
];
exports.materiales = [
    { titulo: "Lorem ipsum dolor sit amet consectetur adipisicing elit", descripcion: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt quo itaque voluptatem nam, repellendus,assumenda consectetur unde distinctio vitae fugit id neque accusamus labore maiores quaerat laudantium inventore eligendi! ", programacionId: 1, fecha: (0, moment_1.default)().format('YYYY-MM-DD'), archivo: "https://res.cloudinary.com/archivos/image/upload/v1643918075/material/qnamfhnsgkkbs9rqearb.pdf" },
    { titulo: "Lorem ipsum dolor sit amet consectetur adipisicing elit", descripcion: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt quo itaque voluptatem nam, repellendus,assumenda consectetur unde distinctio vitae fugit id neque accusamus labore maiores quaerat laudantium inventore eligendi! ", programacionId: 1, fecha: (0, moment_1.default)().format('YYYY-MM-DD'), archivo: "https://res.cloudinary.com/archivos/image/upload/v1643918075/material/qnamfhnsgkkbs9rqearb.pdf" },
    { titulo: "Lorem ipsum dolor sit amet consectetur adipisicing elit", descripcion: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt quo itaque voluptatem nam, repellendus,assumenda consectetur unde distinctio vitae fugit id neque accusamus labore maiores quaerat laudantium inventore eligendi! ", programacionId: 2, fecha: (0, moment_1.default)().format('YYYY-MM-DD'), archivo: "https://res.cloudinary.com/archivos/image/upload/v1643918075/material/qnamfhnsgkkbs9rqearb.pdf" },
    { titulo: "Lorem ipsum dolor sit amet consectetur adipisicing elit", descripcion: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt quo itaque voluptatem nam, repellendus,assumenda consectetur unde distinctio vitae fugit id neque accusamus labore maiores quaerat laudantium inventore eligendi! ", programacionId: 2, fecha: (0, moment_1.default)().format('YYYY-MM-DD'), archivo: "https://res.cloudinary.com/archivos/image/upload/v1643918075/material/qnamfhnsgkkbs9rqearb.pdf" },
    { titulo: "Lorem ipsum dolor sit amet consectetur adipisicing elit", descripcion: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt quo itaque voluptatem nam, repellendus,assumenda consectetur unde distinctio vitae fugit id neque accusamus labore maiores quaerat laudantium inventore eligendi! ", programacionId: 3, fecha: (0, moment_1.default)().format('YYYY-MM-DD'), archivo: "https://res.cloudinary.com/archivos/image/upload/v1643918075/material/qnamfhnsgkkbs9rqearb.pdf" },
    { titulo: "Lorem ipsum dolor sit amet consectetur adipisicing elit", descripcion: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt quo itaque voluptatem nam, repellendus,assumenda consectetur unde distinctio vitae fugit id neque accusamus labore maiores quaerat laudantium inventore eligendi! ", programacionId: 3, fecha: (0, moment_1.default)().format('YYYY-MM-DD'), archivo: "https://res.cloudinary.com/archivos/image/upload/v1643918075/material/qnamfhnsgkkbs9rqearb.pdf" },
    { titulo: "Lorem ipsum dolor sit amet consectetur adipisicing elit", descripcion: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt quo itaque voluptatem nam, repellendus,assumenda consectetur unde distinctio vitae fugit id neque accusamus labore maiores quaerat laudantium inventore eligendi! ", programacionId: 4, fecha: (0, moment_1.default)().format('YYYY-MM-DD'), archivo: "https://res.cloudinary.com/archivos/image/upload/v1643918075/material/qnamfhnsgkkbs9rqearb.pdf" },
    { titulo: "Lorem ipsum dolor sit amet consectetur adipisicing elit", descripcion: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt quo itaque voluptatem nam, repellendus,assumenda consectetur unde distinctio vitae fugit id neque accusamus labore maiores quaerat laudantium inventore eligendi! ", programacionId: 4, fecha: (0, moment_1.default)().format('YYYY-MM-DD'), archivo: "https://res.cloudinary.com/archivos/image/upload/v1643918075/material/qnamfhnsgkkbs9rqearb.pdf" },
];
//# sourceMappingURL=seed_local.js.map