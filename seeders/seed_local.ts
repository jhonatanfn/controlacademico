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
    { id: 1, nombre: "ADMINISTRADOR", bgcolor: "bg-primary" },
    { id: 2, nombre: "DOCENTE", bgcolor: "bg-success" },
    { id: 3, nombre: "PADRE", bgcolor: "bg-danger" },
    { id: 4, nombre: "MADRE", bgcolor: "bg-info" },
    { id: 5, nombre: "AUXILIAR", bgcolor: "bg-warning" },
    { id: 6, nombre: "ALUMNO", bgcolor: "bg-dark" },
];
export const situaciones = [
    { id: 4, nombre: "FALTÓ", color: 'danger', abreviatura: "F" },
    { id: 14, nombre: "ASISTÍO", color: 'success', abreviatura: "A" },
    { id: 24, nombre: "JUSTIFICÓ", color: 'primary', abreviatura: "J" },
    { id: 34, nombre: "TARDANZA", color: 'warning', abreviatura: "T" },
    { id: 44, nombre: "NO REGISTRÓ", color: 'secondary', abreviatura: "NR" }
];
export const areas = [
    { id: 1, nombre: "MATEMATICA" },
    { id: 2, nombre: "COMUNICACION" },
    { id: 3, nombre: "ARTE Y CULTURA" },
    { id: 4, nombre: "PERSONAL SOCIAL" },
    { id: 5, nombre: "CIENCIA Y TECNOLOGÍA" },
    { id: 6, nombre: "EDUCACIÓN FÍSICA" },
    { id: 7, nombre: "EDUCACIÓN RELIGIOSA" },
    { id: 8, nombre: "COMPETENCIAS TRANSVERSALES" },
];

export const competencias = [
    { id: 1, descripcion: "Resuelve problemas de cantidad.", areaId: 1 },
    { id: 2, descripcion: "Resuelve problemas de regularidad, equivalencia y cambio.", areaId: 1 },
    { id: 3, descripcion: "Resuelve problemas de forma, movimiento y localizacion.", areaId: 1 },
    { id: 4, descripcion: "Resuelve problemas de gestion de datos e incertidumbre.", areaId: 1 },

    { id: 5, descripcion: "Se comunica oralmente en lengua materna.", areaId: 2 },
    { id: 6, descripcion: "Lee diversos tipos de textos escritos en su lengua materna.", areaId: 2 },
    { id: 7, descripcion: "Escribe diversos tipos de textos en su lengua materna.", areaId: 2 },

    { id: 8, descripcion: "Aprecia de manera crítica manifestaciones artístico-culturales.", areaId: 3 },
    { id: 9, descripcion: "Crea proyectos desde los lenguajes artísticos.", areaId: 3 },

    { id: 10, descripcion: "Construye su identidad.", areaId: 4 },
    { id: 11, descripcion: "Convive y participa democráticamente en la búsqueda del bien común.", areaId: 4 },
    { id: 12, descripcion: "Construye interpretaciones históricas.", areaId: 4 },
    { id: 13, descripcion: "Gestiona responsablemente el espacio y el ambiente.", areaId: 4 },
    { id: 14, descripcion: "Gestiona responsablemente los recursos económicos.", areaId: 4 },

    { id: 15, descripcion: "Indaga mediante métodos científicos para construir sus conocimientos.", areaId: 5 },
    { id: 16, descripcion: "Explica el mundo físico basándose en conocimientos sobre los seres vivos, materia y energía.", areaId: 5 },
    { id: 17, descripcion: "Diseña y construye soluciones tecnológicas para resolver problemas de su entorno.", areaId: 5 },

    { id: 18, descripcion: "Se desenvuelve de manera autónoma a través de su motricidad.", areaId: 6 },
    { id: 19, descripcion: "Asume una vida saludable.", areaId: 6 },
    { id: 20, descripcion: "Interactúa a través de sus habilidades sociomotrices.", areaId: 6 },

    { id: 21, descripcion: "Construye su identidad como persona humana, amada por Dios, digna, libre y trascendente, comprendiendo la doctrina de su propia religión, abierto al diálogo con las que le son cercanas.", areaId: 7 },
    { id: 22, descripcion: "Asume la experiencia del encuentro personal y comunitario con Dios en su proyecto de vida en coherencia con su creencia religiosa.", areaId: 7 },

    { id: 23, descripcion: "Se desenvuelve en entornos virtuales generados por las TICs.", areaId: 8 },
    { id: 24, descripcion: "Gestiona su aprendizaje de manera autónoma.", areaId: 8 },
];
export const tipodocumentos = [
    { id: 1, nombre: 'DNI' },
];
export const niveles = [
    { id: 1, nombre: 'PRIMARIA' },
    { id: 2, nombre: 'SECUNDARIA' },
];
export const grados = [
    { id: 1, nombre: 'PRIMERO' },
    { id: 2, nombre: 'SEGUNDO' },
    { id: 3, nombre: 'TERCERO' },
    { id: 4, nombre: 'CUARTO' },
    { id: 5, nombre: 'QUINTO' },
    { id: 6, nombre: 'SEXTO' },
];
export const secciones = [
    { id: 1, nombre: 'A' },
    { id: 2, nombre: 'B' },
    { id: 3, nombre: 'C' },
    { id: 4, nombre: 'D' }
];
export const periodos = [
    { id: 1, nombre: '2022', fechainicial: "2022-03-01", fechafinal: "2022-12-31" },
    { id: 2, nombre: '2023', fechainicial: "2023-03-01", fechafinal: "2023-12-31" }
];
export const evaluaciones = [
    { id: 1, nombre: 'TRABAJOS INDIVIDUALES', abreviatura: 'PA' },
    { id: 2, nombre: 'TRABAJOS GRUPALES', abreviatura: 'PA' },
    { id: 3, nombre: 'TAREAS', abreviatura: 'TAR' },
    { id: 4, nombre: 'PARTICIPACIONES EN CLASE', abreviatura: 'PC' },
    { id: 5, nombre: 'EXPOSICIONES', abreviatura: 'EXPO' },
    { id: 6, nombre: 'EXAMENES ESCRITOS', abreviatura: 'EX' }
];
export const ciclos = [
    { id: 4, nombre: 'B1' },
    { id: 14, nombre: 'B2' },
    { id: 24, nombre: 'B3' },
    { id: 34, nombre: 'B4' }
];
export const horas = [
    { id: 1, nombre: "1°", inicio: "8:00 am", fin: "8:45 am", tipo: 1 },
    { id: 2, nombre: "2°", inicio: "8:45 am", fin: "9:30 am", tipo: 1 },
    { id: 3, nombre: "3°", inicio: "9:30 am", fin: "10:15 am", tipo: 1 },
    { id: 4, nombre: "4°", inicio: "10:15 am", fin: "10:45 am", tipo: 0 },
    { id: 5, nombre: "5°", inicio: "10:45 am", fin: "11:30 am", tipo: 1 },
    { id: 6, nombre: "6°", inicio: "11:30 am", fin: "12:15 pm", tipo: 1 },
    { id: 7, nombre: "7°", inicio: "12:15 pm", fin: "1:00 pm", tipo: 1 },
    { id: 8, nombre: "8°", inicio: "1:00 pm", fin: "1:30 pm", tipo: 0 },
    { id: 9, nombre: "9°", inicio: "1:30 pm", fin: "2:15 pm", tipo: 1 },
    { id: 10, nombre: "10°", inicio: "2:15 pm", fin: "3:00 pm", tipo: 1 },
];

export const rangos = [
    { id: 1, letra: "C", inicio: 0, fin: 10, situacion: "INICIO", color: "ROJO", alias: "danger" },
    { id: 2, letra: "B", inicio: 11, fin: 14, situacion: "PROCESO", color: "AMARILLO", alias: "warning" },
    { id: 3, letra: "A", inicio: 15, fin: 17, situacion: "LOGRADO", color: "AZUL", alias: "primary" },
    { id: 4, letra: "AD", inicio: 18, fin: 20, situacion: "DESTACADO", color: "VERDE", alias: "success" },
    { id: 5, letra: "-", inicio: 21, fin: 25, situacion: "NO REGISTRADO", color: "GRIS", alias: "secondary" },
];

export const personas = [

    /* Administrador */
    { id: 1, dni: '46556963', sexo: 1, nombres: 'DARWIN JHONATAN', apellidopaterno: 'FLORES', apellidomaterno: 'NUÑEZ', tipodocumentoId: 1 },

    /*  Docentes */
    { id: 2, dni: '44409214', sexo: 1, nombres: 'FLAVIO', apellidopaterno: 'GARCIA', apellidomaterno: 'RIVERA', tipodocumentoId: 1 },
    { id: 3, dni: '46378155', sexo: 2, nombres: 'MILAGROS ANALY', apellidopaterno: 'GOMEZ', apellidomaterno: 'ENCALADA', tipodocumentoId: 1 },
    { id: 4, dni: '40357419', sexo: 1, nombres: 'JOSE JAVIER', apellidopaterno: 'YARLEQUE', apellidomaterno: 'VILCHEZ', tipodocumentoId: 1 },
    { id: 5, dni: '40213876', sexo: 1, nombres: 'DANTE JOEL', apellidopaterno: 'CABREJOS', apellidomaterno: 'REYES', tipodocumentoId: 1 },
    { id: 6, dni: '47903092', sexo: 1, nombres: 'JORGE LUIS', apellidopaterno: 'ACARO', apellidomaterno: 'GARCIA', tipodocumentoId: 1 },
    { id: 7, dni: '44554185', sexo: 1, nombres: 'WILLIAM', apellidopaterno: 'CALLE', apellidomaterno: 'BENITES', tipodocumentoId: 1 },
    { id: 8, dni: '02807311', sexo: 1, nombres: 'WILMER', apellidopaterno: 'CORREA', apellidomaterno: 'GARCIA', tipodocumentoId: 1 },
    { id: 9, dni: '72199165', sexo: 2, nombres: 'ANA BELEN', apellidopaterno: 'INGA', apellidomaterno: 'SALDARRIAGA', tipodocumentoId: 1 },
    { id: 10, dni: '46274986', sexo: 1, nombres: 'VICTOR', apellidopaterno: 'ANTO', apellidomaterno: 'MIMBELA', tipodocumentoId: 1 },

    /*  padres */
    { id: 11, dni: '42215224', sexo: 1, nombres: 'JUAN ALBERTO', apellidopaterno: 'JUAREZ', apellidomaterno: 'CARAMANTIN', tipodocumentoId: 1 },
    { id: 12, dni: '33668077', sexo: 1, nombres: 'JAIME RICARDO', apellidopaterno: 'PINTADO', apellidomaterno: 'CALLE', tipodocumentoId: 1 },
    { id: 13, dni: '42136288', sexo: 1, nombres: 'JORGE', apellidopaterno: 'DIONISIO', apellidomaterno: 'CORDOVA', tipodocumentoId: 1 },
    { id: 14, dni: '40134863', sexo: 1, nombres: 'LUIS MARTIN', apellidopaterno: 'ANASTACIO', apellidomaterno: 'CAMPOS', tipodocumentoId: 1 },
    { id: 15, dni: '41979708', sexo: 1, nombres: 'JHOE FABIAN', apellidopaterno: 'CORDOVA', apellidomaterno: 'VILLEGAS', tipodocumentoId: 1 },
    { id: 16, dni: '28032999', sexo: 1, nombres: 'OSCAR LUIS', apellidopaterno: 'SALDARRIAGA', apellidomaterno: 'MORAN', tipodocumentoId: 1 },
    { id: 17, dni: '80446280', sexo: 1, nombres: 'MEDARDO', apellidopaterno: 'QUISPE', apellidomaterno: 'SAUCEDO', tipodocumentoId: 1 },
    { id: 18, dni: '25431443', sexo: 1, nombres: 'MARTIN', apellidopaterno: 'CHUICA', apellidomaterno: 'ADRIANZEN', tipodocumentoId: 1 },
    { id: 19, dni: '33666766', sexo: 1, nombres: 'VICTOR', apellidopaterno: 'ADRIANZEN', apellidomaterno: 'CHERRES', tipodocumentoId: 1 },

    /* madres */
    { id: 20, dni: '46538404', sexo: 2, nombres: 'KAREN YENYFFER', apellidopaterno: 'PACHERRES', apellidomaterno: 'ODAR', tipodocumentoId: 1 },
    { id: 21, dni: '33300095', sexo: 2, nombres: 'ZULEMA', apellidopaterno: 'PALACIOS', apellidomaterno: 'VELASQUEZ', tipodocumentoId: 1 },
    { id: 22, dni: '42337247', sexo: 2, nombres: 'MILAGROS', apellidopaterno: 'CORDOVA', apellidomaterno: 'LOPEZ', tipodocumentoId: 1 },
    { id: 23, dni: '41940454', sexo: 2, nombres: 'JESSICA MARIA', apellidopaterno: 'BERECHE', apellidomaterno: 'RIVAS', tipodocumentoId: 1 },
    { id: 24, dni: '41784702', sexo: 2, nombres: 'LUCY', apellidopaterno: 'LESCANO', apellidomaterno: 'CAMPOS', tipodocumentoId: 1 },
    { id: 25, dni: '80678486', sexo: 2, nombres: 'MARIA LUISA', apellidopaterno: 'MORALES', apellidomaterno: 'VAZQUES', tipodocumentoId: 1 },
    { id: 26, dni: '40611824', sexo: 2, nombres: 'JULIANA', apellidopaterno: 'BAYONA', apellidomaterno: 'GARCIA', tipodocumentoId: 1 },
    { id: 27, dni: '42634953', sexo: 2, nombres: 'FLOR', apellidopaterno: 'MAZA', apellidomaterno: 'RAMOS', tipodocumentoId: 1 },
    { id: 28, dni: '44247506', sexo: 2, nombres: 'FIORELLA', apellidopaterno: 'AGUIRRE', apellidomaterno: 'VIERA', tipodocumentoId: 1 },
    { id: 29, dni: '43484605', sexo: 2, nombres: 'KARINA', apellidopaterno: 'LOZADA', apellidomaterno: 'YARLEQUE', tipodocumentoId: 1 },

    /* Alumnos */
    { id: 30, dni: '67675770', sexo: 2, nombres: 'ADRIANA FERNANDA', apellidopaterno: 'MORE', apellidomaterno: 'JUAREZ', tipodocumentoId: 1 },
    { id: 31, dni: '34776686', sexo: 1, nombres: 'RICARDO GLEISSNER', apellidopaterno: 'PINTADO', apellidomaterno: 'ORDOÑEZ', tipodocumentoId: 1 },
    { id: 32, dni: '66796519', sexo: 1, nombres: 'MARCO OSVALDO', apellidopaterno: 'TORRES', apellidomaterno: 'DIONISIO', tipodocumentoId: 1 },
    { id: 33, dni: '23522439', sexo: 1, nombres: 'ANDERSON ASAEL', apellidopaterno: 'LOZADA', apellidomaterno: 'ANASTACIO', tipodocumentoId: 1 },
    { id: 34, dni: '94375916', sexo: 1, nombres: 'KEVIN', apellidopaterno: 'PALACIOS', apellidomaterno: 'CORDOVA', tipodocumentoId: 1 },
    { id: 35, dni: '79069307', sexo: 1, nombres: 'ALONSO', apellidopaterno: 'INGA', apellidomaterno: 'SALDARRIAGA', tipodocumentoId: 1 },
    { id: 36, dni: '56066411', sexo: 2, nombres: 'MARIA FERNANDA', apellidopaterno: 'JIMENEZ', apellidomaterno: 'QUISPE', tipodocumentoId: 1 },
    { id: 37, dni: '93625136', sexo: 1, nombres: 'JUNIOR MARTIN', apellidopaterno: 'CHUICA', apellidomaterno: 'MONTENEGRO', tipodocumentoId: 1 },
    { id: 38, dni: '95831424', sexo: 2, nombres: 'ALEXANDRA', apellidopaterno: 'CORNEJO', apellidomaterno: 'ADRIANZEN', tipodocumentoId: 1 },
    { id: 39, dni: '18205639', sexo: 2, nombres: 'DANNA', apellidopaterno: 'DURAN', apellidomaterno: 'PACHERRES', tipodocumentoId: 1 },

    { id: 40, dni: '96483020', sexo: 1, nombres: 'ERICK', apellidopaterno: 'ALVARADO', apellidomaterno: 'BERMEO', tipodocumentoId: 1 },
    { id: 41, dni: '90216663', sexo: 1, nombres: 'CARLOS ROLANDO', apellidopaterno: 'APONTE', apellidomaterno: 'BURNEO', tipodocumentoId: 1 },
    { id: 42, dni: '52389341', sexo: 1, nombres: 'PIERO', apellidopaterno: 'CAMPOS', apellidomaterno: 'MORE', tipodocumentoId: 1 },
    { id: 43, dni: '45014214', sexo: 1, nombres: 'ALEX FABIAN', apellidopaterno: 'CRUZ', apellidomaterno: 'CORDOVA', tipodocumentoId: 1 },
    { id: 44, dni: '75024117', sexo: 2, nombres: 'LEYLA', apellidopaterno: 'GARCIA', apellidomaterno: 'SERNAQUE', tipodocumentoId: 1 },
    { id: 45, dni: '12892836', sexo: 1, nombres: 'ENRIQUE NAPOLEAN', apellidopaterno: 'GUZMAN', apellidomaterno: 'GARCIA', tipodocumentoId: 1 },
    { id: 46, dni: '52730003', sexo: 1, nombres: 'ERICK', apellidopaterno: 'JIMENEZ', apellidomaterno: 'GARCIA', tipodocumentoId: 1 },
    { id: 47, dni: '94442585', sexo: 2, nombres: 'JIMENA', apellidopaterno: 'PALACIOS', apellidomaterno: 'BERECHE', tipodocumentoId: 1 },
    { id: 48, dni: '39099454', sexo: 1, nombres: 'ALEXIS', apellidopaterno: 'ROJAS', apellidomaterno: 'PACHERREZ', tipodocumentoId: 1 },
    { id: 49, dni: '15775569', sexo: 2, nombres: 'ALLISON JIMENA', apellidopaterno: 'VIDAL', apellidomaterno: 'SANCHEZ', tipodocumentoId: 1 },

    { id: 50, dni: '00000000', sexo: 1, nombres: 'DESCONOCIDO', apellidopaterno: 'DESCONOCIDO', apellidomaterno: 'DESCONOCIDO', tipodocumentoId: 1 },

    /** auxiliares */
    { id: 51, dni: '81061664', sexo: 1, nombres: 'FRANKLIN', apellidopaterno: 'APONTE', apellidomaterno: 'QUINTANA', tipodocumentoId: 1 },
    { id: 52, dni: '43195779', sexo: 2, nombres: 'FAVIOLA', apellidopaterno: 'TEZEN', apellidomaterno: 'CHERO', tipodocumentoId: 1 },
    { id: 53, dni: '47503406', sexo: 1, nombres: 'JAVIER ALONSO', apellidopaterno: 'JUAREZ', apellidomaterno: 'BERECHE', tipodocumentoId: 1 },

    /** directores */
    { id: 54, dni: '52639852', sexo: 1, nombres: 'JOSE EDUARDO', apellidopaterno: 'AGURTO', apellidomaterno: 'NOLE', tipodocumentoId: 1 },
    { id: 55, dni: '54784168', sexo: 2, nombres: 'MILAGROS DEL ROSARIO', apellidopaterno: 'SANDOVAL', apellidomaterno: 'VASQUEZ', tipodocumentoId: 1 },
    { id: 56, dni: '49632582', sexo: 2, nombres: 'ANA CELINDA', apellidopaterno: 'ORTIZ', apellidomaterno: 'FALCON', tipodocumentoId: 1 },
    { id: 57, dni: '41528799', sexo: 1, nombres: 'CESAR', apellidopaterno: 'AGUIRRE', apellidomaterno: 'NAVARRO', tipodocumentoId: 1 },
];


export const usuarios = [

    /** ADMINISTRADOR */
    { id: 1, numero: 1, nombre: "Darwin Jhonatan", email: "jhonatan@mail.com", password: "123456", roleId: 1, personaId: 1 },

    /** DOCENTES */
    { id: 2, numero: 2, nombre: "Flavio", email: "flavio2@mail.com", password: "123456", roleId: 2, personaId: 2 },
    { id: 3, numero: 3, nombre: "Milagros", email: "milagros3@mail.com", password: "123456", roleId: 2, personaId: 3 },
    { id: 4, numero: 4, nombre: "Jose", email: "jose4@mail.com", password: "123456", roleId: 2, personaId: 4 },
    { id: 5, numero: 5, nombre: "Dante", email: "dante5@mail.com", password: "123456", roleId: 2, personaId: 5 },
    { id: 6, numero: 6, nombre: "Jorge", email: "jorge6@mail.com", password: "123456", roleId: 2, personaId: 6 },
    { id: 7, numero: 7, nombre: "William", email: "william7@mail.com", password: "123456", roleId: 2, personaId: 7 },
    { id: 8, numero: 8, nombre: "Wilmer", email: "wilmer8@mail.com", password: "123456", roleId: 2, personaId: 8 },
    { id: 9, numero: 9, nombre: "Ana", email: "ana9@mail.com", password: "123456", roleId: 2, personaId: 9 },
    { id: 10, numero: 10, nombre: "Victor", email: "victor10@mail.com", password: "123456", roleId: 2, personaId: 10 },

    /** PADRES */
    { id: 11, numero: 11, nombre: "Juan Alberto", email: "juan11@mail.com", password: "123456", roleId: 3, personaId: 11 },
    { id: 12, numero: 12, nombre: "Jaime Ricardo", email: "jaime12@mail.com", password: "123456", roleId: 3, personaId: 12 },
    { id: 13, numero: 13, nombre: "Jorge", email: "jorge13@mail.com", password: "123456", roleId: 3, personaId: 13 },
    { id: 14, numero: 14, nombre: "Luis Martin", email: "luis14@mail.com", password: "123456", roleId: 3, personaId: 14 },
    { id: 15, numero: 15, nombre: "Jhoe Fabian", email: "jhoe15@mail.com", password: "123456", roleId: 3, personaId: 15 },
    { id: 16, numero: 16, nombre: "Oscar Luis", email: "oscar16@mail.com", password: "123456", roleId: 3, personaId: 16 },
    { id: 17, numero: 17, nombre: "Medardo", email: "medardo17@mail.com", password: "123456", roleId: 3, personaId: 17 },
    { id: 18, numero: 18, nombre: "Martin", email: "martin18@mail.com", password: "123456", roleId: 3, personaId: 18 },
    { id: 19, numero: 19, nombre: "Victor", email: "victor19@mail.com", password: "123456", roleId: 3, personaId: 19 },

    /* MADRES */
    { id: 20, numero: 20, nombre: "Karen jeniffer", email: "karen20@mail.com", password: "123456", roleId: 4, personaId: 20 },
    { id: 21, numero: 21, nombre: "Zulema", email: "zulema21@mail.com", password: "123456", roleId: 4, personaId: 21 },
    { id: 22, numero: 22, nombre: "Milagros", email: "milagros22@mail.com", password: "123456", roleId: 4, personaId: 22 },
    { id: 23, numero: 23, nombre: "Jessica maria", email: "jessica23@mail.com", password: "123456", roleId: 4, personaId: 23 },
    { id: 24, numero: 24, nombre: "Lucy", email: "lucy24@mail.com", password: "123456", roleId: 4, personaId: 24 },
    { id: 25, numero: 25, nombre: "Maria Luisa", email: "maria25@mail.com", password: "123456", roleId: 4, personaId: 25 },
    { id: 26, numero: 26, nombre: "Juliana", email: "juliana26@mail.com", password: "123456", roleId: 4, personaId: 26 },
    { id: 27, numero: 27, nombre: "Flor", email: "flor27@mail.com", password: "123456", roleId: 4, personaId: 27 },
    { id: 28, numero: 28, nombre: "Fiorella", email: "fiorella28@mail.com", password: "123456", roleId: 4, personaId: 28 },
    { id: 29, numero: 29, nombre: "Karina", email: "karina29@mail.com", password: "123456", roleId: 4, personaId: 29 },

    /** ALUMNOS */

    { id: 30, numero: 30, nombre: "Adriana fernamnda", email: "adriana30@mail.com", password: "123456", roleId: 6, personaId: 30 },
    { id: 31, numero: 31, nombre: "Ricardo gleissner", email: "ricardo31@mail.com", password: "123456", roleId: 6, personaId: 31 },
    { id: 32, numero: 32, nombre: "Marco osvaldo", email: "marco32@mail.com", password: "123456", roleId: 6, personaId: 32 },
    { id: 33, numero: 33, nombre: "Anderson asael", email: "anderson33@mail.com", password: "123456", roleId: 6, personaId: 33 },
    { id: 34, numero: 34, nombre: "Kevin", email: "kevin34@mail.com", password: "123456", roleId: 6, personaId: 34 },
    { id: 35, numero: 35, nombre: "Alonso", email: "alonso35@mail.com", password: "123456", roleId: 6, personaId: 35 },
    { id: 36, numero: 36, nombre: "Maria fernanda", email: "maria36@mail.com", password: "123456", roleId: 6, personaId: 36 },
    { id: 37, numero: 37, nombre: "Junior martin", email: "junior37@mail.com", password: "123456", roleId: 6, personaId: 37 },
    { id: 38, numero: 38, nombre: "Alexandra", email: "alexandra38@mail.com", password: "123456", roleId: 6, personaId: 38 },
    { id: 39, numero: 39, nombre: "Danna", email: "danna39@mail.com", password: "123456", roleId: 6, personaId: 39 },

    { id: 40, numero: 40, nombre: "Erick", email: "erick40@mail.com", password: "123456", roleId: 6, personaId: 40 },
    { id: 41, numero: 41, nombre: "Carlos rolando", email: "carlos41@mail.com", password: "123456", roleId: 6, personaId: 41 },
    { id: 42, numero: 42, nombre: "Piero", email: "piero42@mail.com", password: "123456", roleId: 6, personaId: 42 },
    { id: 43, numero: 43, nombre: "Alex fabian", email: "alex43@mail.com", password: "123456", roleId: 6, personaId: 43 },
    { id: 44, numero: 44, nombre: "leyla", email: "leyla44@mail.com", password: "123456", roleId: 6, personaId: 44 },
    { id: 45, numero: 45, nombre: "Enrique napolen", email: "enrique45@mail.com", password: "123456", roleId: 6, personaId: 45 },
    { id: 46, numero: 46, nombre: "Erick", email: "erick46@mail.com", password: "123456", roleId: 6, personaId: 46 },
    { id: 47, numero: 47, nombre: "Jimena", email: "jimena47@mail.com", password: "123456", roleId: 6, personaId: 47 },
    { id: 48, numero: 48, nombre: "Alexis", email: "alexis48@mail.com", password: "123456", roleId: 6, personaId: 48 },
    { id: 49, numero: 49, nombre: "Allison jimena", email: "allison49@mail.com", password: "123456", roleId: 6, personaId: 49 },

    /**Auxiliares */
    { id: 50, numero: 50, nombre: "Franklin", email: "franklin50@mail.com", password: "123456", roleId: 5, personaId: 51 },
    { id: 51, numero: 51, nombre: "Faviola", email: "faviola51@mail.com", password: "123456", roleId: 5, personaId: 52 },
    { id: 52, numero: 52, nombre: "Javier", email: "javier52@mail.com", password: "123456", roleId: 5, personaId: 53 },
];
export const docentes = [
    { id: 1, personaId: 2 },
    { id: 2, personaId: 3 },
    { id: 3, personaId: 4 },
    { id: 4, personaId: 5 },
    { id: 5, personaId: 6 },
    { id: 6, personaId: 7 },
    { id: 7, personaId: 8 },
    { id: 8, personaId: 9 },
    { id: 9, personaId: 10 }
];

export const padres = [

    { id: 1, personaId: 11 },
    { id: 2, personaId: 12 },
    { id: 3, personaId: 13 },
    { id: 4, personaId: 14 },
    { id: 5, personaId: 15 },
    { id: 6, personaId: 16 },
    { id: 7, personaId: 17 },
    { id: 8, personaId: 18 },
    { id: 9, personaId: 19 },
    { id: 10, personaId: 50 }
];

export const madres = [
    { id: 1, personaId: 20 },
    { id: 2, personaId: 21 },
    { id: 3, personaId: 22 },
    { id: 4, personaId: 23 },
    { id: 5, personaId: 24 },
    { id: 6, personaId: 25 },
    { id: 7, personaId: 26 },
    { id: 8, personaId: 27 },
    { id: 9, personaId: 28 },
    { id: 10, personaId: 29 },
    { id: 11, personaId: 50 }
];

export const auxiliares = [
    { id: 1, personaId: 51 },
    { id: 2, personaId: 52 },
    { id: 3, personaId: 53 },
];

export const alumnos = [
    { id: 1, personaId: 30, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 1, madreId: 1 },
    { id: 2, personaId: 31, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 2, madreId: 2 },
    { id: 3, personaId: 32, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 3, madreId: 3 },
    { id: 4, personaId: 33, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 4, madreId: 4 },
    { id: 5, personaId: 34, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 5, madreId: 5 },
    { id: 6, personaId: 35, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 6, madreId: 6 },
    { id: 7, personaId: 36, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 7, madreId: 7 },
    { id: 8, personaId: 37, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 8, madreId: 8 },
    { id: 9, personaId: 38, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 9, madreId: 9 },
    { id: 10, personaId: 39, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 1, madreId: 10 },

    { id: 11, personaId: 40, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 2, madreId: 1 },
    { id: 12, personaId: 41, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 3, madreId: 2 },
    { id: 13, personaId: 42, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 4, madreId: 3 },
    { id: 14, personaId: 43, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 5, madreId: 4 },
    { id: 15, personaId: 44, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 6, madreId: 5 },
    { id: 16, personaId: 45, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 7, madreId: 6 },
    { id: 17, personaId: 46, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 8, madreId: 7 },
    { id: 18, personaId: 47, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 9, madreId: 8 },
    { id: 19, personaId: 48, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 1, madreId: 9 },
    { id: 20, personaId: 49, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 2, madreId: 10 },
];

export const directores = [
    { id: 1, observacion: 'Director', personaId: 54 },
    { id: 2, observacion: 'Sub Directora del Nivel Primario', personaId: 55 },
    { id: 3, observacion: 'Sub Directora del Nivel Secundario', personaId: 56 },
    { id: 4, observacion: 'Sub Director del Nivel Secundario', personaId: 57 },
];

export const aulas = [
    { id: 1, nombre: 'AULA 1 SEC. SECCION A', nivelId: 2, gradoId: 1, seccionId: 1, tipovalor: 1 },
    { id: 2, nombre: 'AULA 2 SEC. SECCION A', nivelId: 2, gradoId: 2, seccionId: 1, tipovalor: 2 },
];
export const programaciones = [

    { id: 1, numeromat: 10, aulaId: 1, docenteId: 1, areaId: 1, periodoId: 1 },
    { id: 2, numeromat: 10, aulaId: 1, docenteId: 2, areaId: 2, periodoId: 1 },
    { id: 3, numeromat: 10, aulaId: 1, docenteId: 3, areaId: 3, periodoId: 1 },
    { id: 4, numeromat: 10, aulaId: 1, docenteId: 4, areaId: 4, periodoId: 1 },
    { id: 5, numeromat: 10, aulaId: 1, docenteId: 5, areaId: 5, periodoId: 1 },
    { id: 6, numeromat: 10, aulaId: 1, docenteId: 6, areaId: 6, periodoId: 1 },
    { id: 7, numeromat: 10, aulaId: 1, docenteId: 7, areaId: 7, periodoId: 1 },
    { id: 8, numeromat: 10, aulaId: 1, docenteId: 8, areaId: 8, periodoId: 1 },

    { id: 9, numeromat: 10, aulaId: 2, docenteId: 1, areaId: 1, periodoId: 1 },
    { id: 10, numeromat: 10, aulaId: 2, docenteId: 2, areaId: 2, periodoId: 1 },
    { id: 11, numeromat: 10, aulaId: 2, docenteId: 3, areaId: 3, periodoId: 1 },
    { id: 12, numeromat: 10, aulaId: 2, docenteId: 4, areaId: 4, periodoId: 1 },
    { id: 13, numeromat: 10, aulaId: 2, docenteId: 5, areaId: 5, periodoId: 1 },
    { id: 14, numeromat: 10, aulaId: 2, docenteId: 6, areaId: 6, periodoId: 1 },
    { id: 15, numeromat: 10, aulaId: 2, docenteId: 7, areaId: 7, periodoId: 1 },
    { id: 16, numeromat: 10, aulaId: 2, docenteId: 8, areaId: 8, periodoId: 1 },

];

export const matriculas = [
    { id: 1, alumnoId: 1 },
    { id: 2, alumnoId: 2 },
    { id: 3, alumnoId: 3 },
    { id: 4, alumnoId: 4 },
    { id: 5, alumnoId: 5 },
    { id: 6, alumnoId: 6 },
    { id: 7, alumnoId: 7 },
    { id: 8, alumnoId: 8 },
    { id: 9, alumnoId: 9 },
    { id: 10, alumnoId: 10 },
    { id: 11, alumnoId: 11 },
    { id: 12, alumnoId: 12 },
    { id: 13, alumnoId: 13 },
    { id: 14, alumnoId: 14 },
    { id: 15, alumnoId: 15 },
    { id: 16, alumnoId: 16 },
    { id: 17, alumnoId: 17 },
    { id: 18, alumnoId: 18 },
    { id: 19, alumnoId: 19 },
    { id: 20, alumnoId: 20 },
];


export const matriculadetalles = [

    /* PRIMERO SECUNDARIA  SECCION A*/
    { id: 1, matriculaId: 1, programacionId: 1 },
    { id: 2, matriculaId: 1, programacionId: 2 },
    { id: 3, matriculaId: 1, programacionId: 3 },
    { id: 4, matriculaId: 1, programacionId: 4 },
    { id: 5, matriculaId: 1, programacionId: 5 },
    { id: 6, matriculaId: 1, programacionId: 6 },
    { id: 7, matriculaId: 1, programacionId: 7 },
    { id: 8, matriculaId: 1, programacionId: 8 },

    { id: 9, matriculaId: 2, programacionId: 1 },
    { id: 10, matriculaId: 2, programacionId: 2 },
    { id: 11, matriculaId: 2, programacionId: 3 },
    { id: 12, matriculaId: 2, programacionId: 4 },
    { id: 13, matriculaId: 2, programacionId: 5 },
    { id: 14, matriculaId: 2, programacionId: 6 },
    { id: 15, matriculaId: 2, programacionId: 7 },
    { id: 16, matriculaId: 2, programacionId: 8 },

    { id: 17, matriculaId: 3, programacionId: 1 },
    { id: 18, matriculaId: 3, programacionId: 2 },
    { id: 19, matriculaId: 3, programacionId: 3 },
    { id: 20, matriculaId: 3, programacionId: 4 },
    { id: 21, matriculaId: 3, programacionId: 5 },
    { id: 22, matriculaId: 3, programacionId: 6 },
    { id: 23, matriculaId: 3, programacionId: 7 },
    { id: 24, matriculaId: 3, programacionId: 8 },

    { id: 25, matriculaId: 4, programacionId: 1 },
    { id: 26, matriculaId: 4, programacionId: 2 },
    { id: 27, matriculaId: 4, programacionId: 3 },
    { id: 28, matriculaId: 4, programacionId: 4 },
    { id: 29, matriculaId: 4, programacionId: 5 },
    { id: 30, matriculaId: 4, programacionId: 6 },
    { id: 31, matriculaId: 4, programacionId: 7 },
    { id: 32, matriculaId: 4, programacionId: 8 },

    { id: 33, matriculaId: 5, programacionId: 1 },
    { id: 34, matriculaId: 5, programacionId: 2 },
    { id: 35, matriculaId: 5, programacionId: 3 },
    { id: 36, matriculaId: 5, programacionId: 4 },
    { id: 37, matriculaId: 5, programacionId: 5 },
    { id: 38, matriculaId: 5, programacionId: 6 },
    { id: 39, matriculaId: 5, programacionId: 7 },
    { id: 40, matriculaId: 5, programacionId: 8 },

    { id: 41, matriculaId: 6, programacionId: 1 },
    { id: 42, matriculaId: 6, programacionId: 2 },
    { id: 43, matriculaId: 6, programacionId: 3 },
    { id: 44, matriculaId: 6, programacionId: 4 },
    { id: 45, matriculaId: 6, programacionId: 5 },
    { id: 46, matriculaId: 6, programacionId: 6 },
    { id: 47, matriculaId: 6, programacionId: 7 },
    { id: 48, matriculaId: 6, programacionId: 8 },

    { id: 49, matriculaId: 7, programacionId: 1 },
    { id: 50, matriculaId: 7, programacionId: 2 },
    { id: 51, matriculaId: 7, programacionId: 3 },
    { id: 52, matriculaId: 7, programacionId: 4 },
    { id: 53, matriculaId: 7, programacionId: 5 },
    { id: 54, matriculaId: 7, programacionId: 6 },
    { id: 55, matriculaId: 7, programacionId: 7 },
    { id: 56, matriculaId: 7, programacionId: 8 },

    { id: 57, matriculaId: 8, programacionId: 1 },
    { id: 58, matriculaId: 8, programacionId: 2 },
    { id: 59, matriculaId: 8, programacionId: 3 },
    { id: 60, matriculaId: 8, programacionId: 4 },
    { id: 61, matriculaId: 8, programacionId: 5 },
    { id: 62, matriculaId: 8, programacionId: 6 },
    { id: 63, matriculaId: 8, programacionId: 7 },
    { id: 64, matriculaId: 8, programacionId: 8 },

    { id: 65, matriculaId: 9, programacionId: 1 },
    { id: 66, matriculaId: 9, programacionId: 2 },
    { id: 67, matriculaId: 9, programacionId: 3 },
    { id: 68, matriculaId: 9, programacionId: 4 },
    { id: 69, matriculaId: 9, programacionId: 5 },
    { id: 70, matriculaId: 9, programacionId: 6 },
    { id: 71, matriculaId: 9, programacionId: 7 },
    { id: 72, matriculaId: 9, programacionId: 8 },

    { id: 73, matriculaId: 10, programacionId: 1 },
    { id: 74, matriculaId: 10, programacionId: 2 },
    { id: 75, matriculaId: 10, programacionId: 3 },
    { id: 76, matriculaId: 10, programacionId: 4 },
    { id: 77, matriculaId: 10, programacionId: 5 },
    { id: 78, matriculaId: 10, programacionId: 6 },
    { id: 79, matriculaId: 10, programacionId: 7 },
    { id: 80, matriculaId: 10, programacionId: 8 },


    /* SEGUNDO SECUNDARIA  SECCION A*/

    { id: 81, matriculaId: 11, programacionId: 9 },
    { id: 82, matriculaId: 11, programacionId: 10 },
    { id: 83, matriculaId: 11, programacionId: 11 },
    { id: 84, matriculaId: 11, programacionId: 12 },
    { id: 85, matriculaId: 11, programacionId: 13 },
    { id: 86, matriculaId: 11, programacionId: 14 },
    { id: 87, matriculaId: 11, programacionId: 15 },
    { id: 88, matriculaId: 11, programacionId: 16 },

    { id: 89, matriculaId: 12, programacionId: 9 },
    { id: 90, matriculaId: 12, programacionId: 10 },
    { id: 91, matriculaId: 12, programacionId: 11 },
    { id: 92, matriculaId: 12, programacionId: 12 },
    { id: 93, matriculaId: 12, programacionId: 13 },
    { id: 94, matriculaId: 12, programacionId: 14 },
    { id: 95, matriculaId: 12, programacionId: 15 },
    { id: 96, matriculaId: 12, programacionId: 16 },

    { id: 97, matriculaId: 13, programacionId: 9 },
    { id: 98, matriculaId: 13, programacionId: 10 },
    { id: 99, matriculaId: 13, programacionId: 11 },
    { id: 100, matriculaId: 13, programacionId: 12 },
    { id: 101, matriculaId: 13, programacionId: 13 },
    { id: 102, matriculaId: 13, programacionId: 14 },
    { id: 103, matriculaId: 13, programacionId: 15 },
    { id: 104, matriculaId: 13, programacionId: 16 },

    { id: 105, matriculaId: 14, programacionId: 9 },
    { id: 106, matriculaId: 14, programacionId: 10 },
    { id: 107, matriculaId: 14, programacionId: 11 },
    { id: 108, matriculaId: 14, programacionId: 12 },
    { id: 109, matriculaId: 14, programacionId: 13 },
    { id: 110, matriculaId: 14, programacionId: 14 },
    { id: 111, matriculaId: 14, programacionId: 15 },
    { id: 112, matriculaId: 14, programacionId: 16 },

    { id: 113, matriculaId: 15, programacionId: 9 },
    { id: 114, matriculaId: 15, programacionId: 10 },
    { id: 115, matriculaId: 15, programacionId: 11 },
    { id: 116, matriculaId: 15, programacionId: 12 },
    { id: 117, matriculaId: 15, programacionId: 13 },
    { id: 118, matriculaId: 15, programacionId: 14 },
    { id: 119, matriculaId: 15, programacionId: 15 },
    { id: 120, matriculaId: 15, programacionId: 16 },

    { id: 121, matriculaId: 16, programacionId: 9 },
    { id: 122, matriculaId: 16, programacionId: 10 },
    { id: 123, matriculaId: 16, programacionId: 11 },
    { id: 124, matriculaId: 16, programacionId: 12 },
    { id: 125, matriculaId: 16, programacionId: 13 },
    { id: 126, matriculaId: 16, programacionId: 14 },
    { id: 127, matriculaId: 16, programacionId: 15 },
    { id: 128, matriculaId: 16, programacionId: 16 },

    { id: 129, matriculaId: 17, programacionId: 9 },
    { id: 130, matriculaId: 17, programacionId: 10 },
    { id: 131, matriculaId: 17, programacionId: 11 },
    { id: 132, matriculaId: 17, programacionId: 12 },
    { id: 133, matriculaId: 17, programacionId: 13 },
    { id: 134, matriculaId: 17, programacionId: 14 },
    { id: 135, matriculaId: 17, programacionId: 15 },
    { id: 136, matriculaId: 17, programacionId: 16 },

    { id: 137, matriculaId: 18, programacionId: 9 },
    { id: 138, matriculaId: 18, programacionId: 10 },
    { id: 139, matriculaId: 18, programacionId: 11 },
    { id: 140, matriculaId: 18, programacionId: 12 },
    { id: 141, matriculaId: 18, programacionId: 13 },
    { id: 142, matriculaId: 18, programacionId: 14 },
    { id: 143, matriculaId: 18, programacionId: 15 },
    { id: 144, matriculaId: 18, programacionId: 16 },

    { id: 145, matriculaId: 19, programacionId: 9 },
    { id: 146, matriculaId: 19, programacionId: 10 },
    { id: 147, matriculaId: 19, programacionId: 11 },
    { id: 148, matriculaId: 19, programacionId: 12 },
    { id: 149, matriculaId: 19, programacionId: 13 },
    { id: 150, matriculaId: 19, programacionId: 14 },
    { id: 151, matriculaId: 19, programacionId: 15 },
    { id: 152, matriculaId: 19, programacionId: 16 },

    { id: 153, matriculaId: 20, programacionId: 9 },
    { id: 154, matriculaId: 20, programacionId: 10 },
    { id: 155, matriculaId: 20, programacionId: 11 },
    { id: 156, matriculaId: 20, programacionId: 12 },
    { id: 157, matriculaId: 20, programacionId: 13 },
    { id: 158, matriculaId: 20, programacionId: 14 },
    { id: 159, matriculaId: 20, programacionId: 15 },
    { id: 160, matriculaId: 20, programacionId: 16 },

];

export const materiales = [

    { id: 1, titulo: "Lorem ipsum dolor sit amet consectetur adipisicing elit", descripcion: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt quo itaque voluptatem nam, repellendus,assumenda consectetur unde distinctio vitae fugit id neque accusamus labore maiores quaerat laudantium inventore eligendi! ", programacionId: 1, fecha: moment().format('YYYY-MM-DD'), archivo: "https://res.cloudinary.com/archivos/image/upload/v1643918075/material/qnamfhnsgkkbs9rqearb.pdf" },
    { id: 2, titulo: "Lorem ipsum dolor sit amet consectetur adipisicing elit", descripcion: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt quo itaque voluptatem nam, repellendus,assumenda consectetur unde distinctio vitae fugit id neque accusamus labore maiores quaerat laudantium inventore eligendi! ", programacionId: 2, fecha: moment().format('YYYY-MM-DD'), archivo: "https://res.cloudinary.com/archivos/image/upload/v1643918075/material/qnamfhnsgkkbs9rqearb.pdf" },
    { id: 3, titulo: "Lorem ipsum dolor sit amet consectetur adipisicing elit", descripcion: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt quo itaque voluptatem nam, repellendus,assumenda consectetur unde distinctio vitae fugit id neque accusamus labore maiores quaerat laudantium inventore eligendi! ", programacionId: 3, fecha: moment().format('YYYY-MM-DD'), archivo: "https://res.cloudinary.com/archivos/image/upload/v1643918075/material/qnamfhnsgkkbs9rqearb.pdf" },
    { id: 4, titulo: "Lorem ipsum dolor sit amet consectetur adipisicing elit", descripcion: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt quo itaque voluptatem nam, repellendus,assumenda consectetur unde distinctio vitae fugit id neque accusamus labore maiores quaerat laudantium inventore eligendi! ", programacionId: 4, fecha: moment().format('YYYY-MM-DD'), archivo: "https://res.cloudinary.com/archivos/image/upload/v1643918075/material/qnamfhnsgkkbs9rqearb.pdf" },
    { id: 5, titulo: "Lorem ipsum dolor sit amet consectetur adipisicing elit", descripcion: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt quo itaque voluptatem nam, repellendus,assumenda consectetur unde distinctio vitae fugit id neque accusamus labore maiores quaerat laudantium inventore eligendi! ", programacionId: 5, fecha: moment().format('YYYY-MM-DD'), archivo: "https://res.cloudinary.com/archivos/image/upload/v1643918075/material/qnamfhnsgkkbs9rqearb.pdf" },
    { id: 6, titulo: "Lorem ipsum dolor sit amet consectetur adipisicing elit", descripcion: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt quo itaque voluptatem nam, repellendus,assumenda consectetur unde distinctio vitae fugit id neque accusamus labore maiores quaerat laudantium inventore eligendi! ", programacionId: 6, fecha: moment().format('YYYY-MM-DD'), archivo: "https://res.cloudinary.com/archivos/image/upload/v1643918075/material/qnamfhnsgkkbs9rqearb.pdf" },
    { id: 7, titulo: "Lorem ipsum dolor sit amet consectetur adipisicing elit", descripcion: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt quo itaque voluptatem nam, repellendus,assumenda consectetur unde distinctio vitae fugit id neque accusamus labore maiores quaerat laudantium inventore eligendi! ", programacionId: 7, fecha: moment().format('YYYY-MM-DD'), archivo: "https://res.cloudinary.com/archivos/image/upload/v1643918075/material/qnamfhnsgkkbs9rqearb.pdf" },
    { id: 8, titulo: "Lorem ipsum dolor sit amet consectetur adipisicing elit", descripcion: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt quo itaque voluptatem nam, repellendus,assumenda consectetur unde distinctio vitae fugit id neque accusamus labore maiores quaerat laudantium inventore eligendi! ", programacionId: 8, fecha: moment().format('YYYY-MM-DD'), archivo: "https://res.cloudinary.com/archivos/image/upload/v1643918075/material/qnamfhnsgkkbs9rqearb.pdf" },

    { id: 9, titulo: "Lorem ipsum dolor sit amet consectetur adipisicing elit", descripcion: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt quo itaque voluptatem nam, repellendus,assumenda consectetur unde distinctio vitae fugit id neque accusamus labore maiores quaerat laudantium inventore eligendi! ", programacionId: 9, fecha: moment().format('YYYY-MM-DD'), archivo: "https://res.cloudinary.com/archivos/image/upload/v1643918075/material/qnamfhnsgkkbs9rqearb.pdf" },
    { id: 10, titulo: "Lorem ipsum dolor sit amet consectetur adipisicing elit", descripcion: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt quo itaque voluptatem nam, repellendus,assumenda consectetur unde distinctio vitae fugit id neque accusamus labore maiores quaerat laudantium inventore eligendi! ", programacionId: 10, fecha: moment().format('YYYY-MM-DD'), archivo: "https://res.cloudinary.com/archivos/image/upload/v1643918075/material/qnamfhnsgkkbs9rqearb.pdf" },
    { id: 11, titulo: "Lorem ipsum dolor sit amet consectetur adipisicing elit", descripcion: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt quo itaque voluptatem nam, repellendus,assumenda consectetur unde distinctio vitae fugit id neque accusamus labore maiores quaerat laudantium inventore eligendi! ", programacionId: 11, fecha: moment().format('YYYY-MM-DD'), archivo: "https://res.cloudinary.com/archivos/image/upload/v1643918075/material/qnamfhnsgkkbs9rqearb.pdf" },
    { id: 12, titulo: "Lorem ipsum dolor sit amet consectetur adipisicing elit", descripcion: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt quo itaque voluptatem nam, repellendus,assumenda consectetur unde distinctio vitae fugit id neque accusamus labore maiores quaerat laudantium inventore eligendi! ", programacionId: 12, fecha: moment().format('YYYY-MM-DD'), archivo: "https://res.cloudinary.com/archivos/image/upload/v1643918075/material/qnamfhnsgkkbs9rqearb.pdf" },
    { id: 13, titulo: "Lorem ipsum dolor sit amet consectetur adipisicing elit", descripcion: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt quo itaque voluptatem nam, repellendus,assumenda consectetur unde distinctio vitae fugit id neque accusamus labore maiores quaerat laudantium inventore eligendi! ", programacionId: 13, fecha: moment().format('YYYY-MM-DD'), archivo: "https://res.cloudinary.com/archivos/image/upload/v1643918075/material/qnamfhnsgkkbs9rqearb.pdf" },
    { id: 14, titulo: "Lorem ipsum dolor sit amet consectetur adipisicing elit", descripcion: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt quo itaque voluptatem nam, repellendus,assumenda consectetur unde distinctio vitae fugit id neque accusamus labore maiores quaerat laudantium inventore eligendi! ", programacionId: 14, fecha: moment().format('YYYY-MM-DD'), archivo: "https://res.cloudinary.com/archivos/image/upload/v1643918075/material/qnamfhnsgkkbs9rqearb.pdf" },
    { id: 15, titulo: "Lorem ipsum dolor sit amet consectetur adipisicing elit", descripcion: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt quo itaque voluptatem nam, repellendus,assumenda consectetur unde distinctio vitae fugit id neque accusamus labore maiores quaerat laudantium inventore eligendi! ", programacionId: 15, fecha: moment().format('YYYY-MM-DD'), archivo: "https://res.cloudinary.com/archivos/image/upload/v1643918075/material/qnamfhnsgkkbs9rqearb.pdf" },
    { id: 16, titulo: "Lorem ipsum dolor sit amet consectetur adipisicing elit", descripcion: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt quo itaque voluptatem nam, repellendus,assumenda consectetur unde distinctio vitae fugit id neque accusamus labore maiores quaerat laudantium inventore eligendi! ", programacionId: 16, fecha: moment().format('YYYY-MM-DD'), archivo: "https://res.cloudinary.com/archivos/image/upload/v1643918075/material/qnamfhnsgkkbs9rqearb.pdf" },

    { id: 17, titulo: "Lorem ipsum dolor sit amet consectetur adipisicing elit", descripcion: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt quo itaque voluptatem nam, repellendus,assumenda consectetur unde distinctio vitae fugit id neque accusamus labore maiores quaerat laudantium inventore eligendi! ", programacionId: 1, fecha: moment().format('YYYY-MM-DD'), archivo: "https://res.cloudinary.com/archivos/image/upload/v1643918075/material/qnamfhnsgkkbs9rqearb.pdf" },
    { id: 18, titulo: "Lorem ipsum dolor sit amet consectetur adipisicing elit", descripcion: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt quo itaque voluptatem nam, repellendus,assumenda consectetur unde distinctio vitae fugit id neque accusamus labore maiores quaerat laudantium inventore eligendi! ", programacionId: 2, fecha: moment().format('YYYY-MM-DD'), archivo: "https://res.cloudinary.com/archivos/image/upload/v1643918075/material/qnamfhnsgkkbs9rqearb.pdf" },
    { id: 19, titulo: "Lorem ipsum dolor sit amet consectetur adipisicing elit", descripcion: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt quo itaque voluptatem nam, repellendus,assumenda consectetur unde distinctio vitae fugit id neque accusamus labore maiores quaerat laudantium inventore eligendi! ", programacionId: 3, fecha: moment().format('YYYY-MM-DD'), archivo: "https://res.cloudinary.com/archivos/image/upload/v1643918075/material/qnamfhnsgkkbs9rqearb.pdf" },
    { id: 20, titulo: "Lorem ipsum dolor sit amet consectetur adipisicing elit", descripcion: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt quo itaque voluptatem nam, repellendus,assumenda consectetur unde distinctio vitae fugit id neque accusamus labore maiores quaerat laudantium inventore eligendi! ", programacionId: 4, fecha: moment().format('YYYY-MM-DD'), archivo: "https://res.cloudinary.com/archivos/image/upload/v1643918075/material/qnamfhnsgkkbs9rqearb.pdf" },
    { id: 21, titulo: "Lorem ipsum dolor sit amet consectetur adipisicing elit", descripcion: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt quo itaque voluptatem nam, repellendus,assumenda consectetur unde distinctio vitae fugit id neque accusamus labore maiores quaerat laudantium inventore eligendi! ", programacionId: 5, fecha: moment().format('YYYY-MM-DD'), archivo: "https://res.cloudinary.com/archivos/image/upload/v1643918075/material/qnamfhnsgkkbs9rqearb.pdf" },
    { id: 22, titulo: "Lorem ipsum dolor sit amet consectetur adipisicing elit", descripcion: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt quo itaque voluptatem nam, repellendus,assumenda consectetur unde distinctio vitae fugit id neque accusamus labore maiores quaerat laudantium inventore eligendi! ", programacionId: 6, fecha: moment().format('YYYY-MM-DD'), archivo: "https://res.cloudinary.com/archivos/image/upload/v1643918075/material/qnamfhnsgkkbs9rqearb.pdf" },
    { id: 23, titulo: "Lorem ipsum dolor sit amet consectetur adipisicing elit", descripcion: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt quo itaque voluptatem nam, repellendus,assumenda consectetur unde distinctio vitae fugit id neque accusamus labore maiores quaerat laudantium inventore eligendi! ", programacionId: 7, fecha: moment().format('YYYY-MM-DD'), archivo: "https://res.cloudinary.com/archivos/image/upload/v1643918075/material/qnamfhnsgkkbs9rqearb.pdf" },
    { id: 24, titulo: "Lorem ipsum dolor sit amet consectetur adipisicing elit", descripcion: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt quo itaque voluptatem nam, repellendus,assumenda consectetur unde distinctio vitae fugit id neque accusamus labore maiores quaerat laudantium inventore eligendi! ", programacionId: 8, fecha: moment().format('YYYY-MM-DD'), archivo: "https://res.cloudinary.com/archivos/image/upload/v1643918075/material/qnamfhnsgkkbs9rqearb.pdf" },

    { id: 25, titulo: "Lorem ipsum dolor sit amet consectetur adipisicing elit", descripcion: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt quo itaque voluptatem nam, repellendus,assumenda consectetur unde distinctio vitae fugit id neque accusamus labore maiores quaerat laudantium inventore eligendi! ", programacionId: 9, fecha: moment().format('YYYY-MM-DD'), archivo: "https://res.cloudinary.com/archivos/image/upload/v1643918075/material/qnamfhnsgkkbs9rqearb.pdf" },
    { id: 26, titulo: "Lorem ipsum dolor sit amet consectetur adipisicing elit", descripcion: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt quo itaque voluptatem nam, repellendus,assumenda consectetur unde distinctio vitae fugit id neque accusamus labore maiores quaerat laudantium inventore eligendi! ", programacionId: 10, fecha: moment().format('YYYY-MM-DD'), archivo: "https://res.cloudinary.com/archivos/image/upload/v1643918075/material/qnamfhnsgkkbs9rqearb.pdf" },
    { id: 27, titulo: "Lorem ipsum dolor sit amet consectetur adipisicing elit", descripcion: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt quo itaque voluptatem nam, repellendus,assumenda consectetur unde distinctio vitae fugit id neque accusamus labore maiores quaerat laudantium inventore eligendi! ", programacionId: 11, fecha: moment().format('YYYY-MM-DD'), archivo: "https://res.cloudinary.com/archivos/image/upload/v1643918075/material/qnamfhnsgkkbs9rqearb.pdf" },
    { id: 28, titulo: "Lorem ipsum dolor sit amet consectetur adipisicing elit", descripcion: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt quo itaque voluptatem nam, repellendus,assumenda consectetur unde distinctio vitae fugit id neque accusamus labore maiores quaerat laudantium inventore eligendi! ", programacionId: 12, fecha: moment().format('YYYY-MM-DD'), archivo: "https://res.cloudinary.com/archivos/image/upload/v1643918075/material/qnamfhnsgkkbs9rqearb.pdf" },

];

export const mensajerias = [
    {
        id: 1,
        emisor: "jhonatan@mail.com",
        receptor: "dante5@mail.com",
        asunto: "Mensaje de Prueba",
        contenido: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum earum molestiae iste explicabo laboriosam adipisci quas debitis temporibus accusamus at, impedit eos ducimus cum. Dicta accusantium enim iure omnis optio!",
        fecha: moment().format('YYYY-MM-DD'),
        hora: moment().format('LTS')
    },
    {
        id: 2,
        emisor: "jhonatan@mail.com",
        receptor: "dante5@mail.com",
        asunto: "Mensaje de Prueba 2",
        contenido: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum earum molestiae iste explicabo laboriosam adipisci quas debitis temporibus accusamus at, impedit eos ducimus cum. Dicta accusantium enim iure omnis optio!",
        fecha: moment().format('YYYY-MM-DD'),
        hora: moment().format('LTS')
    },
    {
        id: 3,
        emisor: "dante5@mail.com",
        receptor: "jhonatan@mail.com",
        asunto: "Mensaje de Prueba 2",
        contenido: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum earum molestiae iste explicabo laboriosam adipisci quas debitis temporibus accusamus at, impedit eos ducimus cum. Dicta accusantium enim iure omnis optio!",
        fecha: moment().format('YYYY-MM-DD'),
        hora: moment().format('LTS')
    },
    {
        id: 4,
        emisor: "dante5@mail.com",
        receptor: "jhonatan@mail.com",
        asunto: "Mensaje de Prueba 2",
        contenido: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum earum molestiae iste explicabo laboriosam adipisci quas debitis temporibus accusamus at, impedit eos ducimus cum. Dicta accusantium enim iure omnis optio!",
        fecha: moment().format('YYYY-MM-DD'),
        hora: moment().format('LTS')
    }
];
