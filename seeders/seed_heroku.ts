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
    { id: 54, nombre: "APODERADO", bgcolor: "bg-dark" },
];
export const situaciones = [
    { id: 4, nombre: "FALTÓ", color: 'danger', abreviatura: "F" },
    { id: 14, nombre: "ASISTIÓ", color: 'success', abreviatura: "A" },
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
    { id: 4, nombre: 'SECUNDARIA' },
];
export const grados = [
    { id: 4, nombre: 'PRIMERO' },
    { id: 14, nombre: 'SEGUNDO' },
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
    { id: 4, dni: '46556963', sexo: 1,fechanacimiento: moment(new Date("1994/07/15")).format('YYYY-MM-DD'), nombres: 'DARWIN JHONATAN', apellidopaterno: 'FLORES', apellidomaterno: 'NUÑEZ', tipodocumentoId: 4 },

    /*  Docentes */
    { id: 14, dni: '44409214', sexo: 1,fechanacimiento: moment(new Date("1980/04/12")).format('YYYY-MM-DD'), nombres: 'FLAVIO', apellidopaterno: 'GARCIA', apellidomaterno: 'RIVERA', tipodocumentoId: 4 },
    { id: 24, dni: '46378155', sexo: 2,fechanacimiento: moment(new Date("1980/04/12")).format('YYYY-MM-DD'), nombres: 'MILAGROS ANALY', apellidopaterno: 'GOMEZ', apellidomaterno: 'ENCALADA', tipodocumentoId: 4 },
    { id: 34, dni: '40357419', sexo: 1,fechanacimiento: moment(new Date("1980/04/12")).format('YYYY-MM-DD'), nombres: 'JOSE JAVIER', apellidopaterno: 'YARLEQUE', apellidomaterno: 'VILCHEZ', tipodocumentoId: 4 },
    { id: 44, dni: '40213876', sexo: 1,fechanacimiento: moment(new Date("1980/04/12")).format('YYYY-MM-DD'), nombres: 'DANTE JOEL', apellidopaterno: 'CABREJOS', apellidomaterno: 'REYES', tipodocumentoId: 4 },
    { id: 54, dni: '47903092', sexo: 1,fechanacimiento: moment(new Date("1980/04/12")).format('YYYY-MM-DD'), nombres: 'JORGE LUIS', apellidopaterno: 'ACARO', apellidomaterno: 'GARCIA', tipodocumentoId: 4 },
    { id: 64, dni: '44554185', sexo: 1,fechanacimiento: moment(new Date("1980/04/12")).format('YYYY-MM-DD'), nombres: 'WILLIAM', apellidopaterno: 'CALLE', apellidomaterno: 'BENITES', tipodocumentoId: 4 },
    { id: 74, dni: '02807311', sexo: 1,fechanacimiento: moment(new Date("1980/04/12")).format('YYYY-MM-DD'), nombres: 'WILMER', apellidopaterno: 'CORREA', apellidomaterno: 'GARCIA', tipodocumentoId: 4 },
    { id: 84, dni: '72199165', sexo: 2,fechanacimiento: moment(new Date("1980/04/12")).format('YYYY-MM-DD'), nombres: 'ANA BELEN', apellidopaterno: 'INGA', apellidomaterno: 'SALDARRIAGA', tipodocumentoId: 4 },
    { id: 94, dni: '46274986', sexo: 1,fechanacimiento: moment(new Date("1980/04/12")).format('YYYY-MM-DD'), nombres: 'VICTOR', apellidopaterno: 'ANTO', apellidomaterno: 'MIMBELA', tipodocumentoId: 4 },

    /*  padres */
    { id: 104, dni: '42215224', sexo: 1,fechanacimiento: moment(new Date("1985/04/12")).format('YYYY-MM-DD'), nombres: 'JUAN ALBERTO', apellidopaterno: 'JUAREZ', apellidomaterno: 'CARAMANTIN', tipodocumentoId: 4 },
    { id: 114, dni: '33668077', sexo: 1,fechanacimiento: moment(new Date("1985/04/12")).format('YYYY-MM-DD'), nombres: 'JAIME RICARDO', apellidopaterno: 'PINTADO', apellidomaterno: 'CALLE', tipodocumentoId: 4 },
    { id: 124, dni: '42136288', sexo: 1,fechanacimiento: moment(new Date("1985/04/12")).format('YYYY-MM-DD'), nombres: 'JORGE', apellidopaterno: 'DIONISIO', apellidomaterno: 'CORDOVA', tipodocumentoId: 4 },
    { id: 134, dni: '40134863', sexo: 1,fechanacimiento: moment(new Date("1985/04/12")).format('YYYY-MM-DD'), nombres: 'LUIS MARTIN', apellidopaterno: 'ANASTACIO', apellidomaterno: 'CAMPOS', tipodocumentoId: 4 },
    { id: 144, dni: '41979708', sexo: 1,fechanacimiento: moment(new Date("1985/04/12")).format('YYYY-MM-DD'), nombres: 'JHOE FABIAN', apellidopaterno: 'CORDOVA', apellidomaterno: 'VILLEGAS', tipodocumentoId: 4 },
    { id: 154, dni: '28032999', sexo: 1,fechanacimiento: moment(new Date("1985/04/12")).format('YYYY-MM-DD'), nombres: 'OSCAR LUIS', apellidopaterno: 'SALDARRIAGA', apellidomaterno: 'MORAN', tipodocumentoId: 4 },
    { id: 164, dni: '80446280', sexo: 1,fechanacimiento: moment(new Date("1985/04/12")).format('YYYY-MM-DD'), nombres: 'MEDARDO', apellidopaterno: 'QUISPE', apellidomaterno: 'SAUCEDO', tipodocumentoId: 4 },
    { id: 174, dni: '25431443', sexo: 1,fechanacimiento: moment(new Date("1985/04/12")).format('YYYY-MM-DD'), nombres: 'MARTIN', apellidopaterno: 'CHUICA', apellidomaterno: 'ADRIANZEN', tipodocumentoId: 4 },
    { id: 184, dni: '33666766', sexo: 1,fechanacimiento: moment(new Date("1985/04/12")).format('YYYY-MM-DD'), nombres: 'VICTOR', apellidopaterno: 'ADRIANZEN', apellidomaterno: 'CHERRES', tipodocumentoId: 4 },

    /* madres */
    { id: 194, dni: '46538404', sexo: 2,fechanacimiento: moment(new Date("1985/04/12")).format('YYYY-MM-DD'), nombres: 'KAREN YENYFFER', apellidopaterno: 'PACHERRES', apellidomaterno: 'ODAR', tipodocumentoId: 4 },
    { id: 204, dni: '33300095', sexo: 2,fechanacimiento: moment(new Date("1985/04/12")).format('YYYY-MM-DD'), nombres: 'ZULEMA', apellidopaterno: 'PALACIOS', apellidomaterno: 'VELASQUEZ', tipodocumentoId: 4 },
    { id: 214, dni: '42337247', sexo: 2,fechanacimiento: moment(new Date("1985/04/12")).format('YYYY-MM-DD'), nombres: 'MILAGROS', apellidopaterno: 'CORDOVA', apellidomaterno: 'LOPEZ', tipodocumentoId: 4 },
    { id: 224, dni: '41940454', sexo: 2,fechanacimiento: moment(new Date("1985/04/12")).format('YYYY-MM-DD'), nombres: 'JESSICA MARIA', apellidopaterno: 'BERECHE', apellidomaterno: 'RIVAS', tipodocumentoId: 4 },
    { id: 234, dni: '41784702', sexo: 2,fechanacimiento: moment(new Date("1985/04/12")).format('YYYY-MM-DD'), nombres: 'LUCY', apellidopaterno: 'LESCANO', apellidomaterno: 'CAMPOS', tipodocumentoId: 4 },
    { id: 244, dni: '80678486', sexo: 2,fechanacimiento: moment(new Date("1985/04/12")).format('YYYY-MM-DD'), nombres: 'MARIA LUISA', apellidopaterno: 'MORALES', apellidomaterno: 'VAZQUES', tipodocumentoId: 4 },
    { id: 254, dni: '40611824', sexo: 2,fechanacimiento: moment(new Date("1985/04/12")).format('YYYY-MM-DD'), nombres: 'JULIANA', apellidopaterno: 'BAYONA', apellidomaterno: 'GARCIA', tipodocumentoId: 4 },
    { id: 264, dni: '42634953', sexo: 2,fechanacimiento: moment(new Date("1985/04/12")).format('YYYY-MM-DD'), nombres: 'FLOR', apellidopaterno: 'MAZA', apellidomaterno: 'RAMOS', tipodocumentoId: 4 },
    { id: 274, dni: '44247506', sexo: 2,fechanacimiento: moment(new Date("1985/04/12")).format('YYYY-MM-DD'), nombres: 'FIORELLA', apellidopaterno: 'AGUIRRE', apellidomaterno: 'VIERA', tipodocumentoId: 4 },
    { id: 284, dni: '43484605', sexo: 2,fechanacimiento: moment(new Date("1985/04/12")).format('YYYY-MM-DD'), nombres: 'KARINA', apellidopaterno: 'LOZADA', apellidomaterno: 'YARLEQUE', tipodocumentoId: 4 },

    /* Alumnos  1A*/
    { id: 294, dni: '67675770', sexo: 2,fechanacimiento: moment(new Date("2010/04/12")).format('YYYY-MM-DD'), nombres: 'ADRIANA FERNANDA', apellidopaterno: 'MORE', apellidomaterno: 'JUAREZ', tipodocumentoId: 4 },
    { id: 304, dni: '34776686', sexo: 1,fechanacimiento: moment(new Date("2010/04/12")).format('YYYY-MM-DD'), nombres: 'RICARDO GLEISSNER', apellidopaterno: 'PINTADO', apellidomaterno: 'ORDOÑEZ', tipodocumentoId: 4 },
    { id: 314, dni: '66796519', sexo: 1,fechanacimiento: moment(new Date("2010/04/12")).format('YYYY-MM-DD'), nombres: 'MARCO OSVALDO', apellidopaterno: 'TORRES', apellidomaterno: 'DIONISIO', tipodocumentoId: 4 },
    { id: 324, dni: '23522439', sexo: 1,fechanacimiento: moment(new Date("2010/04/12")).format('YYYY-MM-DD'), nombres: 'ANDERSON ASAEL', apellidopaterno: 'LOZADA', apellidomaterno: 'ANASTACIO', tipodocumentoId: 4 },
    { id: 334, dni: '94375916', sexo: 1,fechanacimiento: moment(new Date("2010/04/12")).format('YYYY-MM-DD'), nombres: 'KEVIN', apellidopaterno: 'PALACIOS', apellidomaterno: 'CORDOVA', tipodocumentoId: 4 },
    { id: 344, dni: '79069307', sexo: 1,fechanacimiento: moment(new Date("2010/04/12")).format('YYYY-MM-DD'), nombres: 'ALONSO', apellidopaterno: 'INGA', apellidomaterno: 'SALDARRIAGA', tipodocumentoId: 4 },
    { id: 354, dni: '56066411', sexo: 2,fechanacimiento: moment(new Date("2010/04/12")).format('YYYY-MM-DD'), nombres: 'MARIA FERNANDA', apellidopaterno: 'JIMENEZ', apellidomaterno: 'QUISPE', tipodocumentoId: 4 },
    { id: 364, dni: '93625136', sexo: 1,fechanacimiento: moment(new Date("2010/04/12")).format('YYYY-MM-DD'), nombres: 'JUNIOR MARTIN', apellidopaterno: 'CHUICA', apellidomaterno: 'MONTENEGRO', tipodocumentoId: 4 },
    { id: 374, dni: '95831424', sexo: 2,fechanacimiento: moment(new Date("2010/04/12")).format('YYYY-MM-DD'), nombres: 'ALEXANDRA', apellidopaterno: 'CORNEJO', apellidomaterno: 'ADRIANZEN', tipodocumentoId: 4 },
    { id: 384, dni: '18205639', sexo: 2,fechanacimiento: moment(new Date("2010/04/12")).format('YYYY-MM-DD'), nombres: 'DANNA', apellidopaterno: 'DURAN', apellidomaterno: 'PACHERRES', tipodocumentoId: 4 },

    /** Alumnos 2A  */
    { id: 394, dni: '96483020', sexo: 1,fechanacimiento: moment(new Date("2010/04/12")).format('YYYY-MM-DD'), nombres: 'ERICK', apellidopaterno: 'ALVARADO', apellidomaterno: 'BERMEO', tipodocumentoId: 4 },
    { id: 404, dni: '90216663', sexo: 1,fechanacimiento: moment(new Date("2010/04/12")).format('YYYY-MM-DD'), nombres: 'CARLOS ROLANDO', apellidopaterno: 'APONTE', apellidomaterno: 'BURNEO', tipodocumentoId: 4 },
    { id: 414, dni: '52389341', sexo: 1,fechanacimiento: moment(new Date("2010/04/12")).format('YYYY-MM-DD'), nombres: 'PIERO', apellidopaterno: 'CAMPOS', apellidomaterno: 'MORE', tipodocumentoId: 4 },
    { id: 424, dni: '45014214', sexo: 1,fechanacimiento: moment(new Date("2010/04/12")).format('YYYY-MM-DD'), nombres: 'ALEX FABIAN', apellidopaterno: 'CRUZ', apellidomaterno: 'CORDOVA', tipodocumentoId: 4 },
    { id: 434, dni: '75024117', sexo: 2,fechanacimiento: moment(new Date("2010/04/12")).format('YYYY-MM-DD'), nombres: 'LEYLA', apellidopaterno: 'GARCIA', apellidomaterno: 'SERNAQUE', tipodocumentoId: 4 },
    { id: 444, dni: '12892836', sexo: 1,fechanacimiento: moment(new Date("2010/04/12")).format('YYYY-MM-DD'), nombres: 'ENRIQUE NAPOLEAN', apellidopaterno: 'GUZMAN', apellidomaterno: 'GARCIA', tipodocumentoId: 4 },
    { id: 454, dni: '52730003', sexo: 1,fechanacimiento: moment(new Date("2010/04/12")).format('YYYY-MM-DD'), nombres: 'ERICK', apellidopaterno: 'JIMENEZ', apellidomaterno: 'GARCIA', tipodocumentoId: 4 },
    { id: 464, dni: '94442585', sexo: 2,fechanacimiento: moment(new Date("2010/04/12")).format('YYYY-MM-DD'), nombres: 'JIMENA', apellidopaterno: 'PALACIOS', apellidomaterno: 'BERECHE', tipodocumentoId: 4 },
    { id: 474, dni: '39099454', sexo: 1,fechanacimiento: moment(new Date("2010/04/12")).format('YYYY-MM-DD'), nombres: 'ALEXIS', apellidopaterno: 'ROJAS', apellidomaterno: 'PACHERREZ', tipodocumentoId: 4 },
    { id: 484, dni: '15775569', sexo: 2,fechanacimiento: moment(new Date("2010/04/12")).format('YYYY-MM-DD'), nombres: 'ALLISON JIMENA', apellidopaterno: 'VIDAL', apellidomaterno: 'SANCHEZ', tipodocumentoId: 4 },

    /* Alumnos 1 B*/
    { id: 494, dni: '61943078', sexo: 1, fechanacimiento: moment(new Date("2010/04/12")).format('YYYY-MM-DD'), nombres: 'JURGEN KLINSMAN', apellidopaterno: 'ATOCHE', apellidomaterno: 'TALLEDO', tipodocumentoId: 4 },
    { id: 504, dni: '61769085', sexo: 1, fechanacimiento: moment(new Date("2010/04/12")).format('YYYY-MM-DD'), nombres: 'CHRISTIAN LEONARDO', apellidopaterno: 'ALVARADO', apellidomaterno: 'AREVALO', tipodocumentoId: 4 },
    { id: 514, dni: '61988111', sexo: 1, fechanacimiento: moment(new Date("2010/04/12")).format('YYYY-MM-DD'), nombres: 'EDWIN JARITH', apellidopaterno: 'CACERES', apellidomaterno: 'RENTERIA', tipodocumentoId: 4 },
    { id: 524, dni: '61987674', sexo: 1, fechanacimiento: moment(new Date("2010/04/12")).format('YYYY-MM-DD'), nombres: 'DOUGLAS LEONEL', apellidopaterno: 'CARLIN', apellidomaterno: 'ORTIZ', tipodocumentoId: 4 },
    { id: 534, dni: '61372273', sexo: 2, fechanacimiento: moment(new Date("2010/04/12")).format('YYYY-MM-DD'), nombres: 'DAMARIS NYKOLL', apellidopaterno: 'CHIROQUE', apellidomaterno: 'ESPINOZA', tipodocumentoId: 4 },
    { id: 544, dni: '61436546', sexo: 1, fechanacimiento: moment(new Date("2010/04/12")).format('YYYY-MM-DD'), nombres: 'JUNIOR BRANDY', apellidopaterno: 'CRUZ', apellidomaterno: 'RUEDA', tipodocumentoId: 4 },
    { id: 554, dni: '76881046', sexo: 1, fechanacimiento: moment(new Date("2010/04/12")).format('YYYY-MM-DD'), nombres: 'YEREMI ALEXANDER', apellidopaterno: 'DAVILA', apellidomaterno: 'REYES', tipodocumentoId: 4 },
    { id: 564, dni: '73408800', sexo: 1, fechanacimiento: moment(new Date("2010/04/12")).format('YYYY-MM-DD'), nombres: 'RAFAEL EDUARDO', apellidopaterno: 'GALECIO', apellidomaterno: 'SALCEDO', tipodocumentoId: 4 },
    { id: 574, dni: '61987735', sexo: 1, fechanacimiento: moment(new Date("2010/04/12")).format('YYYY-MM-DD'), nombres: 'OSCAR STEPHANO', apellidopaterno: 'REYES', apellidomaterno: 'RIVERA', tipodocumentoId: 4 },
    { id: 584, dni: '61854510', sexo: 1, fechanacimiento: moment(new Date("2010/04/12")).format('YYYY-MM-DD'), nombres: 'ALBERT SNAYDER', apellidopaterno: 'ZAPATA', apellidomaterno: 'ESTRADA', tipodocumentoId: 4 },

    /* Alumnos 2 B*/
    { id: 594, dni: '61768339', sexo: 1, fechanacimiento: moment(new Date("2010/04/12")).format('YYYY-MM-DD'), nombres: 'JERICKSON JHAIR', apellidopaterno: 'ABAD', apellidomaterno: 'GARCIA', tipodocumentoId: 4 },
    { id: 604, dni: '61501424', sexo: 2, fechanacimiento: moment(new Date("2010/04/12")).format('YYYY-MM-DD'), nombres: 'YARUMY ALEXANDRA', apellidopaterno: 'ALAMA', apellidomaterno: 'TAVARA', tipodocumentoId: 4 },
    { id: 614, dni: '61500914', sexo: 1, fechanacimiento: moment(new Date("2010/04/12")).format('YYYY-MM-DD'), nombres: 'ERWUINS ALEXANDER', apellidopaterno: 'ALCERO', apellidomaterno: 'NORES', tipodocumentoId: 4 },
    { id: 624, dni: '61768272', sexo: 2, fechanacimiento: moment(new Date("2010/04/12")).format('YYYY-MM-DD'), nombres: 'BIANCA CAMILLA', apellidopaterno: 'BENITES', apellidomaterno: 'DIOSES', tipodocumentoId: 4 },
    { id: 634, dni: '61436218', sexo: 1, fechanacimiento: moment(new Date("2010/04/12")).format('YYYY-MM-DD'), nombres: 'WILLIAM JUNIOR', apellidopaterno: 'CARRASCO', apellidomaterno: 'CARHUAPOMA', tipodocumentoId: 4 },
    { id: 644, dni: '61500797', sexo: 2, fechanacimiento: moment(new Date("2010/04/12")).format('YYYY-MM-DD'), nombres: 'BRIANA ALMUDENA', apellidopaterno: 'CASTRO', apellidomaterno: 'SIANCAS', tipodocumentoId: 4 },
    { id: 654, dni: '62027706', sexo: 1, fechanacimiento: moment(new Date("2010/04/12")).format('YYYY-MM-DD'), nombres: 'MANUEL ENRIQUE', apellidopaterno: 'NAVARRETE', apellidomaterno: 'TABOADA', tipodocumentoId: 4 },
    { id: 664, dni: '62968255', sexo: 2, fechanacimiento: moment(new Date("2010/04/12")).format('YYYY-MM-DD'), nombres: 'BRENDY NATALY', apellidopaterno: 'SAAVEDRA', apellidomaterno: 'CHAVEZ', tipodocumentoId: 4 },
    { id: 674, dni: '61386848', sexo: 1, fechanacimiento: moment(new Date("2010/04/12")).format('YYYY-MM-DD'), nombres: 'JUAN MANUEL', apellidopaterno: 'UBILLUS', apellidomaterno: 'MADRID', tipodocumentoId: 4 },
    { id: 684, dni: '62027884', sexo: 1, fechanacimiento: moment(new Date("2010/04/12")).format('YYYY-MM-DD'), nombres: 'SERGIO ALFREDO', apellidopaterno: 'ZAPATA', apellidomaterno: 'MORENO', tipodocumentoId: 4 },

    /** auxiliares */
    { id: 694, dni: '81061664', sexo: 1,fechanacimiento: moment(new Date("1985/04/12")).format('YYYY-MM-DD'), nombres: 'FRANKLIN', apellidopaterno: 'APONTE', apellidomaterno: 'QUINTANA', tipodocumentoId: 4 },
    { id: 704, dni: '43195779', sexo: 2,fechanacimiento: moment(new Date("1985/04/12")).format('YYYY-MM-DD'), nombres: 'FAVIOLA', apellidopaterno: 'TEZEN', apellidomaterno: 'CHERO', tipodocumentoId: 4 },
    { id: 714, dni: '47503406', sexo: 1,fechanacimiento: moment(new Date("1985/04/12")).format('YYYY-MM-DD'), nombres: 'JAVIER ALONSO', apellidopaterno: 'JUAREZ', apellidomaterno: 'BERECHE', tipodocumentoId: 4 },

    /** directores */
    { id: 724, dni: '52639852', sexo: 1,fechanacimiento: moment(new Date("1965/04/12")).format('YYYY-MM-DD'), nombres: 'JOSE EDUARDO', apellidopaterno: 'AGURTO', apellidomaterno: 'NOLE', tipodocumentoId: 4 },
    { id: 734, dni: '54784168', sexo: 2,fechanacimiento: moment(new Date("1965/04/12")).format('YYYY-MM-DD'), nombres: 'MILAGROS DEL ROSARIO', apellidopaterno: 'SANDOVAL', apellidomaterno: 'VASQUEZ', tipodocumentoId: 4 },
    { id: 744, dni: '49632582', sexo: 2,fechanacimiento: moment(new Date("1965/04/12")).format('YYYY-MM-DD'), nombres: 'ANA CELINDA', apellidopaterno: 'ORTIZ', apellidomaterno: 'FALCON', tipodocumentoId: 4 },
    { id: 754, dni: '41528799', sexo: 1,fechanacimiento: moment(new Date("1965/04/12")).format('YYYY-MM-DD'), nombres: 'CESAR', apellidopaterno: 'AGUIRRE', apellidomaterno: 'NAVARRO', tipodocumentoId: 4 },

    { id: 764, dni: '00000000', sexo: 1, fechanacimiento: moment(new Date("1979/04/12")).format('YYYY-MM-DD'), nombres: 'DESCONOCIDO', apellidopaterno: 'DESCONOCIDO', apellidomaterno: 'DESCONOCIDO', tipodocumentoId: 4 },
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

    /**Auxiliares */
    { id: 294, numero: 30, nombre: "Franklin", email: "franklin50@mail.com", password: "123456", roleId: 44, personaId: 504 },
    { id: 304, numero: 31, nombre: "Faviola", email: "faviola51@mail.com", password: "123456", roleId: 44, personaId: 514 },
    { id: 314, numero: 32, nombre: "Javier", email: "javier52@mail.com", password: "123456", roleId: 44, personaId: 524 },
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
    { id: 94, personaId: 764 },
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
    { id: 104, personaId: 764 },
];

export const responsables = [
    { id: 4, personaId: 104 },
    { id: 14, personaId: 114 },
    { id: 24, personaId: 124 },
    { id: 34, personaId: 134 },
    { id: 44, personaId: 144 },
    { id: 54, personaId: 154 },
    { id: 64, personaId: 164 },
    { id: 74, personaId: 174 },
    { id: 84, personaId: 184 }
];

export const auxiliares = [
    { id: 4, personaId: 694 },
    { id: 14, personaId: 704 },
    { id: 24, personaId: 714 },
];

export const alumnos = [
    /**1A */
    { id: 4, personaId: 294, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 4, madreId: 4, responsableId: 4 },
    { id: 14, personaId: 304, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 14, madreId: 14, responsableId: 14 },
    { id: 24, personaId: 314, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 24, madreId: 24, responsableId: 24 },
    { id: 34, personaId: 324, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 34, madreId: 34, responsableId: 34 },
    { id: 44, personaId: 334, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 44, madreId: 44, responsableId: 44 },
    { id: 54, personaId: 344, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 54, madreId: 54, responsableId: 54 },
    { id: 64, personaId: 354, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 64, madreId: 64, responsableId: 64 },
    { id: 74, personaId: 364, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 74, madreId: 74, responsableId: 74 },
    { id: 84, personaId: 374, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 84, madreId: 84, responsableId: 84 },
    { id: 94, personaId: 384, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 4, madreId: 94, responsableId: 4 },
    /**2A */
    { id: 104, personaId: 394, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 14, madreId: 4, responsableId: 14 },
    { id: 114, personaId: 404, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 24, madreId: 14, responsableId: 24 },
    { id: 124, personaId: 414, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 34, madreId: 24, responsableId: 34 },
    { id: 134, personaId: 424, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 44, madreId: 34, responsableId: 44 },
    { id: 144, personaId: 434, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 54, madreId: 44, responsableId: 54 },
    { id: 154, personaId: 444, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 64, madreId: 54, responsableId: 64 },
    { id: 164, personaId: 454, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 74, madreId: 64, responsableId: 74 },
    { id: 174, personaId: 464, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 84, madreId: 74, responsableId: 84 },
    { id: 184, personaId: 474, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 4, madreId: 84, responsableId: 4 },
    { id: 194, personaId: 484, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 14, madreId: 94, responsableId: 14 },
    /**1B */
    { id: 204, personaId: 494, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 24, madreId: 4, responsableId: 24 },
    { id: 214, personaId: 504, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 34, madreId: 14, responsableId: 34 },
    { id: 224, personaId: 514, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 44, madreId: 24, responsableId: 44 },
    { id: 234, personaId: 524, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 54, madreId: 34, responsableId: 54 },
    { id: 244, personaId: 534, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 64, madreId: 44, responsableId: 64 },
    { id: 254, personaId: 544, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 74, madreId: 54, responsableId: 74 },
    { id: 264, personaId: 554, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 84, madreId: 64, responsableId: 84 },
    { id: 274, personaId: 564, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 4, madreId: 74, responsableId: 4 },
    { id: 284, personaId: 574, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 14, madreId: 84, responsableId: 14 },
    { id: 294, personaId: 584, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 24, madreId: 94, responsableId: 24 },
    /** 2B */
    { id: 304, personaId: 594, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 34, madreId: 4, responsableId: 34 },
    { id: 314, personaId: 604, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 44, madreId: 14, responsableId: 44 },
    { id: 324, personaId: 614, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 54, madreId: 24, responsableId: 54 },
    { id: 334, personaId: 624, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 64, madreId: 34, responsableId: 64 },
    { id: 344, personaId: 634, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 74, madreId: 44, responsableId: 74 },
    { id: 354, personaId: 644, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 84, madreId: 54, responsableId: 84 },
    { id: 364, personaId: 654, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 4, madreId: 64, responsableId: 4 },
    { id: 374, personaId: 664, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 14, madreId: 74, responsableId: 14 },
    { id: 384, personaId: 674, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 24, madreId: 84, responsableId: 24 },
    { id: 394, personaId: 684, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 34, madreId: 94, responsableId: 34 },
  
];

export const directores = [
    { id: 4, observacion: 'Director', personaId: 724 },
    { id: 14, observacion: 'Sub Directora del Nivel Primario', personaId: 734 },
    { id: 24, observacion: 'Sub Directora del Nivel Secundario', personaId: 744 },
    { id: 34, observacion: 'Sub Director del Nivel Secundario', personaId: 754 },
];

export const aulas = [
    { id: 4, nombre: 'AULA 1 SEC. SECCION A', nivelId: 4, gradoId: 4, seccionId: 4, tipovalor: 1 },
    { id: 14, nombre: 'AULA 2 SEC. SECCION A', nivelId: 4, gradoId: 14, seccionId: 4, tipovalor: 1 },
    { id: 24, nombre: 'AULA 1 SEC. SECCION B', nivelId: 4, gradoId: 4, seccionId: 14, tipovalor: 1 },
    { id: 34, nombre: 'AULA 2 SEC. SECCION B', nivelId: 4, gradoId: 14, seccionId: 14, tipovalor: 1 },
];

export const programaciones = [

    /**AULA 1A */
    { id: 4, numeromat: 10, aulaId: 4, docenteId: 4, areaId: 4, periodoId: 4 },
    { id: 14, numeromat: 10, aulaId: 4, docenteId: 14, areaId: 14, periodoId: 4 },
    { id: 24, numeromat: 10, aulaId: 4, docenteId: 24, areaId: 24, periodoId: 4 },
    { id: 34, numeromat: 10, aulaId: 4, docenteId: 34, areaId: 34, periodoId: 4 },
    { id: 44, numeromat: 10, aulaId: 4, docenteId: 44, areaId: 44, periodoId: 4 },
    { id: 54, numeromat: 10, aulaId: 4, docenteId: 54, areaId: 54, periodoId: 4 },
    { id: 64, numeromat: 10, aulaId: 4, docenteId: 64, areaId: 64, periodoId: 4 },
    { id: 74, numeromat: 10, aulaId: 4, docenteId: 74, areaId: 74, periodoId: 4 },
    /**AULA 2A */
    { id: 84, numeromat: 10, aulaId: 14, docenteId: 84, areaId: 4, periodoId: 4 },
    { id: 94, numeromat: 10, aulaId: 14, docenteId: 4, areaId: 14, periodoId: 4 },
    { id: 104, numeromat: 10, aulaId: 14, docenteId: 14, areaId: 24, periodoId: 4 },
    { id: 114, numeromat: 10, aulaId: 14, docenteId: 24, areaId: 34, periodoId: 4 },
    { id: 124, numeromat: 10, aulaId: 14, docenteId: 34, areaId: 44, periodoId: 4 },
    { id: 134, numeromat: 10, aulaId: 14, docenteId: 44, areaId: 54, periodoId: 4 },
    { id: 144, numeromat: 10, aulaId: 14, docenteId: 54, areaId: 64, periodoId: 4 },
    { id: 154, numeromat: 10, aulaId: 14, docenteId: 64, areaId: 74, periodoId: 4 },
    /**AULA 1B */
    { id: 164, numeromat: 10, aulaId: 24, docenteId: 74, areaId: 4, periodoId: 4 },
    { id: 174, numeromat: 10, aulaId: 24, docenteId: 84, areaId: 14, periodoId: 4 },
    { id: 184, numeromat: 10, aulaId: 24, docenteId: 4, areaId: 24, periodoId: 4 },
    { id: 194, numeromat: 10, aulaId: 24, docenteId: 14, areaId: 34, periodoId: 4 },
    { id: 204, numeromat: 10, aulaId: 24, docenteId: 24, areaId: 44, periodoId: 4 },
    { id: 214, numeromat: 10, aulaId: 24, docenteId: 34, areaId: 54, periodoId: 4 },
    { id: 224, numeromat: 10, aulaId: 24, docenteId: 44, areaId: 64, periodoId: 4 },
    { id: 234, numeromat: 10, aulaId: 24, docenteId: 54, areaId: 74, periodoId: 4 },
    /**AULA 2B */
    { id: 244, numeromat: 10, aulaId: 34, docenteId: 64, areaId: 4, periodoId: 4 },
    { id: 254, numeromat: 10, aulaId: 34, docenteId: 74, areaId: 14, periodoId: 4 },
    { id: 264, numeromat: 10, aulaId: 34, docenteId: 84, areaId: 24, periodoId: 4 },
    { id: 274, numeromat: 10, aulaId: 34, docenteId: 4, areaId: 34, periodoId: 4 },
    { id: 284, numeromat: 10, aulaId: 34, docenteId: 14, areaId: 44, periodoId: 4 },
    { id: 294, numeromat: 10, aulaId: 34, docenteId: 24, areaId: 54, periodoId: 4 },
    { id: 304, numeromat: 10, aulaId: 34, docenteId: 34, areaId: 64, periodoId: 4 },
    { id: 314, numeromat: 10, aulaId: 34, docenteId: 44, areaId: 74, periodoId: 4 },
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

    { id: 204, alumnoId: 204 },
    { id: 214, alumnoId: 214 },
    { id: 224, alumnoId: 224 },
    { id: 234, alumnoId: 234 },
    { id: 244, alumnoId: 244 },
    { id: 254, alumnoId: 254 },
    { id: 264, alumnoId: 264 },
    { id: 274, alumnoId: 274 },
    { id: 284, alumnoId: 284 },
    { id: 294, alumnoId: 294 },

    { id: 304, alumnoId: 304 },
    { id: 314, alumnoId: 314 },
    { id: 324, alumnoId: 324 },
    { id: 334, alumnoId: 334 },
    { id: 344, alumnoId: 344 },
    { id: 354, alumnoId: 354 },
    { id: 364, alumnoId: 364 },
    { id: 374, alumnoId: 374 },
    { id: 384, alumnoId: 384 },
    { id: 394, alumnoId: 394 },

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

    { id: 84, matriculaId: 14, programacionId: 4 },
    { id: 94, matriculaId: 14, programacionId: 14 },
    { id: 104, matriculaId: 14, programacionId: 24 },
    { id: 114, matriculaId: 14, programacionId: 34 },
    { id: 124, matriculaId: 14, programacionId: 44 },
    { id: 134, matriculaId: 14, programacionId: 54 },
    { id: 144, matriculaId: 14, programacionId: 64 },
    { id: 154, matriculaId: 14, programacionId: 74 },

    { id: 164, matriculaId: 24, programacionId: 4 },
    { id: 174, matriculaId: 24, programacionId: 14 },
    { id: 184, matriculaId: 24, programacionId: 24 },
    { id: 194, matriculaId: 24, programacionId: 34 },
    { id: 204, matriculaId: 24, programacionId: 44 },
    { id: 214, matriculaId: 24, programacionId: 54 },
    { id: 224, matriculaId: 24, programacionId: 64 },
    { id: 234, matriculaId: 24, programacionId: 74 },

    { id: 244, matriculaId: 34, programacionId: 4 },
    { id: 254, matriculaId: 34, programacionId: 14 },
    { id: 264, matriculaId: 34, programacionId: 24 },
    { id: 274, matriculaId: 34, programacionId: 34 },
    { id: 284, matriculaId: 34, programacionId: 44 },
    { id: 294, matriculaId: 34, programacionId: 54 },
    { id: 304, matriculaId: 34, programacionId: 64 },
    { id: 314, matriculaId: 34, programacionId: 74 },

    { id: 324, matriculaId: 44, programacionId: 4 },
    { id: 334, matriculaId: 44, programacionId: 14 },
    { id: 344, matriculaId: 44, programacionId: 24 },
    { id: 354, matriculaId: 44, programacionId: 34 },
    { id: 364, matriculaId: 44, programacionId: 44 },
    { id: 374, matriculaId: 44, programacionId: 54 },
    { id: 384, matriculaId: 44, programacionId: 64 },
    { id: 394, matriculaId: 44, programacionId: 74 },

    { id: 404, matriculaId: 54, programacionId: 4 },
    { id: 414, matriculaId: 54, programacionId: 14 },
    { id: 424, matriculaId: 54, programacionId: 24 },
    { id: 434, matriculaId: 54, programacionId: 34 },
    { id: 444, matriculaId: 54, programacionId: 44 },
    { id: 454, matriculaId: 54, programacionId: 54 },
    { id: 464, matriculaId: 54, programacionId: 64 },
    { id: 474, matriculaId: 54, programacionId: 74 },

    { id: 484, matriculaId: 64, programacionId: 4 },
    { id: 494, matriculaId: 64, programacionId: 14 },
    { id: 504, matriculaId: 64, programacionId: 24 },
    { id: 514, matriculaId: 64, programacionId: 34 },
    { id: 524, matriculaId: 64, programacionId: 44 },
    { id: 534, matriculaId: 64, programacionId: 54 },
    { id: 544, matriculaId: 64, programacionId: 64 },
    { id: 554, matriculaId: 64, programacionId: 74 },

    { id: 564, matriculaId: 74, programacionId: 4 },
    { id: 574, matriculaId: 74, programacionId: 14 },
    { id: 584, matriculaId: 74, programacionId: 24 },
    { id: 594, matriculaId: 74, programacionId: 34 },
    { id: 604, matriculaId: 74, programacionId: 44 },
    { id: 614, matriculaId: 74, programacionId: 54 },
    { id: 624, matriculaId: 74, programacionId: 64 },
    { id: 634, matriculaId: 74, programacionId: 74 },

    { id: 644, matriculaId: 84, programacionId: 4 },
    { id: 654, matriculaId: 84, programacionId: 14 },
    { id: 664, matriculaId: 84, programacionId: 24 },
    { id: 674, matriculaId: 84, programacionId: 34 },
    { id: 684, matriculaId: 84, programacionId: 44 },
    { id: 694, matriculaId: 84, programacionId: 54 },
    { id: 704, matriculaId: 84, programacionId: 64 },
    { id: 714, matriculaId: 84, programacionId: 74 },

    { id: 724, matriculaId: 94, programacionId: 4 },
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
    { id: 894, matriculaId: 114, programacionId: 94 },
    { id: 904, matriculaId: 114, programacionId: 104 },
    { id: 914, matriculaId: 114, programacionId: 114 },
    { id: 924, matriculaId: 114, programacionId: 124 },
    { id: 934, matriculaId: 114, programacionId: 134 },
    { id: 944, matriculaId: 114, programacionId: 144 },
    { id: 954, matriculaId: 114, programacionId: 154 },

    { id: 964, matriculaId: 124, programacionId: 84 },
    { id: 974, matriculaId: 124, programacionId: 94 },
    { id: 984, matriculaId: 124, programacionId: 104 },
    { id: 994, matriculaId: 124, programacionId: 114 },
    { id: 1004, matriculaId: 124, programacionId: 124 },
    { id: 1014, matriculaId: 124, programacionId: 134 },
    { id: 1024, matriculaId: 124, programacionId: 144 },
    { id: 1034, matriculaId: 124, programacionId: 154 },

    { id: 1044, matriculaId: 134, programacionId: 84 },
    { id: 1054, matriculaId: 134, programacionId: 94 },
    { id: 1064, matriculaId: 134, programacionId: 104 },
    { id: 1074, matriculaId: 134, programacionId: 114 },
    { id: 1084, matriculaId: 134, programacionId: 124 },
    { id: 1094, matriculaId: 134, programacionId: 134 },
    { id: 1104, matriculaId: 134, programacionId: 144 },
    { id: 1114, matriculaId: 134, programacionId: 154 },

    { id: 1124, matriculaId: 144, programacionId: 84 },
    { id: 1134, matriculaId: 144, programacionId: 94 },
    { id: 1144, matriculaId: 144, programacionId: 104 },
    { id: 1154, matriculaId: 144, programacionId: 114 },
    { id: 1164, matriculaId: 144, programacionId: 124 },
    { id: 1174, matriculaId: 144, programacionId: 134 },
    { id: 1184, matriculaId: 144, programacionId: 144 },
    { id: 1194, matriculaId: 144, programacionId: 154 },

    { id: 1204, matriculaId: 154, programacionId: 84 },
    { id: 1214, matriculaId: 154, programacionId: 94 },
    { id: 1224, matriculaId: 154, programacionId: 104 },
    { id: 1234, matriculaId: 154, programacionId: 114 },
    { id: 1244, matriculaId: 154, programacionId: 124 },
    { id: 1254, matriculaId: 154, programacionId: 134 },
    { id: 1264, matriculaId: 154, programacionId: 144 },
    { id: 1274, matriculaId: 154, programacionId: 154 },

    { id: 1284, matriculaId: 164, programacionId: 84 },
    { id: 1294, matriculaId: 164, programacionId: 94 },
    { id: 1304, matriculaId: 164, programacionId: 104 },
    { id: 1314, matriculaId: 164, programacionId: 114 },
    { id: 1324, matriculaId: 164, programacionId: 124 },
    { id: 1334, matriculaId: 164, programacionId: 134 },
    { id: 1344, matriculaId: 164, programacionId: 144 },
    { id: 1354, matriculaId: 164, programacionId: 154 },

    { id: 1364, matriculaId: 174, programacionId: 84 },
    { id: 1374, matriculaId: 174, programacionId: 94 },
    { id: 1384, matriculaId: 174, programacionId: 104 },
    { id: 1394, matriculaId: 174, programacionId: 114 },
    { id: 1404, matriculaId: 174, programacionId: 124 },
    { id: 1414, matriculaId: 174, programacionId: 134 },
    { id: 1424, matriculaId: 174, programacionId: 144 },
    { id: 1434, matriculaId: 174, programacionId: 154 },

    { id: 1444, matriculaId: 184, programacionId: 84 },
    { id: 1454, matriculaId: 184, programacionId: 94 },
    { id: 1464, matriculaId: 184, programacionId: 104 },
    { id: 1474, matriculaId: 184, programacionId: 114 },
    { id: 1484, matriculaId: 184, programacionId: 124 },
    { id: 1494, matriculaId: 184, programacionId: 134 },
    { id: 1504, matriculaId: 184, programacionId: 144 },
    { id: 1514, matriculaId: 184, programacionId: 154 },

    { id: 1524, matriculaId: 194, programacionId: 84 },
    { id: 1534, matriculaId: 194, programacionId: 94 },
    { id: 1544, matriculaId: 194, programacionId: 104 },
    { id: 1554, matriculaId: 194, programacionId: 114 },
    { id: 1564, matriculaId: 194, programacionId: 124 },
    { id: 1574, matriculaId: 194, programacionId: 134 },
    { id: 1584, matriculaId: 194, programacionId: 144 },
    { id: 1594, matriculaId: 194, programacionId: 154 },

    /* PRIMERO SECUNDARIA  SECCION B*/

    { id: 1604, matriculaId: 204, programacionId: 164 },
    { id: 1614, matriculaId: 204, programacionId: 174 },
    { id: 1624, matriculaId: 204, programacionId: 184 },
    { id: 1634, matriculaId: 204, programacionId: 194},
    { id: 1644, matriculaId: 204, programacionId: 204 },
    { id: 1654, matriculaId: 204, programacionId: 214 },
    { id: 1664, matriculaId: 204, programacionId: 224 },
    { id: 1674, matriculaId: 204, programacionId: 234 },

    { id: 1684, matriculaId: 214, programacionId: 164 },
    { id: 1694, matriculaId: 214, programacionId: 174 },
    { id: 1704, matriculaId: 214, programacionId: 184 },
    { id: 1714, matriculaId: 214, programacionId: 194 },
    { id: 1724, matriculaId: 214, programacionId: 204 },
    { id: 1734, matriculaId: 214, programacionId: 214 },
    { id: 1744, matriculaId: 214, programacionId: 224 },
    { id: 1754, matriculaId: 214, programacionId: 234 },

    { id: 1764, matriculaId: 224, programacionId: 164 },
    { id: 1774, matriculaId: 224, programacionId: 174 },
    { id: 1784, matriculaId: 224, programacionId: 184 },
    { id: 1794, matriculaId: 224, programacionId: 194 },
    { id: 1804, matriculaId: 224, programacionId: 204 },
    { id: 1814, matriculaId: 224, programacionId: 214 },
    { id: 1824, matriculaId: 224, programacionId: 224 },
    { id: 1834, matriculaId: 224, programacionId: 234 },

    { id: 1844, matriculaId: 234, programacionId: 164 },
    { id: 1854, matriculaId: 234, programacionId: 174 },
    { id: 1864, matriculaId: 234, programacionId: 184 },
    { id: 1874, matriculaId: 234, programacionId: 194 },
    { id: 1894, matriculaId: 234, programacionId: 204 },
    { id: 1904, matriculaId: 234, programacionId: 214 },
    { id: 1914, matriculaId: 234, programacionId: 224 },
    { id: 1924, matriculaId: 234, programacionId: 234 },

    { id: 1934, matriculaId: 244, programacionId: 164 },
    { id: 1944, matriculaId: 244, programacionId: 174 },
    { id: 1954, matriculaId: 244, programacionId: 184 },
    { id: 1964, matriculaId: 244, programacionId: 194 },
    { id: 1974, matriculaId: 244, programacionId: 204 },
    { id: 1984, matriculaId: 244, programacionId: 214 },
    { id: 1994, matriculaId: 244, programacionId: 224 },
    { id: 2004, matriculaId: 244, programacionId: 234 },

    { id: 2014, matriculaId: 254, programacionId: 164 },
    { id: 2024, matriculaId: 254, programacionId: 174 },
    { id: 2034, matriculaId: 254, programacionId: 184 },
    { id: 2044, matriculaId: 254, programacionId: 194 },
    { id: 2054, matriculaId: 254, programacionId: 204 },
    { id: 2064, matriculaId: 254, programacionId: 214 },
    { id: 2074, matriculaId: 254, programacionId: 224 },
    { id: 2084, matriculaId: 254, programacionId: 234 },

    { id: 2094, matriculaId: 264, programacionId: 164 },
    { id: 2104, matriculaId: 264, programacionId: 174 },
    { id: 2114, matriculaId: 264, programacionId: 184 },
    { id: 2124, matriculaId: 264, programacionId: 194 },
    { id: 2134, matriculaId: 264, programacionId: 204 },
    { id: 2144, matriculaId: 264, programacionId: 214 },
    { id: 2154, matriculaId: 264, programacionId: 224 },
    { id: 2164, matriculaId: 264, programacionId: 234 },

    { id: 2174, matriculaId: 274, programacionId: 164 },
    { id: 2184, matriculaId: 274, programacionId: 174 },
    { id: 2194, matriculaId: 274, programacionId: 184 },
    { id: 2204, matriculaId: 274, programacionId: 194 },
    { id: 2214, matriculaId: 274, programacionId: 204 },
    { id: 2224, matriculaId: 274, programacionId: 214 },
    { id: 2234, matriculaId: 274, programacionId: 224 },
    { id: 2244, matriculaId: 274, programacionId: 234 },

    { id: 2254, matriculaId: 284, programacionId: 164 },
    { id: 2264, matriculaId: 284, programacionId: 174 },
    { id: 2274, matriculaId: 284, programacionId: 184 },
    { id: 2284, matriculaId: 284, programacionId: 194 },
    { id: 2294, matriculaId: 284, programacionId: 204 },
    { id: 2304, matriculaId: 284, programacionId: 214 },
    { id: 2314, matriculaId: 284, programacionId: 224 },
    { id: 2324, matriculaId: 284, programacionId: 234 },

    { id: 2334, matriculaId: 294, programacionId: 164 },
    { id: 2344, matriculaId: 294, programacionId: 174 },
    { id: 2354, matriculaId: 294, programacionId: 184 },
    { id: 2364, matriculaId: 294, programacionId: 194 },
    { id: 2374, matriculaId: 294, programacionId: 204 },
    { id: 2384, matriculaId: 294, programacionId: 214 },
    { id: 2394, matriculaId: 294, programacionId: 224 },
    { id: 2404, matriculaId: 294, programacionId: 234 },

    /* SEGUNDO SECUNDARIA  SECCION B*/

    { id: 2414, matriculaId: 304, programacionId: 244 },
    { id: 2424, matriculaId: 304, programacionId: 254 },
    { id: 2434, matriculaId: 304, programacionId: 264 },
    { id: 2444, matriculaId: 304, programacionId: 274 },
    { id: 2454, matriculaId: 304, programacionId: 284 },
    { id: 2464, matriculaId: 304, programacionId: 294 },
    { id: 2474, matriculaId: 304, programacionId: 304 },
    { id: 2484, matriculaId: 304, programacionId: 314 },

    { id: 2494, matriculaId: 314, programacionId: 244 },
    { id: 2504, matriculaId: 314, programacionId: 254 },
    { id: 2514, matriculaId: 314, programacionId: 264 },
    { id: 2524, matriculaId: 314, programacionId: 274 },
    { id: 2534, matriculaId: 314, programacionId: 284 },
    { id: 2544, matriculaId: 314, programacionId: 294 },
    { id: 2554, matriculaId: 314, programacionId: 304 },
    { id: 2564, matriculaId: 314, programacionId: 314 },

    { id: 2574, matriculaId: 324, programacionId: 244 },
    { id: 2584, matriculaId: 324, programacionId: 254 },
    { id: 2594, matriculaId: 324, programacionId: 264 },
    { id: 2604, matriculaId: 324, programacionId: 274 },
    { id: 2614, matriculaId: 324, programacionId: 284 },
    { id: 2624, matriculaId: 324, programacionId: 294 },
    { id: 2634, matriculaId: 324, programacionId: 304 },
    { id: 2644, matriculaId: 324, programacionId: 314 },

    { id: 2654, matriculaId: 334, programacionId: 244 },
    { id: 2664, matriculaId: 334, programacionId: 254 },
    { id: 2674, matriculaId: 334, programacionId: 264 },
    { id: 2684, matriculaId: 334, programacionId: 274 },
    { id: 2694, matriculaId: 334, programacionId: 284 },
    { id: 2704, matriculaId: 334, programacionId: 294 },
    { id: 2714, matriculaId: 334, programacionId: 304 },
    { id: 2724, matriculaId: 334, programacionId: 314 },

    { id: 2734, matriculaId: 344, programacionId: 244 },
    { id: 2744, matriculaId: 344, programacionId: 254 },
    { id: 2754, matriculaId: 344, programacionId: 264 },
    { id: 2764, matriculaId: 344, programacionId: 274 },
    { id: 2774, matriculaId: 344, programacionId: 284 },
    { id: 2784, matriculaId: 344, programacionId: 294 },
    { id: 2794, matriculaId: 344, programacionId: 304 },
    { id: 2804, matriculaId: 344, programacionId: 314 },

    { id: 2814, matriculaId: 354, programacionId: 244 },
    { id: 2824, matriculaId: 354, programacionId: 254 },
    { id: 2834, matriculaId: 354, programacionId: 264 },
    { id: 2844, matriculaId: 354, programacionId: 274 },
    { id: 2854, matriculaId: 354, programacionId: 284 },
    { id: 2864, matriculaId: 354, programacionId: 294 },
    { id: 2874, matriculaId: 354, programacionId: 304 },
    { id: 2884, matriculaId: 354, programacionId: 314 },

    { id: 2894, matriculaId: 364, programacionId: 244 },
    { id: 2904, matriculaId: 364, programacionId: 254 },
    { id: 2914, matriculaId: 364, programacionId: 264 },
    { id: 2924, matriculaId: 364, programacionId: 274 },
    { id: 2934, matriculaId: 364, programacionId: 284 },
    { id: 2944, matriculaId: 364, programacionId: 294 },
    { id: 2954, matriculaId: 364, programacionId: 304 },
    { id: 2964, matriculaId: 364, programacionId: 314 },

    { id: 2974, matriculaId: 374, programacionId: 244 },
    { id: 2984, matriculaId: 374, programacionId: 254 },
    { id: 2994, matriculaId: 374, programacionId: 264 },
    { id: 3004, matriculaId: 374, programacionId: 274 },
    { id: 3014, matriculaId: 374, programacionId: 284 },
    { id: 3024, matriculaId: 374, programacionId: 294 },
    { id: 3034, matriculaId: 374, programacionId: 304 },
    { id: 3044, matriculaId: 374, programacionId: 314 },

    { id: 3054, matriculaId: 384, programacionId: 244 },
    { id: 3064, matriculaId: 384, programacionId: 254 },
    { id: 3074, matriculaId: 384, programacionId: 264 },
    { id: 3084, matriculaId: 384, programacionId: 274 },
    { id: 3094, matriculaId: 384, programacionId: 284 },
    { id: 3104, matriculaId: 384, programacionId: 294 },
    { id: 3114, matriculaId: 384, programacionId: 304 },
    { id: 3124, matriculaId: 384, programacionId: 314 },

    { id: 3134, matriculaId: 394, programacionId: 244 },
    { id: 3144, matriculaId: 394, programacionId: 254 },
    { id: 3154, matriculaId: 394, programacionId: 264 },
    { id: 3164, matriculaId: 394, programacionId: 274 },
    { id: 3174, matriculaId: 394, programacionId: 284 },
    { id: 3184, matriculaId: 394, programacionId: 294 },
    { id: 3194, matriculaId: 394, programacionId: 304 },
    { id: 3204, matriculaId: 394, programacionId: 314 },
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


