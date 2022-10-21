import moment from 'moment';

export const instituciones = [
    {
        id: 4,
        nombre: "I.E. N° 14787 VICTOR RAÚL HAYA DE LA TORRE",
        direccion: "CALLE EDUARDO VASQUEZ N° 401",
        telefono: "505701",
        email: "vicraul2006@hotmail.com",
        img: "victorraulsullana.jpg",
        departamento: "PIURA",
        provincia: "SULLANA",
        distrito: "SULLANA",
        centropoblado: "SULLANA",
        dre: "PIURA",
        ugel: "SULLANA",
        tipogestion: "Pública de gestión directa",
        generoalumno: "Mixto",
        formaatencion: "Escolarizada",
        turnoatencion: "Mañana-Tarde",
        paginaweb: "No tiene"
    }
];
export const roles = [
    { id: 4, nombre: "ADMINISTRADOR", bgcolor: "bg-primary" },
    { id: 14, nombre: "DOCENTE", bgcolor: "bg-success" },
    { id: 24, nombre: "PADRE", bgcolor: "bg-danger" },
    { id: 34, nombre: "MADRE", bgcolor: "bg-info" },
    { id: 44, nombre: "AUXILIAR", bgcolor: "bg-warning" },
    { id: 54, nombre: "ALUMNO", bgcolor: "bg-dark" },
];
export const situaciones = [
    { id: 4, nombre: "FALTÓ", color: 'danger', abreviatura: "F" },
    { id: 14, nombre: "ASISTÍO", color: 'success', abreviatura: "A" },
    { id: 24, nombre: "JUSTIFICÓ", color: 'primary', abreviatura: "J" },
    { id: 34, nombre: "TARDANZA", color: 'warning', abreviatura: "T" },
    { id: 44, nombre: "NO REGISTRÓ", color: 'secondary', abreviatura: "NR" }
];
export const areas = [
    { id: 4, nombre: "MATEMATICA" },
    { id: 14, nombre: "COMUNICACION" },
    { id: 24, nombre: "ARTE Y CULTURA" },
    { id: 34, nombre: "PERSONAL SOCIAL" },
    { id: 44, nombre: "CIENCIA Y TECNOLOGÍA" },
    { id: 54, nombre: "EDUCACIÓN FÍSICA" },
    { id: 64, nombre: "EDUCACIÓN RELIGIOSA" },
    { id: 74, nombre: "COMPETENCIAS TRANSVERSALES" },
];

export const competencias = [
    { id: 4, descripcion: "Resuelve problemas de cantidad.", areaId: 4 },
    { id: 14, descripcion: "Resuelve problemas de regularidad, equivalencia y cambio.", areaId: 4 },
    { id: 24, descripcion: "Resuelve problemas de forma, movimiento y localizacion.", areaId: 4 },
    { id: 34, descripcion: "Resuelve problemas de gestion de datos e incertidumbre.", areaId: 4 },

    { id: 44, descripcion: "Se comunica oralmente en lengua materna.", areaId: 14 },
    { id: 54, descripcion: "Lee diversos tipos de textos escritos en su lengua materna.", areaId: 14 },
    { id: 64, descripcion: "Escribe diversos tipos de textos en su lengua materna.", areaId: 14 },

    { id: 74, descripcion: "Aprecia de manera crítica manifestaciones artístico-culturales.", areaId: 24 },
    { id: 84, descripcion: "Crea proyectos desde los lenguajes artísticos.", areaId: 24 },

    { id: 94, descripcion: "Construye su identidad.", areaId: 34 },
    { id: 104, descripcion: "Convive y participa democráticamente en la búsqueda del bien común.", areaId: 34 },
    { id: 114, descripcion: "Construye interpretaciones históricas.", areaId: 34 },
    { id: 124, descripcion: "Gestiona responsablemente el espacio y el ambiente.", areaId: 34 },
    { id: 134, descripcion: "Gestiona responsablemente los recursos económicos.", areaId: 34 },

    { id: 144, descripcion: "Indaga mediante métodos científicos para construir sus conocimientos.", areaId: 44 },
    { id: 154, descripcion: "Explica el mundo físico basándose en conocimientos sobre los seres vivos, materia y energía.", areaId: 44 },
    { id: 164, descripcion: "Diseña y construye soluciones tecnológicas para resolver problemas de su entorno.", areaId: 44 },

    { id: 174, descripcion: "Se desenvuelve de manera autónoma a través de su motricidad.", areaId: 54 },
    { id: 184, descripcion: "Asume una vida saludable.", areaId: 54 },
    { id: 194, descripcion: "Interactúa a través de sus habilidades sociomotrices.", areaId: 54 },

    { id: 204, descripcion: "Construye su identidad como persona humana, amada por Dios, digna, libre y trascendente, comprendiendo la doctrina de su propia religión, abierto al diálogo con las que le son cercanas.", areaId: 64 },
    { id: 214, descripcion: "Asume la experiencia del encuentro personal y comunitario con Dios en su proyecto de vida en coherencia con su creencia religiosa.", areaId: 64 },

    { id: 224, descripcion: "Se desenvuelve en entornos virtuales generados por las TICs.", areaId: 74 },
    { id: 234, descripcion: "Gestiona su aprendizaje de manera autónoma.", areaId: 74 },
];
export const tipodocumentos = [
    { id: 4, nombre: 'DNI' },
];
export const niveles = [
    { id: 4, nombre: 'PRIMARIA' },
    { id: 14, nombre: 'SECUNDARIA' },
];
export const grados = [
    { id: 4, nombre: 'PRIMERO' },
    { id: 14, nombre: 'SEGUNDO' },
    { id: 24, nombre: 'TERCERO' },
    { id: 34, nombre: 'CUARTO' },
    { id: 44, nombre: 'QUINTO' },
    { id: 54, nombre: 'SEXTO' },
];
export const secciones = [
    { id: 4, nombre: 'A' },
    { id: 14, nombre: 'B' },
    { id: 24, nombre: 'C' },
    { id: 34, nombre: 'D' }
];
export const periodos = [
    { id: 4, nombre: '2022', fechainicial: "2022-03-01", fechafinal: "2022-12-31" },
    { id: 14, nombre: '2023', fechainicial: "2023-03-01", fechafinal: "2023-12-31" }
];
export const evaluaciones = [
    { id: 4, nombre: 'TRABAJOS INDIVIDUALES', abreviatura: 'PA' },
    { id: 14, nombre: 'TRABAJOS GRUPALES', abreviatura: 'PA' },
    { id: 24, nombre: 'TAREAS', abreviatura: 'TAR' },
    { id: 34, nombre: 'PARTICIPACIONES EN CLASE', abreviatura: 'PC' },
    { id: 44, nombre: 'EXPOSICIONES', abreviatura: 'EXPO' },
    { id: 54, nombre: 'EXAMENES ESCRITOS', abreviatura: 'EX' }
];
export const ciclos = [
    { id: 4, nombre: 'B1' },
    { id: 14, nombre: 'B2' },
    { id: 24, nombre: 'B3' },
    { id: 34, nombre: 'B4' }
];
export const horas = [
    { id: 4, nombre: "1°", inicio: "8:00 am", fin: "8:45 am", tipo: 1 },
    { id: 14, nombre: "2°", inicio: "8:45 am", fin: "9:30 am", tipo: 1 },
    { id: 24, nombre: "3°", inicio: "9:30 am", fin: "10:15 am", tipo: 1 },
    { id: 34, nombre: "4°", inicio: "10:15 am", fin: "10:45 am", tipo: 0 },
    { id: 44, nombre: "5°", inicio: "10:45 am", fin: "11:30 am", tipo: 1 },
    { id: 54, nombre: "6°", inicio: "11:30 am", fin: "12:15 pm", tipo: 1 },
    { id: 64, nombre: "7°", inicio: "12:15 pm", fin: "1:00 pm", tipo: 1 },
    { id: 74, nombre: "8°", inicio: "1:00 pm", fin: "1:30 pm", tipo: 0 },
    { id: 84, nombre: "9°", inicio: "1:30 pm", fin: "2:15 pm", tipo: 1 },
    { id: 94, nombre: "10°", inicio: "2:15 pm", fin: "3:00 pm", tipo: 1 },
];

export const rangos = [
    { id: 4, letra: "C", inicio: 0, fin: 10, situacion: "INICIO", color: "ROJO", alias: "danger" },
    { id: 14, letra: "B", inicio: 11, fin: 14, situacion: "PROCESO", color: "AMARILLO", alias: "warning" },
    { id: 24, letra: "A", inicio: 15, fin: 17, situacion: "LOGRADO", color: "AZUL", alias: "primary" },
    { id: 34, letra: "AD", inicio: 18, fin: 20, situacion: "DESTACADO", color: "VERDE", alias: "success" },
    { id: 44, letra: "-", inicio: 21, fin: 25, situacion: "NO REGISTRADO", color: "GRIS", alias: "secondary" },
];

export const personas = [

    /* Administrador */
    { id: 4, dni: '46556963', sexo: 1, nombres: 'DARWIN JHONATAN', apellidopaterno: 'FLORES', apellidomaterno: 'NUÑEZ', tipodocumentoId: 4 },

    /*  Docentes */
    { id: 14, dni: '44409214', sexo: 1, nombres: 'FLAVIO', apellidopaterno: 'GARCIA', apellidomaterno: 'RIVERA', tipodocumentoId: 4 },
    { id: 24, dni: '46378155', sexo: 2, nombres: 'MILAGROS ANALY', apellidopaterno: 'GOMEZ', apellidomaterno: 'ENCALADA', tipodocumentoId: 4 },
    { id: 34, dni: '40357419', sexo: 1, nombres: 'JOSE JAVIER', apellidopaterno: 'YARLEQUE', apellidomaterno: 'VILCHEZ', tipodocumentoId: 4 },
    { id: 44, dni: '40213876', sexo: 1, nombres: 'DANTE JOEL', apellidopaterno: 'CABREJOS', apellidomaterno: 'REYES', tipodocumentoId: 4 },
    { id: 54, dni: '47903092', sexo: 1, nombres: 'JORGE LUIS', apellidopaterno: 'ACARO', apellidomaterno: 'GARCIA', tipodocumentoId: 4 },
    { id: 64, dni: '44554185', sexo: 1, nombres: 'WILLIAM', apellidopaterno: 'CALLE', apellidomaterno: 'BENITES', tipodocumentoId: 4 },
    { id: 74, dni: '02807311', sexo: 1, nombres: 'WILMER', apellidopaterno: 'CORREA', apellidomaterno: 'GARCIA', tipodocumentoId: 4 },
    { id: 84, dni: '72199165', sexo: 2, nombres: 'ANA BELEN', apellidopaterno: 'INGA', apellidomaterno: 'SALDARRIAGA', tipodocumentoId: 4 },
    { id: 94, dni: '46274986', sexo: 1, nombres: 'VICTOR', apellidopaterno: 'ANTO', apellidomaterno: 'MIMBELA', tipodocumentoId: 4 },

    /*  padres */
    { id: 104, dni: '42215224', sexo: 1, nombres: 'JUAN ALBERTO', apellidopaterno: 'JUAREZ', apellidomaterno: 'CARAMANTIN', tipodocumentoId: 4 },
    { id: 114, dni: '33668077', sexo: 1, nombres: 'JAIME RICARDO', apellidopaterno: 'PINTADO', apellidomaterno: 'CALLE', tipodocumentoId: 4 },
    { id: 124, dni: '42136288', sexo: 1, nombres: 'JORGE', apellidopaterno: 'DIONISIO', apellidomaterno: 'CORDOVA', tipodocumentoId: 4 },
    { id: 134, dni: '40134863', sexo: 1, nombres: 'LUIS MARTIN', apellidopaterno: 'ANASTACIO', apellidomaterno: 'CAMPOS', tipodocumentoId: 4 },
    { id: 144, dni: '41979708', sexo: 1, nombres: 'JHOE FABIAN', apellidopaterno: 'CORDOVA', apellidomaterno: 'VILLEGAS', tipodocumentoId: 4 },
    { id: 154, dni: '28032999', sexo: 1, nombres: 'OSCAR LUIS', apellidopaterno: 'SALDARRIAGA', apellidomaterno: 'MORAN', tipodocumentoId: 4 },
    { id: 164, dni: '80446280', sexo: 1, nombres: 'MEDARDO', apellidopaterno: 'QUISPE', apellidomaterno: 'SAUCEDO', tipodocumentoId: 4 },
    { id: 174, dni: '25431443', sexo: 1, nombres: 'MARTIN', apellidopaterno: 'CHUICA', apellidomaterno: 'ADRIANZEN', tipodocumentoId: 4 },
    { id: 184, dni: '33666766', sexo: 1, nombres: 'VICTOR', apellidopaterno: 'ADRIANZEN', apellidomaterno: 'CHERRES', tipodocumentoId: 4 },

    /* madres */
    { id: 194, dni: '46538404', sexo: 2, nombres: 'KAREN YENYFFER', apellidopaterno: 'PACHERRES', apellidomaterno: 'ODAR', tipodocumentoId: 4 },
    { id: 204, dni: '33300095', sexo: 2, nombres: 'ZULEMA', apellidopaterno: 'PALACIOS', apellidomaterno: 'VELASQUEZ', tipodocumentoId: 4 },
    { id: 214, dni: '42337247', sexo: 2, nombres: 'MILAGROS', apellidopaterno: 'CORDOVA', apellidomaterno: 'LOPEZ', tipodocumentoId: 4 },
    { id: 224, dni: '41940454', sexo: 2, nombres: 'JESSICA MARIA', apellidopaterno: 'BERECHE', apellidomaterno: 'RIVAS', tipodocumentoId: 4 },
    { id: 234, dni: '41784702', sexo: 2, nombres: 'LUCY', apellidopaterno: 'LESCANO', apellidomaterno: 'CAMPOS', tipodocumentoId: 4 },
    { id: 244, dni: '80678486', sexo: 2, nombres: 'MARIA LUISA', apellidopaterno: 'MORALES', apellidomaterno: 'VAZQUES', tipodocumentoId: 4 },
    { id: 254, dni: '40611824', sexo: 2, nombres: 'JULIANA', apellidopaterno: 'BAYONA', apellidomaterno: 'GARCIA', tipodocumentoId: 4 },
    { id: 264, dni: '42634953', sexo: 2, nombres: 'FLOR', apellidopaterno: 'MAZA', apellidomaterno: 'RAMOS', tipodocumentoId: 4 },
    { id: 274, dni: '44247506', sexo: 2, nombres: 'FIORELLA', apellidopaterno: 'AGUIRRE', apellidomaterno: 'VIERA', tipodocumentoId: 4 },
    { id: 284, dni: '43484605', sexo: 2, nombres: 'KARINA', apellidopaterno: 'LOZADA', apellidomaterno: 'YARLEQUE', tipodocumentoId: 4 },

    /* Alumnos */
    { id: 294, dni: '67675770', sexo: 2, nombres: 'ADRIANA FERNANDA', apellidopaterno: 'MORE', apellidomaterno: 'JUAREZ', tipodocumentoId: 4 },
    { id: 304, dni: '34776686', sexo: 1, nombres: 'RICARDO GLEISSNER', apellidopaterno: 'PINTADO', apellidomaterno: 'ORDOÑEZ', tipodocumentoId: 4 },
    { id: 314, dni: '66796519', sexo: 1, nombres: 'MARCO OSVALDO', apellidopaterno: 'TORRES', apellidomaterno: 'DIONISIO', tipodocumentoId: 4 },
    { id: 324, dni: '23522439', sexo: 1, nombres: 'ANDERSON ASAEL', apellidopaterno: 'LOZADA', apellidomaterno: 'ANASTACIO', tipodocumentoId: 4 },
    { id: 334, dni: '94375916', sexo: 1, nombres: 'KEVIN', apellidopaterno: 'PALACIOS', apellidomaterno: 'CORDOVA', tipodocumentoId: 4 },
    { id: 344, dni: '79069307', sexo: 1, nombres: 'ALONSO', apellidopaterno: 'INGA', apellidomaterno: 'SALDARRIAGA', tipodocumentoId: 4 },
    { id: 354, dni: '56066411', sexo: 2, nombres: 'MARIA FERNANDA', apellidopaterno: 'JIMENEZ', apellidomaterno: 'QUISPE', tipodocumentoId: 4 },
    { id: 364, dni: '93625136', sexo: 1, nombres: 'JUNIOR MARTIN', apellidopaterno: 'CHUICA', apellidomaterno: 'MONTENEGRO', tipodocumentoId: 4 },
    { id: 374, dni: '95831424', sexo: 2, nombres: 'ALEXANDRA', apellidopaterno: 'CORNEJO', apellidomaterno: 'ADRIANZEN', tipodocumentoId: 4 },
    { id: 384, dni: '18205639', sexo: 2, nombres: 'DANNA', apellidopaterno: 'DURAN', apellidomaterno: 'PACHERRES', tipodocumentoId: 4 },

    { id: 394, dni: '96483020', sexo: 1, nombres: 'ERICK', apellidopaterno: 'ALVARADO', apellidomaterno: 'BERMEO', tipodocumentoId: 4 },
    { id: 404, dni: '90216663', sexo: 1, nombres: 'CARLOS ROLANDO', apellidopaterno: 'APONTE', apellidomaterno: 'BURNEO', tipodocumentoId: 4 },
    { id: 414, dni: '52389341', sexo: 1, nombres: 'PIERO', apellidopaterno: 'CAMPOS', apellidomaterno: 'MORE', tipodocumentoId: 4 },
    { id: 424, dni: '45014214', sexo: 1, nombres: 'ALEX FABIAN', apellidopaterno: 'CRUZ', apellidomaterno: 'CORDOVA', tipodocumentoId: 4 },
    { id: 434, dni: '75024117', sexo: 2, nombres: 'LEYLA', apellidopaterno: 'GARCIA', apellidomaterno: 'SERNAQUE', tipodocumentoId: 4 },
    { id: 444, dni: '12892836', sexo: 1, nombres: 'ENRIQUE NAPOLEAN', apellidopaterno: 'GUZMAN', apellidomaterno: 'GARCIA', tipodocumentoId: 4 },
    { id: 454, dni: '52730003', sexo: 1, nombres: 'ERICK', apellidopaterno: 'JIMENEZ', apellidomaterno: 'GARCIA', tipodocumentoId: 4 },
    { id: 464, dni: '94442585', sexo: 2, nombres: 'JIMENA', apellidopaterno: 'PALACIOS', apellidomaterno: 'BERECHE', tipodocumentoId: 4 },
    { id: 474, dni: '39099454', sexo: 1, nombres: 'ALEXIS', apellidopaterno: 'ROJAS', apellidomaterno: 'PACHERREZ', tipodocumentoId: 4 },
    { id: 484, dni: '15775569', sexo: 2, nombres: 'ALLISON JIMENA', apellidopaterno: 'VIDAL', apellidomaterno: 'SANCHEZ', tipodocumentoId: 4 },

    { id: 494, dni: '00000000', sexo: 1, nombres: 'DESCONOCIDO', apellidopaterno: 'DESCONOCIDO', apellidomaterno: 'DESCONOCIDO', tipodocumentoId: 4 },

    /** auxiliares */
    { id: 504, dni: '81061664', sexo: 1, nombres: 'FRANKLIN', apellidopaterno: 'APONTE', apellidomaterno: 'QUINTANA', tipodocumentoId: 4 },
    { id: 514, dni: '43195779', sexo: 2, nombres: 'FAVIOLA', apellidopaterno: 'TEZEN', apellidomaterno: 'CHERO', tipodocumentoId: 4 },
    { id: 524, dni: '47503406', sexo: 1, nombres: 'JAVIER ALONSO', apellidopaterno: 'JUAREZ', apellidomaterno: 'BERECHE', tipodocumentoId: 4 },

    /** directores */
    { id: 534, dni: '52639852', sexo: 1, nombres: 'JOSE EDUARDO', apellidopaterno: 'AGURTO', apellidomaterno: 'NOLE', tipodocumentoId: 4 },
    { id: 544, dni: '54784168', sexo: 2, nombres: 'MILAGROS DEL ROSARIO', apellidopaterno: 'SANDOVAL', apellidomaterno: 'VASQUEZ', tipodocumentoId: 4 },
    { id: 554, dni: '49632582', sexo: 2, nombres: 'ANA CELINDA', apellidopaterno: 'ORTIZ', apellidomaterno: 'FALCON', tipodocumentoId: 4 },
    { id: 564, dni: '41528799', sexo: 1, nombres: 'CESAR', apellidopaterno: 'AGUIRRE', apellidomaterno: 'NAVARRO', tipodocumentoId: 4 },
];


export const usuarios = [

    /** ADMINISTRADOR */
    { id: 4, numero: 1, nombre: "Darwin Jhonatan", email: "jhonatan@mail.com", password: "123456", roleId: 4, personaId: 4 },

    /** DOCENTES */
    { id: 14, numero: 2, nombre: "Flavio", email: "flavio2@mail.com", password: "123456", roleId: 14, personaId: 14 },
    { id: 24, numero: 3, nombre: "Milagros", email: "milagros3@mail.com", password: "123456", roleId: 14, personaId: 24 },
    { id: 34, numero: 4, nombre: "Jose", email: "jose4@mail.com", password: "123456", roleId: 14, personaId: 34 },
    { id: 44, numero: 5, nombre: "Dante", email: "dante5@mail.com", password: "123456", roleId: 14, personaId: 44 },
    { id: 54, numero: 6, nombre: "Jorge", email: "jorge6@mail.com", password: "123456", roleId: 14, personaId: 54 },
    { id: 64, numero: 7, nombre: "William", email: "william7@mail.com", password: "123456", roleId: 14, personaId: 64 },
    { id: 74, numero: 8, nombre: "Wilmer", email: "wilmer8@mail.com", password: "123456", roleId: 14, personaId: 74 },
    { id: 84, numero: 9, nombre: "Ana", email: "ana9@mail.com", password: "123456", roleId: 14, personaId: 84 },
    { id: 94, numero: 10, nombre: "Victor", email: "victor10@mail.com", password: "123456", roleId: 14, personaId: 94 },

    /** PADRES */
    { id: 104, numero: 11, nombre: "Juan Alberto", email: "juan11@mail.com", password: "123456", roleId: 24, personaId: 104 },
    { id: 114, numero: 12, nombre: "Jaime Ricardo", email: "jaime12@mail.com", password: "123456", roleId: 24, personaId: 114 },
    { id: 124, numero: 13, nombre: "Jorge", email: "jorge13@mail.com", password: "123456", roleId: 24, personaId: 124 },
    { id: 134, numero: 14, nombre: "Luis Martin", email: "luis14@mail.com", password: "123456", roleId: 24, personaId: 134 },
    { id: 144, numero: 15, nombre: "Jhoe Fabian", email: "jhoe15@mail.com", password: "123456", roleId: 24, personaId: 144 },
    { id: 154, numero: 16, nombre: "Oscar Luis", email: "oscar16@mail.com", password: "123456", roleId: 24, personaId: 154 },
    { id: 164, numero: 17, nombre: "Medardo", email: "medardo17@mail.com", password: "123456", roleId: 24, personaId: 164 },
    { id: 174, numero: 18, nombre: "Martin", email: "martin18@mail.com", password: "123456", roleId: 24, personaId: 174 },
    { id: 184, numero: 19, nombre: "Victor", email: "victor19@mail.com", password: "123456", roleId: 24, personaId: 184 },

    /* MADRES */
    { id: 194, numero: 20, nombre: "Karen jeniffer", email: "karen20@mail.com", password: "123456", roleId: 34, personaId: 194 },
    { id: 204, numero: 21, nombre: "Zulema", email: "zulema21@mail.com", password: "123456", roleId: 34, personaId: 204 },
    { id: 214, numero: 22, nombre: "Milagros", email: "milagros22@mail.com", password: "123456", roleId: 34, personaId: 214 },
    { id: 224, numero: 23, nombre: "Jessica maria", email: "jessica23@mail.com", password: "123456", roleId: 34, personaId: 224 },
    { id: 234, numero: 24, nombre: "Lucy", email: "lucy24@mail.com", password: "123456", roleId: 34, personaId: 234 },
    { id: 244, numero: 25, nombre: "Maria Luisa", email: "maria25@mail.com", password: "123456", roleId: 34, personaId: 244 },
    { id: 254, numero: 26, nombre: "Juliana", email: "juliana26@mail.com", password: "123456", roleId: 34, personaId: 254 },
    { id: 264, numero: 27, nombre: "Flor", email: "flor27@mail.com", password: "123456", roleId: 34, personaId: 264 },
    { id: 274, numero: 28, nombre: "Fiorella", email: "fiorella28@mail.com", password: "123456", roleId: 34, personaId: 274 },
    { id: 284, numero: 29, nombre: "Karina", email: "karina29@mail.com", password: "123456", roleId: 34, personaId: 284 },

    /** ALUMNOS */

    { id: 294, numero: 30, nombre: "Adriana fernamnda", email: "adriana30@mail.com", password: "123456", roleId: 54, personaId: 294 },
    { id: 304, numero: 31, nombre: "Ricardo gleissner", email: "ricardo31@mail.com", password: "123456", roleId: 54, personaId: 304 },
    { id: 314, numero: 32, nombre: "Marco osvaldo", email: "marco32@mail.com", password: "123456", roleId: 54, personaId: 314 },
    { id: 324, numero: 33, nombre: "Anderson asael", email: "anderson33@mail.com", password: "123456", roleId: 54, personaId: 324 },
    { id: 334, numero: 34, nombre: "Kevin", email: "kevin34@mail.com", password: "123456", roleId: 54, personaId: 334 },
    { id: 344, numero: 35, nombre: "Alonso", email: "alonso35@mail.com", password: "123456", roleId: 54, personaId: 344 },
    { id: 354, numero: 36, nombre: "Maria fernanda", email: "maria36@mail.com", password: "123456", roleId: 54, personaId: 354 },
    { id: 364, numero: 37, nombre: "Junior martin", email: "junior37@mail.com", password: "123456", roleId: 54, personaId: 364 },
    { id: 374, numero: 38, nombre: "Alexandra", email: "alexandra38@mail.com", password: "123456", roleId: 54, personaId: 374 },
    { id: 384, numero: 39, nombre: "Danna", email: "danna39@mail.com", password: "123456", roleId: 54, personaId: 384 },

    { id: 394, numero: 40, nombre: "Erick", email: "erick40@mail.com", password: "123456", roleId: 54, personaId: 394 },
    { id: 404, numero: 41, nombre: "Carlos rolando", email: "carlos41@mail.com", password: "123456", roleId: 54, personaId: 404 },
    { id: 414, numero: 42, nombre: "Piero", email: "piero42@mail.com", password: "123456", roleId: 54, personaId: 414 },
    { id: 424, numero: 43, nombre: "Alex fabian", email: "alex43@mail.com", password: "123456", roleId: 54, personaId: 424 },
    { id: 434, numero: 44, nombre: "leyla", email: "leyla44@mail.com", password: "123456", roleId: 54, personaId: 434 },
    { id: 444, numero: 45, nombre: "Enrique napolen", email: "enrique45@mail.com", password: "123456", roleId: 54, personaId: 444 },
    { id: 454, numero: 46, nombre: "Erick", email: "erick46@mail.com", password: "123456", roleId: 54, personaId: 454 },
    { id: 464, numero: 47, nombre: "Jimena", email: "jimena47@mail.com", password: "123456", roleId: 54, personaId: 464 },
    { id: 474, numero: 48, nombre: "Alexis", email: "alexis48@mail.com", password: "123456", roleId: 54, personaId: 474 },
    { id: 484, numero: 49, nombre: "Allison jimena", email: "allison49@mail.com", password: "123456", roleId: 54, personaId: 484 },

    /**Auxiliares */
    { id: 494, numero: 50, nombre: "Franklin", email: "franklin50@mail.com", password: "123456", roleId: 44, personaId: 504 },
    { id: 504, numero: 51, nombre: "Faviola", email: "faviola51@mail.com", password: "123456", roleId: 44, personaId: 514 },
    { id: 514, numero: 52, nombre: "Javier", email: "javier52@mail.com", password: "123456", roleId: 44, personaId: 524 },
];

export const docentes = [
    { id: 4, personaId: 14 },
    { id: 14, personaId: 24 },
    { id: 24, personaId: 34 },
    { id: 34, personaId: 44 },
    { id: 44, personaId: 54 },
    { id: 54, personaId: 64 },
    { id: 64, personaId: 74 },
    { id: 74, personaId: 84 },
    { id: 84, personaId: 94 }
];

export const padres = [

    { id: 4, personaId: 104 },
    { id: 14, personaId: 114 },
    { id: 24, personaId: 124 },
    { id: 34, personaId: 134 },
    { id: 44, personaId: 144 },
    { id: 54, personaId: 154 },
    { id: 64, personaId: 164 },
    { id: 74, personaId: 174 },
    { id: 84, personaId: 184 },
    { id: 94, personaId: 494 },
];

export const madres = [
    { id: 4, personaId: 194 },
    { id: 14, personaId: 204 },
    { id: 24, personaId: 214 },
    { id: 34, personaId: 224 },
    { id: 44, personaId: 234 },
    { id: 54, personaId: 244 },
    { id: 64, personaId: 254 },
    { id: 74, personaId: 264 },
    { id: 84, personaId: 274 },
    { id: 94, personaId: 284 },
    { id: 104, personaId: 494 },
];

export const auxiliares = [
    { id: 4, personaId: 504 },
    { id: 14, personaId: 514 },
    { id: 24, personaId: 524 },
];

export const alumnos = [
    { id: 4, personaId: 294, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 4, madreId: 4 },
    { id: 14, personaId: 304, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 14, madreId: 14 },
    { id: 24, personaId: 314, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 24, madreId: 24 },
    { id: 34, personaId: 324, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 34, madreId: 34 },
    { id: 44, personaId: 334, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 44, madreId: 44 },
    { id: 54, personaId: 344, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 54, madreId: 54 },
    { id: 64, personaId: 354, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 64, madreId: 64 },
    { id: 74, personaId: 364, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 74, madreId: 74 },
    { id: 84, personaId: 374, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 84, madreId: 84 },
    { id: 94, personaId: 384, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 4, madreId: 94 },

    { id: 104, personaId: 394, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 14, madreId: 4 },
    { id: 114, personaId: 404, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 24, madreId: 14 },
    { id: 124, personaId: 414, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 34, madreId: 24 },
    { id: 134, personaId: 424, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 44, madreId: 34 },
    { id: 144, personaId: 434, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 54, madreId: 44 },
    { id: 154, personaId: 444, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 64, madreId: 54 },
    { id: 164, personaId: 454, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 74, madreId: 64 },
    { id: 174, personaId: 464, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 84, madreId: 74 },
    { id: 184, personaId: 474, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 4, madreId: 84 },
    { id: 194, personaId: 484, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 14, madreId: 94 },
];

export const directores = [
    { id: 4, observacion: 'Director', personaId: 534 },
    { id: 14, observacion: 'Sub Directora del Nivel Primario', personaId: 544 },
    { id: 24, observacion: 'Sub Directora del Nivel Secundario', personaId: 554 },
    { id: 34, observacion: 'Sub Director del Nivel Secundario', personaId: 564 },
];

export const aulas = [
    { id: 4, nombre: 'AULA 1 SEC. SECCION A', nivelId: 14, gradoId: 4, seccionId: 4, tipovalor: 1 },
    { id: 14, nombre: 'AULA 2 SEC. SECCION A', nivelId: 14, gradoId: 14, seccionId: 4, tipovalor: 2 },
];
export const programaciones = [

    { id: 4, numeromat: 10, aulaId: 4, docenteId: 4, areaId: 4, periodoId: 4 },
    { id: 14, numeromat: 10, aulaId: 4, docenteId: 14, areaId: 14, periodoId: 4 },
    { id: 24, numeromat: 10, aulaId: 4, docenteId: 24, areaId: 24, periodoId: 4 },
    { id: 34, numeromat: 10, aulaId: 4, docenteId: 34, areaId: 34, periodoId: 4 },
    { id: 44, numeromat: 10, aulaId: 4, docenteId: 44, areaId: 44, periodoId: 4 },
    { id: 54, numeromat: 10, aulaId: 4, docenteId: 54, areaId: 54, periodoId: 4 },
    { id: 64, numeromat: 10, aulaId: 4, docenteId: 64, areaId: 64, periodoId: 4 },
    { id: 74, numeromat: 10, aulaId: 4, docenteId: 74, areaId: 74, periodoId: 4 },

    { id: 84, numeromat: 10, aulaId: 14, docenteId: 84, areaId: 4, periodoId: 4 },
    { id: 94, numeromat: 10, aulaId: 14, docenteId: 4, areaId: 14, periodoId: 4 },
    { id: 104, numeromat: 10, aulaId: 14, docenteId: 14, areaId: 24, periodoId: 4 },
    { id: 114, numeromat: 10, aulaId: 14, docenteId: 24, areaId: 34, periodoId: 4 },
    { id: 124, numeromat: 10, aulaId: 14, docenteId: 34, areaId: 44, periodoId: 4 },
    { id: 134, numeromat: 10, aulaId: 14, docenteId: 44, areaId: 54, periodoId: 4 },
    { id: 144, numeromat: 10, aulaId: 14, docenteId: 54, areaId: 64, periodoId: 4 },
    { id: 154, numeromat: 10, aulaId: 14, docenteId: 64, areaId: 74, periodoId: 4 },

];

export const matriculas = [
    { id: 4, alumnoId: 4 },
    { id: 14, alumnoId: 14 },
    { id: 24, alumnoId: 24 },
    { id: 34, alumnoId: 34 },
    { id: 44, alumnoId: 44 },
    { id: 54, alumnoId: 54 },
    { id: 64, alumnoId: 64 },
    { id: 74, alumnoId: 74 },
    { id: 84, alumnoId: 84 },
    { id: 94, alumnoId: 94 },
    { id: 104, alumnoId: 104 },
    { id: 114, alumnoId: 114 },
    { id: 124, alumnoId: 124 },
    { id: 134, alumnoId: 134 },
    { id: 144, alumnoId: 144 },
    { id: 154, alumnoId: 154 },
    { id: 164, alumnoId: 164 },
    { id: 174, alumnoId: 174 },
    { id: 184, alumnoId: 184 },
    { id: 194, alumnoId: 194 },
];


export const matriculadetalles = [

    /* PRIMERO SECUNDARIA  SECCION A*/
    { id: 4, matriculaId: 4, programacionId: 4 },
    { id: 14, matriculaId: 4, programacionId: 14 },
    { id: 24, matriculaId: 4, programacionId: 24 },
    { id: 34, matriculaId: 4, programacionId: 34 },
    { id: 44, matriculaId: 4, programacionId: 44 },
    { id: 54, matriculaId: 4, programacionId: 54 },
    { id: 64, matriculaId: 4, programacionId: 64 },
    { id: 74, matriculaId: 4, programacionId: 74 },

    { id: 84, matriculaId: 14, programacionId: 4  },
    { id: 94, matriculaId: 14, programacionId: 14 },
    { id: 104, matriculaId: 14, programacionId: 24 },
    { id: 114, matriculaId: 14, programacionId: 34 },
    { id: 124, matriculaId: 14, programacionId: 44 },
    { id: 134, matriculaId: 14, programacionId: 54 },
    { id: 144, matriculaId: 14, programacionId: 64 },
    { id: 154, matriculaId: 14, programacionId: 74 },

    { id: 164, matriculaId: 24, programacionId: 4  },
    { id: 174, matriculaId: 24, programacionId: 14 },
    { id: 184, matriculaId: 24, programacionId: 24 },
    { id: 194, matriculaId: 24, programacionId: 34 },
    { id: 204, matriculaId: 24, programacionId: 44 },
    { id: 214, matriculaId: 24, programacionId: 54 },
    { id: 224, matriculaId: 24, programacionId: 64 },
    { id: 234, matriculaId: 24, programacionId: 74 },

    { id: 244, matriculaId: 34, programacionId: 4  },
    { id: 254, matriculaId: 34, programacionId: 14 },
    { id: 264, matriculaId: 34, programacionId: 24 },
    { id: 274, matriculaId: 34, programacionId: 34 },
    { id: 284, matriculaId: 34, programacionId: 44 },
    { id: 294, matriculaId: 34, programacionId: 54 },
    { id: 304, matriculaId: 34, programacionId: 64 },
    { id: 314, matriculaId: 34, programacionId: 74 },

    { id: 324, matriculaId: 44, programacionId: 4  },
    { id: 334, matriculaId: 44, programacionId: 14 },
    { id: 344, matriculaId: 44, programacionId: 24 },
    { id: 354, matriculaId: 44, programacionId: 34 },
    { id: 364, matriculaId: 44, programacionId: 44 },
    { id: 374, matriculaId: 44, programacionId: 54 },
    { id: 384, matriculaId: 44, programacionId: 64 },
    { id: 394, matriculaId: 44, programacionId: 74 },

    { id: 404, matriculaId: 54, programacionId: 4  },
    { id: 414, matriculaId: 54, programacionId: 14 },
    { id: 424, matriculaId: 54, programacionId: 24 },
    { id: 434, matriculaId: 54, programacionId: 34 },
    { id: 444, matriculaId: 54, programacionId: 44 },
    { id: 454, matriculaId: 54, programacionId: 54 },
    { id: 464, matriculaId: 54, programacionId: 64 },
    { id: 474, matriculaId: 54, programacionId: 74 },

    { id: 484, matriculaId: 64, programacionId: 4  },
    { id: 494, matriculaId: 64, programacionId: 14 },
    { id: 504, matriculaId: 64, programacionId: 24 },
    { id: 514, matriculaId: 64, programacionId: 34 },
    { id: 524, matriculaId: 64, programacionId: 44 },
    { id: 534, matriculaId: 64, programacionId: 54 },
    { id: 544, matriculaId: 64, programacionId: 64 },
    { id: 554, matriculaId: 64, programacionId: 74 },

    { id: 564, matriculaId: 74, programacionId: 4  },
    { id: 574, matriculaId: 74, programacionId: 14 },
    { id: 584, matriculaId: 74, programacionId: 24 },
    { id: 594, matriculaId: 74, programacionId: 34 },
    { id: 604, matriculaId: 74, programacionId: 44 },
    { id: 614, matriculaId: 74, programacionId: 54 },
    { id: 624, matriculaId: 74, programacionId: 64 },
    { id: 634, matriculaId: 74, programacionId: 74 },

    { id: 644, matriculaId: 84, programacionId: 4  },
    { id: 654, matriculaId: 84, programacionId: 14 },
    { id: 664, matriculaId: 84, programacionId: 24 },
    { id: 674, matriculaId: 84, programacionId: 34 },
    { id: 684, matriculaId: 84, programacionId: 44 },
    { id: 694, matriculaId: 84, programacionId: 54 },
    { id: 704, matriculaId: 84, programacionId: 64 },
    { id: 714, matriculaId: 84, programacionId: 74 },

    { id: 724, matriculaId: 94, programacionId: 4  },
    { id: 734, matriculaId: 94, programacionId: 14 },
    { id: 744, matriculaId: 94, programacionId: 24 },
    { id: 754, matriculaId: 94, programacionId: 34 },
    { id: 764, matriculaId: 94, programacionId: 44 },
    { id: 774, matriculaId: 94, programacionId: 54 },
    { id: 784, matriculaId: 94, programacionId: 64 },
    { id: 794, matriculaId: 94, programacionId: 74 },


    /* SEGUNDO SECUNDARIA  SECCION A*/

    { id: 804, matriculaId: 104, programacionId: 84 },
    { id: 814, matriculaId: 104, programacionId: 94 },
    { id: 824, matriculaId: 104, programacionId: 104 },
    { id: 834, matriculaId: 104, programacionId: 114 },
    { id: 844, matriculaId: 104, programacionId: 124 },
    { id: 854, matriculaId: 104, programacionId: 134 },
    { id: 864, matriculaId: 104, programacionId: 144 },
    { id: 874, matriculaId: 104, programacionId: 154 },

    { id: 884, matriculaId: 114, programacionId: 84 },
    { id: 894, matriculaId: 114, programacionId: 94  },
    { id: 904, matriculaId: 114, programacionId: 104 },
    { id: 914, matriculaId: 114, programacionId: 114 },
    { id: 924, matriculaId: 114, programacionId: 124 },
    { id: 934, matriculaId: 114, programacionId: 134 },
    { id: 944, matriculaId: 114, programacionId: 144 },
    { id: 954, matriculaId: 114, programacionId: 154 },

    { id: 964, matriculaId: 124, programacionId: 84 },
    { id: 974, matriculaId: 124, programacionId: 94  },
    { id: 984, matriculaId: 124, programacionId: 104 },
    { id: 994, matriculaId: 124, programacionId: 114 },
    { id: 1004, matriculaId: 124, programacionId: 124 },
    { id: 1014, matriculaId: 124, programacionId: 134 },
    { id: 1024, matriculaId: 124, programacionId: 144 },
    { id: 1034, matriculaId: 124, programacionId: 154 },

    { id: 1044, matriculaId: 134, programacionId: 84 },
    { id: 1054, matriculaId: 134, programacionId: 94  },
    { id: 1064, matriculaId: 134, programacionId: 104 },
    { id: 1074, matriculaId: 134, programacionId: 114 },
    { id: 1084, matriculaId: 134, programacionId: 124 },
    { id: 1094, matriculaId: 134, programacionId: 134 },
    { id: 1104, matriculaId: 134, programacionId: 144 },
    { id: 1114, matriculaId: 134, programacionId: 154 },

    { id: 1124, matriculaId: 144, programacionId: 84 },
    { id: 1134, matriculaId: 144, programacionId: 94  },
    { id: 1144, matriculaId: 144, programacionId: 104 },
    { id: 1154, matriculaId: 144, programacionId: 114 },
    { id: 1164, matriculaId: 144, programacionId: 124 },
    { id: 1174, matriculaId: 144, programacionId: 134 },
    { id: 1184, matriculaId: 144, programacionId: 144 },
    { id: 1194, matriculaId: 144, programacionId: 154 },

    { id: 1204, matriculaId: 154, programacionId: 84 },
    { id: 1214, matriculaId: 154, programacionId: 94  },
    { id: 1224, matriculaId: 154, programacionId: 104 },
    { id: 1234, matriculaId: 154, programacionId: 114 },
    { id: 1244, matriculaId: 154, programacionId: 124 },
    { id: 1254, matriculaId: 154, programacionId: 134 },
    { id: 1264, matriculaId: 154, programacionId: 144 },
    { id: 1274, matriculaId: 154, programacionId: 154 },

    { id: 1284, matriculaId: 164, programacionId: 84 },
    { id: 1294, matriculaId: 164, programacionId: 94  },
    { id: 1304, matriculaId: 164, programacionId: 104 },
    { id: 1314, matriculaId: 164, programacionId: 114 },
    { id: 1324, matriculaId: 164, programacionId: 124 },
    { id: 1334, matriculaId: 164, programacionId: 134 },
    { id: 1344, matriculaId: 164, programacionId: 144 },
    { id: 1354, matriculaId: 164, programacionId: 154 },

    { id: 1364, matriculaId: 174, programacionId: 84 },
    { id: 1374, matriculaId: 174, programacionId: 94  },
    { id: 1384, matriculaId: 174, programacionId: 104 },
    { id: 1394, matriculaId: 174, programacionId: 114 },
    { id: 1404, matriculaId: 174, programacionId: 124 },
    { id: 1414, matriculaId: 174, programacionId: 134 },
    { id: 1424, matriculaId: 174, programacionId: 144 },
    { id: 1434, matriculaId: 174, programacionId: 154 },

    { id: 1444, matriculaId: 184, programacionId: 84 },
    { id: 1454, matriculaId: 184, programacionId: 94  },
    { id: 1464, matriculaId: 184, programacionId: 104 },
    { id: 1474, matriculaId: 184, programacionId: 114 },
    { id: 1484, matriculaId: 184, programacionId: 124 },
    { id: 1494, matriculaId: 184, programacionId: 134 },
    { id: 1504, matriculaId: 184, programacionId: 144 },
    { id: 1514, matriculaId: 184, programacionId: 154 },

    { id: 1524, matriculaId: 194, programacionId: 84 },
    { id: 1534, matriculaId: 194, programacionId: 94  },
    { id: 1544, matriculaId: 194, programacionId: 104 },
    { id: 1554, matriculaId: 194, programacionId: 114 },
    { id: 1564, matriculaId: 194, programacionId: 124 },
    { id: 1574, matriculaId: 194, programacionId: 134 },
    { id: 1584, matriculaId: 194, programacionId: 144 },
    { id: 1594, matriculaId: 194, programacionId: 154 },

];

export const materiales = [

    { id: 4, titulo: "Lorem ipsum dolor sit amet consectetur adipisicing elit", descripcion: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt quo itaque voluptatem nam, repellendus,assumenda consectetur unde distinctio vitae fugit id neque accusamus labore maiores quaerat laudantium inventore eligendi! ", programacionId: 4, fecha: moment().format('YYYY-MM-DD'), archivo: "https://res.cloudinary.com/archivos/image/upload/v1643918075/material/qnamfhnsgkkbs9rqearb.pdf" },
    { id: 14, titulo: "Lorem ipsum dolor sit amet consectetur adipisicing elit", descripcion: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt quo itaque voluptatem nam, repellendus,assumenda consectetur unde distinctio vitae fugit id neque accusamus labore maiores quaerat laudantium inventore eligendi! ", programacionId: 14, fecha: moment().format('YYYY-MM-DD'), archivo: "https://res.cloudinary.com/archivos/image/upload/v1643918075/material/qnamfhnsgkkbs9rqearb.pdf" },
    { id: 24, titulo: "Lorem ipsum dolor sit amet consectetur adipisicing elit", descripcion: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt quo itaque voluptatem nam, repellendus,assumenda consectetur unde distinctio vitae fugit id neque accusamus labore maiores quaerat laudantium inventore eligendi! ", programacionId: 34, fecha: moment().format('YYYY-MM-DD'), archivo: "https://res.cloudinary.com/archivos/image/upload/v1643918075/material/qnamfhnsgkkbs9rqearb.pdf" },
    { id: 34, titulo: "Lorem ipsum dolor sit amet consectetur adipisicing elit", descripcion: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt quo itaque voluptatem nam, repellendus,assumenda consectetur unde distinctio vitae fugit id neque accusamus labore maiores quaerat laudantium inventore eligendi! ", programacionId: 44, fecha: moment().format('YYYY-MM-DD'), archivo: "https://res.cloudinary.com/archivos/image/upload/v1643918075/material/qnamfhnsgkkbs9rqearb.pdf" },
    { id: 44, titulo: "Lorem ipsum dolor sit amet consectetur adipisicing elit", descripcion: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt quo itaque voluptatem nam, repellendus,assumenda consectetur unde distinctio vitae fugit id neque accusamus labore maiores quaerat laudantium inventore eligendi! ", programacionId: 54, fecha: moment().format('YYYY-MM-DD'), archivo: "https://res.cloudinary.com/archivos/image/upload/v1643918075/material/qnamfhnsgkkbs9rqearb.pdf" },
    { id: 54, titulo: "Lorem ipsum dolor sit amet consectetur adipisicing elit", descripcion: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt quo itaque voluptatem nam, repellendus,assumenda consectetur unde distinctio vitae fugit id neque accusamus labore maiores quaerat laudantium inventore eligendi! ", programacionId: 64, fecha: moment().format('YYYY-MM-DD'), archivo: "https://res.cloudinary.com/archivos/image/upload/v1643918075/material/qnamfhnsgkkbs9rqearb.pdf" },
    { id: 64, titulo: "Lorem ipsum dolor sit amet consectetur adipisicing elit", descripcion: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt quo itaque voluptatem nam, repellendus,assumenda consectetur unde distinctio vitae fugit id neque accusamus labore maiores quaerat laudantium inventore eligendi! ", programacionId: 74, fecha: moment().format('YYYY-MM-DD'), archivo: "https://res.cloudinary.com/archivos/image/upload/v1643918075/material/qnamfhnsgkkbs9rqearb.pdf" },
    { id: 74, titulo: "Lorem ipsum dolor sit amet consectetur adipisicing elit", descripcion: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt quo itaque voluptatem nam, repellendus,assumenda consectetur unde distinctio vitae fugit id neque accusamus labore maiores quaerat laudantium inventore eligendi! ", programacionId: 84, fecha: moment().format('YYYY-MM-DD'), archivo: "https://res.cloudinary.com/archivos/image/upload/v1643918075/material/qnamfhnsgkkbs9rqearb.pdf" },

    { id: 84, titulo: "Lorem ipsum dolor sit amet consectetur adipisicing elit", descripcion: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt quo itaque voluptatem nam, repellendus,assumenda consectetur unde distinctio vitae fugit id neque accusamus labore maiores quaerat laudantium inventore eligendi! ", programacionId: 94, fecha: moment().format('YYYY-MM-DD'), archivo: "https://res.cloudinary.com/archivos/image/upload/v1643918075/material/qnamfhnsgkkbs9rqearb.pdf" },
    { id: 94, titulo: "Lorem ipsum dolor sit amet consectetur adipisicing elit", descripcion: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt quo itaque voluptatem nam, repellendus,assumenda consectetur unde distinctio vitae fugit id neque accusamus labore maiores quaerat laudantium inventore eligendi! ", programacionId: 104, fecha: moment().format('YYYY-MM-DD'), archivo: "https://res.cloudinary.com/archivos/image/upload/v1643918075/material/qnamfhnsgkkbs9rqearb.pdf" },
    { id: 104, titulo: "Lorem ipsum dolor sit amet consectetur adipisicing elit", descripcion: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt quo itaque voluptatem nam, repellendus,assumenda consectetur unde distinctio vitae fugit id neque accusamus labore maiores quaerat laudantium inventore eligendi! ", programacionId: 114, fecha: moment().format('YYYY-MM-DD'), archivo: "https://res.cloudinary.com/archivos/image/upload/v1643918075/material/qnamfhnsgkkbs9rqearb.pdf" },
    { id: 114, titulo: "Lorem ipsum dolor sit amet consectetur adipisicing elit", descripcion: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt quo itaque voluptatem nam, repellendus,assumenda consectetur unde distinctio vitae fugit id neque accusamus labore maiores quaerat laudantium inventore eligendi! ", programacionId: 124, fecha: moment().format('YYYY-MM-DD'), archivo: "https://res.cloudinary.com/archivos/image/upload/v1643918075/material/qnamfhnsgkkbs9rqearb.pdf" },
    { id: 124, titulo: "Lorem ipsum dolor sit amet consectetur adipisicing elit", descripcion: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt quo itaque voluptatem nam, repellendus,assumenda consectetur unde distinctio vitae fugit id neque accusamus labore maiores quaerat laudantium inventore eligendi! ", programacionId: 134, fecha: moment().format('YYYY-MM-DD'), archivo: "https://res.cloudinary.com/archivos/image/upload/v1643918075/material/qnamfhnsgkkbs9rqearb.pdf" },
    { id: 134, titulo: "Lorem ipsum dolor sit amet consectetur adipisicing elit", descripcion: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt quo itaque voluptatem nam, repellendus,assumenda consectetur unde distinctio vitae fugit id neque accusamus labore maiores quaerat laudantium inventore eligendi! ", programacionId: 144, fecha: moment().format('YYYY-MM-DD'), archivo: "https://res.cloudinary.com/archivos/image/upload/v1643918075/material/qnamfhnsgkkbs9rqearb.pdf" },
    { id: 144, titulo: "Lorem ipsum dolor sit amet consectetur adipisicing elit", descripcion: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt quo itaque voluptatem nam, repellendus,assumenda consectetur unde distinctio vitae fugit id neque accusamus labore maiores quaerat laudantium inventore eligendi! ", programacionId: 154, fecha: moment().format('YYYY-MM-DD'), archivo: "https://res.cloudinary.com/archivos/image/upload/v1643918075/material/qnamfhnsgkkbs9rqearb.pdf" },
    { id: 154, titulo: "Lorem ipsum dolor sit amet consectetur adipisicing elit", descripcion: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt quo itaque voluptatem nam, repellendus,assumenda consectetur unde distinctio vitae fugit id neque accusamus labore maiores quaerat laudantium inventore eligendi! ", programacionId: 4, fecha: moment().format('YYYY-MM-DD'), archivo: "https://res.cloudinary.com/archivos/image/upload/v1643918075/material/qnamfhnsgkkbs9rqearb.pdf" },

    { id: 164, titulo: "Lorem ipsum dolor sit amet consectetur adipisicing elit", descripcion: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt quo itaque voluptatem nam, repellendus,assumenda consectetur unde distinctio vitae fugit id neque accusamus labore maiores quaerat laudantium inventore eligendi! ", programacionId: 14, fecha: moment().format('YYYY-MM-DD'), archivo: "https://res.cloudinary.com/archivos/image/upload/v1643918075/material/qnamfhnsgkkbs9rqearb.pdf" },
    { id: 174, titulo: "Lorem ipsum dolor sit amet consectetur adipisicing elit", descripcion: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt quo itaque voluptatem nam, repellendus,assumenda consectetur unde distinctio vitae fugit id neque accusamus labore maiores quaerat laudantium inventore eligendi! ", programacionId: 24, fecha: moment().format('YYYY-MM-DD'), archivo: "https://res.cloudinary.com/archivos/image/upload/v1643918075/material/qnamfhnsgkkbs9rqearb.pdf" },
    { id: 184, titulo: "Lorem ipsum dolor sit amet consectetur adipisicing elit", descripcion: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt quo itaque voluptatem nam, repellendus,assumenda consectetur unde distinctio vitae fugit id neque accusamus labore maiores quaerat laudantium inventore eligendi! ", programacionId: 34, fecha: moment().format('YYYY-MM-DD'), archivo: "https://res.cloudinary.com/archivos/image/upload/v1643918075/material/qnamfhnsgkkbs9rqearb.pdf" },
    { id: 194, titulo: "Lorem ipsum dolor sit amet consectetur adipisicing elit", descripcion: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt quo itaque voluptatem nam, repellendus,assumenda consectetur unde distinctio vitae fugit id neque accusamus labore maiores quaerat laudantium inventore eligendi! ", programacionId: 44, fecha: moment().format('YYYY-MM-DD'), archivo: "https://res.cloudinary.com/archivos/image/upload/v1643918075/material/qnamfhnsgkkbs9rqearb.pdf" },
    { id: 204, titulo: "Lorem ipsum dolor sit amet consectetur adipisicing elit", descripcion: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt quo itaque voluptatem nam, repellendus,assumenda consectetur unde distinctio vitae fugit id neque accusamus labore maiores quaerat laudantium inventore eligendi! ", programacionId: 54, fecha: moment().format('YYYY-MM-DD'), archivo: "https://res.cloudinary.com/archivos/image/upload/v1643918075/material/qnamfhnsgkkbs9rqearb.pdf" },
    { id: 214, titulo: "Lorem ipsum dolor sit amet consectetur adipisicing elit", descripcion: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt quo itaque voluptatem nam, repellendus,assumenda consectetur unde distinctio vitae fugit id neque accusamus labore maiores quaerat laudantium inventore eligendi! ", programacionId: 64, fecha: moment().format('YYYY-MM-DD'), archivo: "https://res.cloudinary.com/archivos/image/upload/v1643918075/material/qnamfhnsgkkbs9rqearb.pdf" },
    { id: 224, titulo: "Lorem ipsum dolor sit amet consectetur adipisicing elit", descripcion: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt quo itaque voluptatem nam, repellendus,assumenda consectetur unde distinctio vitae fugit id neque accusamus labore maiores quaerat laudantium inventore eligendi! ", programacionId: 74, fecha: moment().format('YYYY-MM-DD'), archivo: "https://res.cloudinary.com/archivos/image/upload/v1643918075/material/qnamfhnsgkkbs9rqearb.pdf" },
    { id: 234, titulo: "Lorem ipsum dolor sit amet consectetur adipisicing elit", descripcion: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt quo itaque voluptatem nam, repellendus,assumenda consectetur unde distinctio vitae fugit id neque accusamus labore maiores quaerat laudantium inventore eligendi! ", programacionId: 84, fecha: moment().format('YYYY-MM-DD'), archivo: "https://res.cloudinary.com/archivos/image/upload/v1643918075/material/qnamfhnsgkkbs9rqearb.pdf" },

    { id: 244, titulo: "Lorem ipsum dolor sit amet consectetur adipisicing elit", descripcion: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt quo itaque voluptatem nam, repellendus,assumenda consectetur unde distinctio vitae fugit id neque accusamus labore maiores quaerat laudantium inventore eligendi! ", programacionId: 94, fecha: moment().format('YYYY-MM-DD'), archivo: "https://res.cloudinary.com/archivos/image/upload/v1643918075/material/qnamfhnsgkkbs9rqearb.pdf" },
    { id: 254, titulo: "Lorem ipsum dolor sit amet consectetur adipisicing elit", descripcion: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt quo itaque voluptatem nam, repellendus,assumenda consectetur unde distinctio vitae fugit id neque accusamus labore maiores quaerat laudantium inventore eligendi! ", programacionId: 104, fecha: moment().format('YYYY-MM-DD'), archivo: "https://res.cloudinary.com/archivos/image/upload/v1643918075/material/qnamfhnsgkkbs9rqearb.pdf" },
    { id: 264, titulo: "Lorem ipsum dolor sit amet consectetur adipisicing elit", descripcion: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt quo itaque voluptatem nam, repellendus,assumenda consectetur unde distinctio vitae fugit id neque accusamus labore maiores quaerat laudantium inventore eligendi! ", programacionId: 114, fecha: moment().format('YYYY-MM-DD'), archivo: "https://res.cloudinary.com/archivos/image/upload/v1643918075/material/qnamfhnsgkkbs9rqearb.pdf" },
    { id: 274, titulo: "Lorem ipsum dolor sit amet consectetur adipisicing elit", descripcion: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt quo itaque voluptatem nam, repellendus,assumenda consectetur unde distinctio vitae fugit id neque accusamus labore maiores quaerat laudantium inventore eligendi! ", programacionId: 124, fecha: moment().format('YYYY-MM-DD'), archivo: "https://res.cloudinary.com/archivos/image/upload/v1643918075/material/qnamfhnsgkkbs9rqearb.pdf" },

];

export const mensajerias = [
    {
        id: 4,
        emisor: "jhonatan@mail.com",
        receptor: "dante5@mail.com",
        asunto: "Mensaje de Prueba",
        contenido: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum earum molestiae iste explicabo laboriosam adipisci quas debitis temporibus accusamus at, impedit eos ducimus cum. Dicta accusantium enim iure omnis optio!",
        fecha: moment().format('YYYY-MM-DD'),
        hora: moment().format('LTS')
    },
    {
        id: 14,
        emisor: "jhonatan@mail.com",
        receptor: "dante5@mail.com",
        asunto: "Mensaje de Prueba 2",
        contenido: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum earum molestiae iste explicabo laboriosam adipisci quas debitis temporibus accusamus at, impedit eos ducimus cum. Dicta accusantium enim iure omnis optio!",
        fecha: moment().format('YYYY-MM-DD'),
        hora: moment().format('LTS')
    },
    {
        id: 24,
        emisor: "dante5@mail.com",
        receptor: "jhonatan@mail.com",
        asunto: "Mensaje de Prueba 2",
        contenido: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum earum molestiae iste explicabo laboriosam adipisci quas debitis temporibus accusamus at, impedit eos ducimus cum. Dicta accusantium enim iure omnis optio!",
        fecha: moment().format('YYYY-MM-DD'),
        hora: moment().format('LTS')
    },
    {
        id: 34,
        emisor: "dante5@mail.com",
        receptor: "jhonatan@mail.com",
        asunto: "Mensaje de Prueba 2",
        contenido: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum earum molestiae iste explicabo laboriosam adipisci quas debitis temporibus accusamus at, impedit eos ducimus cum. Dicta accusantium enim iure omnis optio!",
        fecha: moment().format('YYYY-MM-DD'),
        hora: moment().format('LTS')
    }
];


