"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.programaciones = exports.aulas = exports.periodos = exports.secciones = exports.grados = exports.niveles = exports.alumnos = exports.apoderados = exports.docentes = exports.personas = exports.tipodocumentos = exports.subareas = exports.areas = exports.usuarios = exports.roles = void 0;
exports.roles = [
    { nombre: "ADMINISTRADOR" },
    { nombre: "DOCENTE" },
    { nombre: "ALUMNO" }
];
exports.usuarios = [
    { nombre: "Jhonatan", email: "jhonatan@gmail.com", password: "123456", roleId: 4 },
    { nombre: "Cecilia", email: "cecilia@gmail.com", password: "123456", roleId: 14 },
    { nombre: "Carla", email: "carla@gmail.com", password: "123456", roleId: 14 },
    { nombre: "Karina", email: "karina@gmail.com", password: "123456", roleId: 14 },
    { nombre: "Lis", email: "lis@gmail.com", password: "123456", roleId: 14 },
    { nombre: "Luciana", email: "luciana@gmail.com", password: "123456", roleId: 14 },
    { nombre: "Mabel", email: "mabel@gmail.com", password: "123456", roleId: 14 },
    { nombre: "Roberto", email: "roberto@gmail.com", password: "123456", roleId: 14 },
    { nombre: "Amalia", email: "amalia@gmail.com", password: "123456", roleId: 14 },
    { nombre: "Lucia", email: "lucia@gmail.com", password: "123456", roleId: 24 },
    { nombre: "Fiorella", email: "fiorella@gmail.com", password: "123456", roleId: 24 },
    { nombre: "Carmen", email: "carmen@gmail.com", password: "123456", roleId: 24 },
    { nombre: "Luis", email: "luis@gmail.com", password: "123456", roleId: 24 },
    { nombre: "Juan", email: "juan@gmail.com", password: "123456", roleId: 24 },
    { nombre: "Paola", email: "paola@gmail.com", password: "123456", roleId: 24 },
    { nombre: "Bernardo", email: "bernardo@gmail.com", password: "123456", roleId: 24 },
    { nombre: "Luna", email: "luna@gmail.com", password: "123456", roleId: 24 },
    { nombre: "Sol", email: "sol@gmail.com", password: "123456", roleId: 24 },
];
exports.areas = [
    { nombre: "MATEMATICA" },
    { nombre: "COMUNICACION" },
    { nombre: "INGLES" },
    { nombre: "CIENCIAS SOCIALES" },
    { nombre: "CIENCIA Y TECNOLOGIA" }
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
exports.tipodocumentos = [
    { nombre: 'DNI' },
    { nombre: 'CEDULA' }
];
exports.personas = [
    { numero: '44409214', nombre: 'FLAVIO', apellidopaterno: 'GARCIA', apellidomaterno: 'RIVERA', tipodocumentoId: 4 },
    { numero: '46378155', nombre: 'MILAGROS ANALY', apellidopaterno: 'GOMEZ', apellidomaterno: 'ENCALADA', tipodocumentoId: 4 },
    { numero: '40357419', nombre: 'JOSE JAVIER', apellidopaterno: 'YARLEQUE', apellidomaterno: 'VILCHEZ', tipodocumentoId: 4 },
    { numero: '40213876', nombre: 'DANTE JOEL', apellidopaterno: 'CABREJOS', apellidomaterno: 'REYES', tipodocumentoId: 4 },
    { numero: '42215224', nombre: 'ROSA MIRELLA', apellidopaterno: 'JUAREZ', apellidomaterno: 'CARAMANTIN', tipodocumentoId: 4 },
    { numero: '33668077', nombre: 'JAIME RICARDO', apellidopaterno: 'PINTADO', apellidomaterno: 'CALLE', tipodocumentoId: 4 },
    { numero: '42136288', nombre: 'SINTHIA', apellidopaterno: 'DIONISIO', apellidomaterno: 'CORDOVA', tipodocumentoId: 4 },
    { numero: '40134863', nombre: 'ROXANA DEL PILAR', apellidopaterno: 'ANASTACIO', apellidomaterno: 'CAMPOS', tipodocumentoId: 4 },
    { numero: '41979708', nombre: 'CORDOVA', apellidopaterno: 'VILLEGAS', apellidomaterno: 'JOHANNA IVONNE', tipodocumentoId: 4 },
    { numero: '28032999', nombre: 'BERTHA ANA', apellidopaterno: 'SALDARRIAGA', apellidomaterno: 'MORAN', tipodocumentoId: 4 },
    { numero: '80446280', nombre: 'MARTHA', apellidopaterno: 'QUISPE', apellidomaterno: 'SAUCEDO', tipodocumentoId: 4 },
    { numero: '25431443', nombre: 'MARTIN', apellidopaterno: 'CHUICA', apellidomaterno: 'ADRIANZEN', tipodocumentoId: 4 },
    { numero: '33666766', nombre: 'ROSA MIRELLA', apellidopaterno: 'ADRIANZEN', apellidomaterno: 'CHERRES', tipodocumentoId: 4 },
    { numero: '46538404', nombre: 'KAREN YENYFFER', apellidopaterno: 'PACHERRES', apellidomaterno: 'ODAR', tipodocumentoId: 4 },
    { numero: '67675770', nombre: 'ADRIANA FERNANDA', apellidopaterno: 'MORE', apellidomaterno: 'JUAREZ', tipodocumentoId: 4 },
    { numero: '34776686', nombre: 'RICARDO GLEISSNER', apellidopaterno: 'PINTADO', apellidomaterno: 'ORDOÑEZ', tipodocumentoId: 4 },
    { numero: '66796519', nombre: 'MARCO OSVALDO', apellidopaterno: 'TORRES', apellidomaterno: 'DIONISIO', tipodocumentoId: 4 },
    { numero: '23522439', nombre: 'ANDERSON ASAEL', apellidopaterno: 'LOZADA', apellidomaterno: 'ANASTACIO', tipodocumentoId: 4 },
    { numero: '94375916', nombre: 'KEVIN', apellidopaterno: 'PALACIOS', apellidomaterno: 'CORDOVA', tipodocumentoId: 4 },
    { numero: '79069307', nombre: 'ALONSO', apellidopaterno: 'INGA', apellidomaterno: 'SALDARRIAGA', tipodocumentoId: 4 },
    { numero: '56066411', nombre: 'MARIA FERNANDA', apellidopaterno: 'JIMENEZ', apellidomaterno: 'QUISPE', tipodocumentoId: 4 },
    { numero: '93625136', nombre: 'JUNIOR MARTIN', apellidopaterno: 'CHUICA', apellidomaterno: 'MONTENEGRO', tipodocumentoId: 4 },
    { numero: '95831424', nombre: 'ALEXANDRA', apellidopaterno: 'CORNEJO', apellidomaterno: 'ADRIANZEN', tipodocumentoId: 4 },
    { numero: '18205639', nombre: 'DANNA', apellidopaterno: 'DURAN', apellidomaterno: 'PACHERRES', tipodocumentoId: 4 }
];
exports.docentes = [
    { personaId: 4 },
    { personaId: 14 },
    { personaId: 24 },
    { personaId: 34 }
];
exports.apoderados = [
    { personaId: 44 },
    { personaId: 54 },
    { personaId: 64 },
    { personaId: 74 },
    { personaId: 84 },
    { personaId: 94 },
    { personaId: 104 },
    { personaId: 114 },
    { personaId: 124 },
    { personaId: 134 }
];
exports.alumnos = [
    { personaId: 144, apoderadoId: 4 },
    { personaId: 154, apoderadoId: 14 },
    { personaId: 164, apoderadoId: 24 },
    { personaId: 174, apoderadoId: 34 },
    { personaId: 184, apoderadoId: 44 },
    { personaId: 194, apoderadoId: 54 },
    { personaId: 204, apoderadoId: 64 },
    { personaId: 214, apoderadoId: 74 },
    { personaId: 224, apoderadoId: 84 },
    { personaId: 234, apoderadoId: 94 }
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
    {
        aulaId: 134,
        docenteId: 4,
        subareaId: 4,
        periodoId: 4,
    },
    {
        aulaId: 134,
        docenteId: 14,
        subareaId: 14,
        periodoId: 4,
    },
    {
        aulaId: 134,
        docenteId: 24,
        subareaId: 24,
        periodoId: 4,
    },
    {
        aulaId: 134,
        docenteId: 34,
        subareaId: 34,
        periodoId: 4,
    }
];
//# sourceMappingURL=seed%20copy.js.map