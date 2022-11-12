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
    { id: 6, nombre: "APODERADO", bgcolor: "bg-dark" },
];
export const situaciones = [
    { id: 4, nombre: "FALTÓ", color: 'danger', abreviatura: "F" },
    { id: 14, nombre: "ASISTIÓ", color: 'success', abreviatura: "A" },
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
    { id: 1, nombre: 'SECUNDARIA' },
];
export const grados = [
    { id: 1, nombre: 'PRIMERO' },
    { id: 2, nombre: 'SEGUNDO' },
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
    { id: 1, nombre: "1°", inicio: "1:00 pm", fin: "1:45 pm", tipo: 1 },
    { id: 2, nombre: "2°", inicio: "1:45 pm", fin: "2:30 pm", tipo: 1 },
    { id: 3, nombre: "3°", inicio: "2:30 pm", fin: "3:15 pm", tipo: 1 },
    { id: 4, nombre: "4°", inicio: "3:15 pm", fin: "4:00 pm", tipo: 1 },
    { id: 5, nombre: "RECREO", inicio: "4:00 pm", fin: "4:20 pm", tipo: 0 },
    { id: 6, nombre: "5°", inicio: "4:20 pm", fin: "5:05 pm", tipo: 1 },
    { id: 7, nombre: "6°", inicio: "5:05 pm", fin: "5:50 pm", tipo: 1 },
    { id: 8, nombre: "7°", inicio: "5:50 pm", fin: "6:30 pm", tipo: 1 }
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
    { id: 1, dni: '46556963', sexo: 1, fechanacimiento: moment(new Date("1994/07/15")).format('YYYY-MM-DD'), nombres: 'DARWIN JHONATAN', apellidopaterno: 'FLORES', apellidomaterno: 'NUÑEZ', tipodocumentoId: 1 },

    /*  Docentes */
    { id: 2, dni: '44409214', sexo: 1, fechanacimiento: moment(new Date("1980/04/12")).format('YYYY-MM-DD'), nombres: 'FLAVIO', apellidopaterno: 'GARCIA', apellidomaterno: 'RIVERA', tipodocumentoId: 1 },
    { id: 3, dni: '46378155', sexo: 2, fechanacimiento: moment(new Date("1980/04/12")).format('YYYY-MM-DD'), nombres: 'MILAGROS ANALY', apellidopaterno: 'GOMEZ', apellidomaterno: 'ENCALADA', tipodocumentoId: 1 },
    { id: 4, dni: '40357419', sexo: 1, fechanacimiento: moment(new Date("1980/04/12")).format('YYYY-MM-DD'), nombres: 'JOSE JAVIER', apellidopaterno: 'YARLEQUE', apellidomaterno: 'VILCHEZ', tipodocumentoId: 1 },
    { id: 5, dni: '40213876', sexo: 1, fechanacimiento: moment(new Date("1980/04/12")).format('YYYY-MM-DD'), nombres: 'DANTE JOEL', apellidopaterno: 'CABREJOS', apellidomaterno: 'REYES', tipodocumentoId: 1 },
    { id: 6, dni: '47903092', sexo: 1, fechanacimiento: moment(new Date("1980/04/12")).format('YYYY-MM-DD'), nombres: 'JORGE LUIS', apellidopaterno: 'ACARO', apellidomaterno: 'GARCIA', tipodocumentoId: 1 },
    { id: 7, dni: '44554185', sexo: 1, fechanacimiento: moment(new Date("1980/04/12")).format('YYYY-MM-DD'), nombres: 'WILLIAM', apellidopaterno: 'CALLE', apellidomaterno: 'BENITES', tipodocumentoId: 1 },
    { id: 8, dni: '02807311', sexo: 1, fechanacimiento: moment(new Date("1980/04/12")).format('YYYY-MM-DD'), nombres: 'WILMER', apellidopaterno: 'CORREA', apellidomaterno: 'GARCIA', tipodocumentoId: 1 },
    { id: 9, dni: '72199165', sexo: 2, fechanacimiento: moment(new Date("1980/04/12")).format('YYYY-MM-DD'), nombres: 'ANA BELEN', apellidopaterno: 'INGA', apellidomaterno: 'SALDARRIAGA', tipodocumentoId: 1 },
    { id: 10, dni: '46274986', sexo: 1, fechanacimiento: moment(new Date("1980/04/12")).format('YYYY-MM-DD'), nombres: 'VICTOR', apellidopaterno: 'ANTO', apellidomaterno: 'MIMBELA', tipodocumentoId: 1 },

    /*  padres */
    { id: 11, dni: '42215224', sexo: 1, fechanacimiento: moment(new Date("1985/04/12")).format('YYYY-MM-DD'), nombres: 'JUAN ALBERTO', apellidopaterno: 'JUAREZ', apellidomaterno: 'CARAMANTIN', tipodocumentoId: 1 },
    { id: 12, dni: '33668077', sexo: 1, fechanacimiento: moment(new Date("1985/04/12")).format('YYYY-MM-DD'), nombres: 'JAIME RICARDO', apellidopaterno: 'PINTADO', apellidomaterno: 'CALLE', tipodocumentoId: 1 },
    { id: 13, dni: '42136288', sexo: 1, fechanacimiento: moment(new Date("1985/04/12")).format('YYYY-MM-DD'), nombres: 'JORGE', apellidopaterno: 'DIONISIO', apellidomaterno: 'CORDOVA', tipodocumentoId: 1 },
    { id: 14, dni: '40134863', sexo: 1, fechanacimiento: moment(new Date("1985/04/12")).format('YYYY-MM-DD'), nombres: 'LUIS MARTIN', apellidopaterno: 'ANASTACIO', apellidomaterno: 'CAMPOS', tipodocumentoId: 1 },
    { id: 15, dni: '41979708', sexo: 1, fechanacimiento: moment(new Date("1985/04/12")).format('YYYY-MM-DD'), nombres: 'JHOE FABIAN', apellidopaterno: 'CORDOVA', apellidomaterno: 'VILLEGAS', tipodocumentoId: 1 },
    { id: 16, dni: '28032999', sexo: 1, fechanacimiento: moment(new Date("1985/04/12")).format('YYYY-MM-DD'), nombres: 'OSCAR LUIS', apellidopaterno: 'SALDARRIAGA', apellidomaterno: 'MORAN', tipodocumentoId: 1 },
    { id: 17, dni: '80446280', sexo: 1, fechanacimiento: moment(new Date("1985/04/12")).format('YYYY-MM-DD'), nombres: 'MEDARDO', apellidopaterno: 'QUISPE', apellidomaterno: 'SAUCEDO', tipodocumentoId: 1 },
    { id: 18, dni: '25431443', sexo: 1, fechanacimiento: moment(new Date("1985/04/12")).format('YYYY-MM-DD'), nombres: 'MARTIN', apellidopaterno: 'CHUICA', apellidomaterno: 'ADRIANZEN', tipodocumentoId: 1 },
    { id: 19, dni: '33666766', sexo: 1, fechanacimiento: moment(new Date("1985/04/12")).format('YYYY-MM-DD'), nombres: 'VICTOR', apellidopaterno: 'ADRIANZEN', apellidomaterno: 'CHERRES', tipodocumentoId: 1 },

    /* madres */
    { id: 20, dni: '46538404', sexo: 2, fechanacimiento: moment(new Date("1985/04/12")).format('YYYY-MM-DD'), nombres: 'KAREN YENYFFER', apellidopaterno: 'PACHERRES', apellidomaterno: 'ODAR', tipodocumentoId: 1 },
    { id: 21, dni: '33300095', sexo: 2, fechanacimiento: moment(new Date("1985/04/12")).format('YYYY-MM-DD'), nombres: 'ZULEMA', apellidopaterno: 'PALACIOS', apellidomaterno: 'VELASQUEZ', tipodocumentoId: 1 },
    { id: 22, dni: '42337247', sexo: 2, fechanacimiento: moment(new Date("1985/04/12")).format('YYYY-MM-DD'), nombres: 'MILAGROS', apellidopaterno: 'CORDOVA', apellidomaterno: 'LOPEZ', tipodocumentoId: 1 },
    { id: 23, dni: '41940454', sexo: 2, fechanacimiento: moment(new Date("1985/04/12")).format('YYYY-MM-DD'), nombres: 'JESSICA MARIA', apellidopaterno: 'BERECHE', apellidomaterno: 'RIVAS', tipodocumentoId: 1 },
    { id: 24, dni: '41784702', sexo: 2, fechanacimiento: moment(new Date("1985/04/12")).format('YYYY-MM-DD'), nombres: 'LUCY', apellidopaterno: 'LESCANO', apellidomaterno: 'CAMPOS', tipodocumentoId: 1 },
    { id: 25, dni: '80678486', sexo: 2, fechanacimiento: moment(new Date("1985/04/12")).format('YYYY-MM-DD'), nombres: 'MARIA LUISA', apellidopaterno: 'MORALES', apellidomaterno: 'VAZQUES', tipodocumentoId: 1 },
    { id: 26, dni: '40611824', sexo: 2, fechanacimiento: moment(new Date("1985/04/12")).format('YYYY-MM-DD'), nombres: 'JULIANA', apellidopaterno: 'BAYONA', apellidomaterno: 'GARCIA', tipodocumentoId: 1 },
    { id: 27, dni: '42634953', sexo: 2, fechanacimiento: moment(new Date("1985/04/12")).format('YYYY-MM-DD'), nombres: 'FLOR', apellidopaterno: 'MAZA', apellidomaterno: 'RAMOS', tipodocumentoId: 1 },
    { id: 28, dni: '44247506', sexo: 2, fechanacimiento: moment(new Date("1985/04/12")).format('YYYY-MM-DD'), nombres: 'FIORELLA', apellidopaterno: 'AGUIRRE', apellidomaterno: 'VIERA', tipodocumentoId: 1 },
    { id: 29, dni: '43484605', sexo: 2, fechanacimiento: moment(new Date("1985/04/12")).format('YYYY-MM-DD'), nombres: 'KARINA', apellidopaterno: 'LOZADA', apellidomaterno: 'YARLEQUE', tipodocumentoId: 1 },

    /* Alumnos 1 A*/
    { id: 30, dni: '67675770', sexo: 2, fechanacimiento: moment(new Date("2010/04/12")).format('YYYY-MM-DD'), nombres: 'ADRIANA FERNANDA', apellidopaterno: 'MORE', apellidomaterno: 'JUAREZ', tipodocumentoId: 1 },
    { id: 31, dni: '34776686', sexo: 1, fechanacimiento: moment(new Date("2010/04/12")).format('YYYY-MM-DD'), nombres: 'RICARDO GLEISSNER', apellidopaterno: 'PINTADO', apellidomaterno: 'ORDOÑEZ', tipodocumentoId: 1 },
    { id: 32, dni: '66796519', sexo: 1, fechanacimiento: moment(new Date("2010/04/12")).format('YYYY-MM-DD'), nombres: 'MARCO OSVALDO', apellidopaterno: 'TORRES', apellidomaterno: 'DIONISIO', tipodocumentoId: 1 },
    { id: 33, dni: '23522439', sexo: 1, fechanacimiento: moment(new Date("2010/04/12")).format('YYYY-MM-DD'), nombres: 'ANDERSON ASAEL', apellidopaterno: 'LOZADA', apellidomaterno: 'ANASTACIO', tipodocumentoId: 1 },
    { id: 34, dni: '94375916', sexo: 1, fechanacimiento: moment(new Date("2010/04/12")).format('YYYY-MM-DD'), nombres: 'KEVIN', apellidopaterno: 'PALACIOS', apellidomaterno: 'CORDOVA', tipodocumentoId: 1 },
    { id: 35, dni: '79069307', sexo: 1, fechanacimiento: moment(new Date("2010/04/12")).format('YYYY-MM-DD'), nombres: 'ALONSO', apellidopaterno: 'INGA', apellidomaterno: 'SALDARRIAGA', tipodocumentoId: 1 },
    { id: 36, dni: '56066411', sexo: 2, fechanacimiento: moment(new Date("2010/04/12")).format('YYYY-MM-DD'), nombres: 'MARIA FERNANDA', apellidopaterno: 'JIMENEZ', apellidomaterno: 'QUISPE', tipodocumentoId: 1 },
    { id: 37, dni: '93625136', sexo: 1, fechanacimiento: moment(new Date("2010/04/12")).format('YYYY-MM-DD'), nombres: 'JUNIOR MARTIN', apellidopaterno: 'CHUICA', apellidomaterno: 'MONTENEGRO', tipodocumentoId: 1 },
    { id: 38, dni: '95831424', sexo: 2, fechanacimiento: moment(new Date("2010/04/12")).format('YYYY-MM-DD'), nombres: 'ALEXANDRA', apellidopaterno: 'CORNEJO', apellidomaterno: 'ADRIANZEN', tipodocumentoId: 1 },
    { id: 39, dni: '18205639', sexo: 2, fechanacimiento: moment(new Date("2010/04/12")).format('YYYY-MM-DD'), nombres: 'DANNA', apellidopaterno: 'DURAN', apellidomaterno: 'PACHERRES', tipodocumentoId: 1 },

    /* Alumnos 2 A*/
    { id: 40, dni: '96483020', sexo: 1, fechanacimiento: moment(new Date("2010/04/12")).format('YYYY-MM-DD'), nombres: 'ERICK', apellidopaterno: 'ALVARADO', apellidomaterno: 'BERMEO', tipodocumentoId: 1 },
    { id: 41, dni: '90216663', sexo: 1, fechanacimiento: moment(new Date("2010/04/12")).format('YYYY-MM-DD'), nombres: 'CARLOS ROLANDO', apellidopaterno: 'APONTE', apellidomaterno: 'BURNEO', tipodocumentoId: 1 },
    { id: 42, dni: '52389341', sexo: 1, fechanacimiento: moment(new Date("2010/04/12")).format('YYYY-MM-DD'), nombres: 'PIERO', apellidopaterno: 'CAMPOS', apellidomaterno: 'MORE', tipodocumentoId: 1 },
    { id: 43, dni: '45014214', sexo: 1, fechanacimiento: moment(new Date("2010/04/12")).format('YYYY-MM-DD'), nombres: 'ALEX FABIAN', apellidopaterno: 'CRUZ', apellidomaterno: 'CORDOVA', tipodocumentoId: 1 },
    { id: 44, dni: '75024117', sexo: 2, fechanacimiento: moment(new Date("2010/04/12")).format('YYYY-MM-DD'), nombres: 'LEYLA', apellidopaterno: 'GARCIA', apellidomaterno: 'SERNAQUE', tipodocumentoId: 1 },
    { id: 45, dni: '12892836', sexo: 1, fechanacimiento: moment(new Date("2010/04/12")).format('YYYY-MM-DD'), nombres: 'ENRIQUE NAPOLEAN', apellidopaterno: 'GUZMAN', apellidomaterno: 'GARCIA', tipodocumentoId: 1 },
    { id: 46, dni: '52730003', sexo: 1, fechanacimiento: moment(new Date("2010/04/12")).format('YYYY-MM-DD'), nombres: 'ERICK', apellidopaterno: 'JIMENEZ', apellidomaterno: 'GARCIA', tipodocumentoId: 1 },
    { id: 47, dni: '94442585', sexo: 2, fechanacimiento: moment(new Date("2010/04/12")).format('YYYY-MM-DD'), nombres: 'JIMENA', apellidopaterno: 'PALACIOS', apellidomaterno: 'BERECHE', tipodocumentoId: 1 },
    { id: 48, dni: '39099454', sexo: 1, fechanacimiento: moment(new Date("2010/04/12")).format('YYYY-MM-DD'), nombres: 'ALEXIS', apellidopaterno: 'ROJAS', apellidomaterno: 'PACHERREZ', tipodocumentoId: 1 },
    { id: 49, dni: '15775569', sexo: 2, fechanacimiento: moment(new Date("2010/04/12")).format('YYYY-MM-DD'), nombres: 'ALLISON JIMENA', apellidopaterno: 'VIDAL', apellidomaterno: 'SANCHEZ', tipodocumentoId: 1 },

    /* Alumnos 1 B*/
    { id: 50, dni: '61943078', sexo: 1, fechanacimiento: moment(new Date("2010/04/12")).format('YYYY-MM-DD'), nombres: 'JURGEN KLINSMAN', apellidopaterno: 'ATOCHE', apellidomaterno: 'TALLEDO', tipodocumentoId: 1 },
    { id: 51, dni: '61769085', sexo: 1, fechanacimiento: moment(new Date("2010/04/12")).format('YYYY-MM-DD'), nombres: 'CHRISTIAN LEONARDO', apellidopaterno: 'ALVARADO', apellidomaterno: 'AREVALO', tipodocumentoId: 1 },
    { id: 52, dni: '61988111', sexo: 1, fechanacimiento: moment(new Date("2010/04/12")).format('YYYY-MM-DD'), nombres: 'EDWIN JARITH', apellidopaterno: 'CACERES', apellidomaterno: 'RENTERIA', tipodocumentoId: 1 },
    { id: 53, dni: '61987674', sexo: 1, fechanacimiento: moment(new Date("2010/04/12")).format('YYYY-MM-DD'), nombres: 'DOUGLAS LEONEL', apellidopaterno: 'CARLIN', apellidomaterno: 'ORTIZ', tipodocumentoId: 1 },
    { id: 54, dni: '61372273', sexo: 2, fechanacimiento: moment(new Date("2010/04/12")).format('YYYY-MM-DD'), nombres: 'DAMARIS NYKOLL', apellidopaterno: 'CHIROQUE', apellidomaterno: 'ESPINOZA', tipodocumentoId: 1 },
    { id: 55, dni: '61436546', sexo: 1, fechanacimiento: moment(new Date("2010/04/12")).format('YYYY-MM-DD'), nombres: 'JUNIOR BRANDY', apellidopaterno: 'CRUZ', apellidomaterno: 'RUEDA', tipodocumentoId: 1 },
    { id: 56, dni: '76881046', sexo: 1, fechanacimiento: moment(new Date("2010/04/12")).format('YYYY-MM-DD'), nombres: 'YEREMI ALEXANDER', apellidopaterno: 'DAVILA', apellidomaterno: 'REYES', tipodocumentoId: 1 },
    { id: 57, dni: '73408800', sexo: 1, fechanacimiento: moment(new Date("2010/04/12")).format('YYYY-MM-DD'), nombres: 'RAFAEL EDUARDO', apellidopaterno: 'GALECIO', apellidomaterno: 'SALCEDO', tipodocumentoId: 1 },
    { id: 58, dni: '61987735', sexo: 1, fechanacimiento: moment(new Date("2010/04/12")).format('YYYY-MM-DD'), nombres: 'OSCAR STEPHANO', apellidopaterno: 'REYES', apellidomaterno: 'RIVERA', tipodocumentoId: 1 },
    { id: 59, dni: '61854510', sexo: 1, fechanacimiento: moment(new Date("2010/04/12")).format('YYYY-MM-DD'), nombres: 'ALBERT SNAYDER', apellidopaterno: 'ZAPATA', apellidomaterno: 'ESTRADA', tipodocumentoId: 1 },

    /* Alumnos 2 B*/
    { id: 60, dni: '61768339', sexo: 1, fechanacimiento: moment(new Date("2010/04/12")).format('YYYY-MM-DD'), nombres: 'JERICKSON JHAIR', apellidopaterno: 'ABAD', apellidomaterno: 'GARCIA', tipodocumentoId: 1 },
    { id: 61, dni: '61501424', sexo: 2, fechanacimiento: moment(new Date("2010/04/12")).format('YYYY-MM-DD'), nombres: 'YARUMY ALEXANDRA', apellidopaterno: 'ALAMA', apellidomaterno: 'TAVARA', tipodocumentoId: 1 },
    { id: 62, dni: '61500914', sexo: 1, fechanacimiento: moment(new Date("2010/04/12")).format('YYYY-MM-DD'), nombres: 'ERWUINS ALEXANDER', apellidopaterno: 'ALCERO', apellidomaterno: 'NORES', tipodocumentoId: 1 },
    { id: 63, dni: '61768272', sexo: 2, fechanacimiento: moment(new Date("2010/04/12")).format('YYYY-MM-DD'), nombres: 'BIANCA CAMILLA', apellidopaterno: 'BENITES', apellidomaterno: 'DIOSES', tipodocumentoId: 1 },
    { id: 64, dni: '61436218', sexo: 1, fechanacimiento: moment(new Date("2010/04/12")).format('YYYY-MM-DD'), nombres: 'WILLIAM JUNIOR', apellidopaterno: 'CARRASCO', apellidomaterno: 'CARHUAPOMA', tipodocumentoId: 1 },
    { id: 65, dni: '61500797', sexo: 2, fechanacimiento: moment(new Date("2010/04/12")).format('YYYY-MM-DD'), nombres: 'BRIANA ALMUDENA', apellidopaterno: 'CASTRO', apellidomaterno: 'SIANCAS', tipodocumentoId: 1 },
    { id: 66, dni: '62027706', sexo: 1, fechanacimiento: moment(new Date("2010/04/12")).format('YYYY-MM-DD'), nombres: 'MANUEL ENRIQUE', apellidopaterno: 'NAVARRETE', apellidomaterno: 'TABOADA', tipodocumentoId: 1 },
    { id: 67, dni: '62968255', sexo: 2, fechanacimiento: moment(new Date("2010/04/12")).format('YYYY-MM-DD'), nombres: 'BRENDY NATALY', apellidopaterno: 'SAAVEDRA', apellidomaterno: 'CHAVEZ', tipodocumentoId: 1 },
    { id: 68, dni: '61386848', sexo: 1, fechanacimiento: moment(new Date("2010/04/12")).format('YYYY-MM-DD'), nombres: 'JUAN MANUEL', apellidopaterno: 'UBILLUS', apellidomaterno: 'MADRID', tipodocumentoId: 1 },
    { id: 69, dni: '62027884', sexo: 1, fechanacimiento: moment(new Date("2010/04/12")).format('YYYY-MM-DD'), nombres: 'SERGIO ALFREDO', apellidopaterno: 'ZAPATA', apellidomaterno: 'MORENO', tipodocumentoId: 1 },

    /** auxiliares */
    { id: 70, dni: '81061664', sexo: 1, fechanacimiento: moment(new Date("1985/04/12")).format('YYYY-MM-DD'), nombres: 'FRANKLIN', apellidopaterno: 'APONTE', apellidomaterno: 'QUINTANA', tipodocumentoId: 1 },
    { id: 71, dni: '43195779', sexo: 2, fechanacimiento: moment(new Date("1985/04/12")).format('YYYY-MM-DD'), nombres: 'FAVIOLA', apellidopaterno: 'TEZEN', apellidomaterno: 'CHERO', tipodocumentoId: 1 },
    { id: 72, dni: '47503406', sexo: 1, fechanacimiento: moment(new Date("1985/04/12")).format('YYYY-MM-DD'), nombres: 'JAVIER ALONSO', apellidopaterno: 'JUAREZ', apellidomaterno: 'BERECHE', tipodocumentoId: 1 },

    /** directores */
    { id: 73, dni: '52639852', sexo: 1, fechanacimiento: moment(new Date("1965/04/12")).format('YYYY-MM-DD'), nombres: 'JOSE EDUARDO', apellidopaterno: 'AGURTO', apellidomaterno: 'NOLE', tipodocumentoId: 1 },
    { id: 74, dni: '54784168', sexo: 2, fechanacimiento: moment(new Date("1965/04/12")).format('YYYY-MM-DD'), nombres: 'MILAGROS DEL ROSARIO', apellidopaterno: 'SANDOVAL', apellidomaterno: 'VASQUEZ', tipodocumentoId: 1 },
    { id: 75, dni: '49632582', sexo: 2, fechanacimiento: moment(new Date("1965/04/12")).format('YYYY-MM-DD'), nombres: 'ANA CELINDA', apellidopaterno: 'ORTIZ', apellidomaterno: 'FALCON', tipodocumentoId: 1 },
    { id: 76, dni: '41528799', sexo: 1, fechanacimiento: moment(new Date("1965/04/12")).format('YYYY-MM-DD'), nombres: 'CESAR', apellidopaterno: 'AGUIRRE', apellidomaterno: 'NAVARRO', tipodocumentoId: 1 },

    { id: 77, dni: '00000000', sexo: 1, fechanacimiento: moment(new Date("1979/04/12")).format('YYYY-MM-DD'), nombres: 'DESCONOCIDO', apellidopaterno: 'DESCONOCIDO', apellidomaterno: 'DESCONOCIDO', tipodocumentoId: 1 },

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

    /**Auxiliares */
    { id: 30, numero: 30, nombre: "Franklin", email: "franklin30@mail.com", password: "123456", roleId: 5, personaId: 70 },
    { id: 31, numero: 31, nombre: "Faviola", email: "faviola31@mail.com", password: "123456", roleId: 5, personaId: 71 },
    { id: 32, numero: 32, nombre: "Javier", email: "javier32@mail.com", password: "123456", roleId: 5, personaId: 72 },
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
    { id: 10, personaId: 77 }
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
    { id: 11, personaId: 77 }
];
export const responsables = [
    { id: 1, personaId: 11 },
    { id: 2, personaId: 12 },
    { id: 3, personaId: 13 },
    { id: 4, personaId: 14 },
    { id: 5, personaId: 15 },
    { id: 6, personaId: 16 },
    { id: 7, personaId: 17 },
    { id: 8, personaId: 18 },
    { id: 9, personaId: 19 }
];
export const auxiliares = [
    { id: 1, personaId: 70 },
    { id: 2, personaId: 71 },
    { id: 3, personaId: 72 },
];

export const alumnos = [
    /** 1A */
    { id: 1, personaId: 30, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 1, madreId: 1, responsableId: 1 },
    { id: 2, personaId: 31, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 2, madreId: 2, responsableId: 2 },
    { id: 3, personaId: 32, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 3, madreId: 3, responsableId: 3 },
    { id: 4, personaId: 33, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 4, madreId: 4, responsableId: 4 },
    { id: 5, personaId: 34, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 5, madreId: 5, responsableId: 5 },
    { id: 6, personaId: 35, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 6, madreId: 6, responsableId: 6 },
    { id: 7, personaId: 36, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 7, madreId: 7, responsableId: 7 },
    { id: 8, personaId: 37, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 8, madreId: 8, responsableId: 8 },
    { id: 9, personaId: 38, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 9, madreId: 9, responsableId: 9 },
    { id: 10, personaId: 39, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 1, madreId: 10, responsableId: 1 },
    /** 2A */
    { id: 11, personaId: 40, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 2, madreId: 1, responsableId: 2 },
    { id: 12, personaId: 41, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 3, madreId: 2, responsableId: 3 },
    { id: 13, personaId: 42, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 4, madreId: 3, responsableId: 4 },
    { id: 14, personaId: 43, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 5, madreId: 4, responsableId: 5 },
    { id: 15, personaId: 44, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 6, madreId: 5, responsableId: 6 },
    { id: 16, personaId: 45, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 7, madreId: 6, responsableId: 7 },
    { id: 17, personaId: 46, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 8, madreId: 7, responsableId: 8 },
    { id: 18, personaId: 47, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 9, madreId: 8, responsableId: 9 },
    { id: 19, personaId: 48, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 1, madreId: 9, responsableId: 1 },
    { id: 20, personaId: 49, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 2, madreId: 10, responsableId: 2 },
    /** 1B */
    { id: 21, personaId: 50, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 3, madreId: 1, responsableId: 3 },
    { id: 22, personaId: 51, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 4, madreId: 2, responsableId: 4 },
    { id: 23, personaId: 52, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 5, madreId: 3, responsableId: 5 },
    { id: 24, personaId: 53, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 6, madreId: 4, responsableId: 6 },
    { id: 25, personaId: 54, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 7, madreId: 5, responsableId: 7 },
    { id: 26, personaId: 55, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 8, madreId: 6, responsableId: 8 },
    { id: 27, personaId: 56, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 9, madreId: 7, responsableId: 9 },
    { id: 28, personaId: 57, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 1, madreId: 8, responsableId: 1 },
    { id: 29, personaId: 58, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 2, madreId: 9, responsableId: 2 },
    { id: 30, personaId: 59, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 3, madreId: 10, responsableId: 3 },
    /** 2B */
    { id: 31, personaId: 60, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 4, madreId: 1, responsableId: 4 },
    { id: 32, personaId: 61, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 5, madreId: 2, responsableId: 5 },
    { id: 33, personaId: 62, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 6, madreId: 3, responsableId: 6 },
    { id: 34, personaId: 63, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 7, madreId: 4, responsableId: 7 },
    { id: 35, personaId: 64, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 8, madreId: 5, responsableId: 8 },
    { id: 36, personaId: 65, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 9, madreId: 6, responsableId: 9 },
    { id: 37, personaId: 66, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 1, madreId: 7, responsableId: 1 },
    { id: 38, personaId: 67, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 2, madreId: 8, responsableId: 2 },
    { id: 39, personaId: 68, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 3, madreId: 9, responsableId: 3 },
    { id: 40, personaId: 69, vivecon: 1, tienediscapacidad: 1, certificadiscapacidad: 1, padreId: 4, madreId: 10, responsableId: 4 },
];

export const directores = [
    { id: 1, observacion: 'Director', personaId: 54 },
    { id: 2, observacion: 'Sub Directora del Nivel Primario', personaId: 55 },
    { id: 3, observacion: 'Sub Directora del Nivel Secundario', personaId: 56 },
    { id: 4, observacion: 'Sub Director del Nivel Secundario', personaId: 57 },
];

export const aulas = [
    { id: 1, nombre: 'AULA 1 SEC. SECCION A', nivelId: 1, gradoId: 1, seccionId: 1, tipovalor: 1 },
    { id: 2, nombre: 'AULA 2 SEC. SECCION A', nivelId: 1, gradoId: 2, seccionId: 1, tipovalor: 1 },
    { id: 3, nombre: 'AULA 1 SEC. SECCION B', nivelId: 1, gradoId: 1, seccionId: 2, tipovalor: 1 },
    { id: 4, nombre: 'AULA 2 SEC. SECCION B', nivelId: 1, gradoId: 2, seccionId: 2, tipovalor: 1 },
];
export const programaciones = [

    /**AULA 1A */
    { id: 1, numeromat: 10, aulaId: 1, docenteId: 1, areaId: 1, periodoId: 1 },
    { id: 2, numeromat: 10, aulaId: 1, docenteId: 2, areaId: 2, periodoId: 1 },
    { id: 3, numeromat: 10, aulaId: 1, docenteId: 3, areaId: 3, periodoId: 1 },
    { id: 4, numeromat: 10, aulaId: 1, docenteId: 4, areaId: 4, periodoId: 1 },
    { id: 5, numeromat: 10, aulaId: 1, docenteId: 5, areaId: 5, periodoId: 1 },
    { id: 6, numeromat: 10, aulaId: 1, docenteId: 6, areaId: 6, periodoId: 1 },
    { id: 7, numeromat: 10, aulaId: 1, docenteId: 7, areaId: 7, periodoId: 1 },
    { id: 8, numeromat: 10, aulaId: 1, docenteId: 8, areaId: 8, periodoId: 1 },
    /**AULA 2A */
    { id: 9, numeromat: 10, aulaId: 2, docenteId: 1, areaId: 1, periodoId: 1 },
    { id: 10, numeromat: 10, aulaId: 2, docenteId: 2, areaId: 2, periodoId: 1 },
    { id: 11, numeromat: 10, aulaId: 2, docenteId: 3, areaId: 3, periodoId: 1 },
    { id: 12, numeromat: 10, aulaId: 2, docenteId: 4, areaId: 4, periodoId: 1 },
    { id: 13, numeromat: 10, aulaId: 2, docenteId: 5, areaId: 5, periodoId: 1 },
    { id: 14, numeromat: 10, aulaId: 2, docenteId: 6, areaId: 6, periodoId: 1 },
    { id: 15, numeromat: 10, aulaId: 2, docenteId: 7, areaId: 7, periodoId: 1 },
    { id: 16, numeromat: 10, aulaId: 2, docenteId: 8, areaId: 8, periodoId: 1 },
    /**AULA 1B */
    { id: 17, numeromat: 10, aulaId: 3, docenteId: 1, areaId: 1, periodoId: 1 },
    { id: 18, numeromat: 10, aulaId: 3, docenteId: 2, areaId: 2, periodoId: 1 },
    { id: 19, numeromat: 10, aulaId: 3, docenteId: 3, areaId: 3, periodoId: 1 },
    { id: 20, numeromat: 10, aulaId: 3, docenteId: 4, areaId: 4, periodoId: 1 },
    { id: 21, numeromat: 10, aulaId: 3, docenteId: 5, areaId: 5, periodoId: 1 },
    { id: 22, numeromat: 10, aulaId: 3, docenteId: 6, areaId: 6, periodoId: 1 },
    { id: 23, numeromat: 10, aulaId: 3, docenteId: 7, areaId: 7, periodoId: 1 },
    { id: 24, numeromat: 10, aulaId: 3, docenteId: 8, areaId: 8, periodoId: 1 },
    /**AULA 2B */
    { id: 25, numeromat: 10, aulaId: 4, docenteId: 1, areaId: 1, periodoId: 1 },
    { id: 26, numeromat: 10, aulaId: 4, docenteId: 2, areaId: 2, periodoId: 1 },
    { id: 27, numeromat: 10, aulaId: 4, docenteId: 3, areaId: 3, periodoId: 1 },
    { id: 28, numeromat: 10, aulaId: 4, docenteId: 4, areaId: 4, periodoId: 1 },
    { id: 29, numeromat: 10, aulaId: 4, docenteId: 5, areaId: 5, periodoId: 1 },
    { id: 30, numeromat: 10, aulaId: 4, docenteId: 6, areaId: 6, periodoId: 1 },
    { id: 31, numeromat: 10, aulaId: 4, docenteId: 7, areaId: 7, periodoId: 1 },
    { id: 32, numeromat: 10, aulaId: 4, docenteId: 8, areaId: 8, periodoId: 1 },
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

    { id: 21, alumnoId: 21 },
    { id: 22, alumnoId: 22 },
    { id: 23, alumnoId: 23 },
    { id: 24, alumnoId: 24 },
    { id: 25, alumnoId: 25 },
    { id: 26, alumnoId: 26 },
    { id: 27, alumnoId: 27 },
    { id: 28, alumnoId: 28 },
    { id: 29, alumnoId: 29 },
    { id: 30, alumnoId: 30 },

    { id: 31, alumnoId: 31 },
    { id: 32, alumnoId: 32 },
    { id: 33, alumnoId: 33 },
    { id: 34, alumnoId: 34 },
    { id: 35, alumnoId: 35 },
    { id: 36, alumnoId: 36 },
    { id: 37, alumnoId: 37 },
    { id: 38, alumnoId: 38 },
    { id: 39, alumnoId: 39 },
    { id: 40, alumnoId: 40 },

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

    /* PRIMERO SECUNDARIA  SECCION B*/

    { id: 162, matriculaId: 21, programacionId: 17 },
    { id: 163, matriculaId: 21, programacionId: 18 },
    { id: 164, matriculaId: 21, programacionId: 19 },
    { id: 165, matriculaId: 21, programacionId: 20 },
    { id: 166, matriculaId: 21, programacionId: 21 },
    { id: 167, matriculaId: 21, programacionId: 22 },
    { id: 168, matriculaId: 21, programacionId: 23 },
    { id: 169, matriculaId: 21, programacionId: 24 },

    { id: 170, matriculaId: 22, programacionId: 17 },
    { id: 171, matriculaId: 22, programacionId: 18 },
    { id: 172, matriculaId: 22, programacionId: 19 },
    { id: 173, matriculaId: 22, programacionId: 20 },
    { id: 174, matriculaId: 22, programacionId: 21 },
    { id: 175, matriculaId: 22, programacionId: 22 },
    { id: 176, matriculaId: 22, programacionId: 23 },
    { id: 177, matriculaId: 22, programacionId: 24 },

    { id: 178, matriculaId: 23, programacionId: 17 },
    { id: 179, matriculaId: 23, programacionId: 18 },
    { id: 180, matriculaId: 23, programacionId: 19 },
    { id: 181, matriculaId: 23, programacionId: 20 },
    { id: 182, matriculaId: 23, programacionId: 21 },
    { id: 183, matriculaId: 23, programacionId: 22 },
    { id: 184, matriculaId: 23, programacionId: 23 },
    { id: 185, matriculaId: 23, programacionId: 24 },

    { id: 186, matriculaId: 24, programacionId: 17 },
    { id: 187, matriculaId: 24, programacionId: 18 },
    { id: 188, matriculaId: 24, programacionId: 19 },
    { id: 189, matriculaId: 24, programacionId: 20 },
    { id: 190, matriculaId: 24, programacionId: 21 },
    { id: 191, matriculaId: 24, programacionId: 22 },
    { id: 192, matriculaId: 24, programacionId: 23 },
    { id: 193, matriculaId: 24, programacionId: 24 },

    { id: 194, matriculaId: 25, programacionId: 17 },
    { id: 195, matriculaId: 25, programacionId: 18 },
    { id: 196, matriculaId: 25, programacionId: 19 },
    { id: 197, matriculaId: 25, programacionId: 20 },
    { id: 198, matriculaId: 25, programacionId: 21 },
    { id: 199, matriculaId: 25, programacionId: 22 },
    { id: 200, matriculaId: 25, programacionId: 23 },
    { id: 201, matriculaId: 25, programacionId: 24 },

    { id: 202, matriculaId: 26, programacionId: 17 },
    { id: 203, matriculaId: 26, programacionId: 18 },
    { id: 204, matriculaId: 26, programacionId: 19 },
    { id: 205, matriculaId: 26, programacionId: 20 },
    { id: 206, matriculaId: 26, programacionId: 21 },
    { id: 207, matriculaId: 26, programacionId: 22 },
    { id: 208, matriculaId: 26, programacionId: 23 },
    { id: 209, matriculaId: 26, programacionId: 24 },

    { id: 210, matriculaId: 27, programacionId: 17 },
    { id: 211, matriculaId: 27, programacionId: 18 },
    { id: 212, matriculaId: 27, programacionId: 19 },
    { id: 213, matriculaId: 27, programacionId: 20 },
    { id: 214, matriculaId: 27, programacionId: 21 },
    { id: 215, matriculaId: 27, programacionId: 22 },
    { id: 216, matriculaId: 27, programacionId: 23 },
    { id: 217, matriculaId: 27, programacionId: 24 },

    { id: 218, matriculaId: 28, programacionId: 17 },
    { id: 219, matriculaId: 28, programacionId: 18 },
    { id: 220, matriculaId: 28, programacionId: 19 },
    { id: 221, matriculaId: 28, programacionId: 20 },
    { id: 222, matriculaId: 28, programacionId: 21 },
    { id: 223, matriculaId: 28, programacionId: 22 },
    { id: 224, matriculaId: 28, programacionId: 23 },
    { id: 225, matriculaId: 28, programacionId: 24 },

    { id: 226, matriculaId: 29, programacionId: 17 },
    { id: 227, matriculaId: 29, programacionId: 18 },
    { id: 228, matriculaId: 29, programacionId: 19 },
    { id: 229, matriculaId: 29, programacionId: 20 },
    { id: 230, matriculaId: 29, programacionId: 21 },
    { id: 231, matriculaId: 29, programacionId: 22 },
    { id: 232, matriculaId: 29, programacionId: 23 },
    { id: 233, matriculaId: 29, programacionId: 24 },

    { id: 234, matriculaId: 30, programacionId: 17 },
    { id: 235, matriculaId: 30, programacionId: 18 },
    { id: 236, matriculaId: 30, programacionId: 19 },
    { id: 237, matriculaId: 30, programacionId: 20 },
    { id: 238, matriculaId: 30, programacionId: 21 },
    { id: 239, matriculaId: 30, programacionId: 22 },
    { id: 240, matriculaId: 30, programacionId: 23 },
    { id: 241, matriculaId: 30, programacionId: 24 },

    /* SEGUNDO SECUNDARIA  SECCION B*/

    { id: 242, matriculaId: 31, programacionId: 25 },
    { id: 243, matriculaId: 31, programacionId: 26 },
    { id: 244, matriculaId: 31, programacionId: 27 },
    { id: 245, matriculaId: 31, programacionId: 28 },
    { id: 246, matriculaId: 31, programacionId: 29 },
    { id: 247, matriculaId: 31, programacionId: 30 },
    { id: 248, matriculaId: 31, programacionId: 31 },
    { id: 249, matriculaId: 31, programacionId: 32 },

    { id: 250, matriculaId: 32, programacionId: 25 },
    { id: 251, matriculaId: 32, programacionId: 26 },
    { id: 252, matriculaId: 32, programacionId: 27 },
    { id: 253, matriculaId: 32, programacionId: 28 },
    { id: 254, matriculaId: 32, programacionId: 29 },
    { id: 255, matriculaId: 32, programacionId: 30 },
    { id: 256, matriculaId: 32, programacionId: 31 },
    { id: 257, matriculaId: 32, programacionId: 32 },

    { id: 258, matriculaId: 33, programacionId: 25 },
    { id: 259, matriculaId: 33, programacionId: 26 },
    { id: 260, matriculaId: 33, programacionId: 27 },
    { id: 261, matriculaId: 33, programacionId: 28 },
    { id: 262, matriculaId: 33, programacionId: 29 },
    { id: 263, matriculaId: 33, programacionId: 30 },
    { id: 264, matriculaId: 33, programacionId: 31 },
    { id: 265, matriculaId: 33, programacionId: 32 },

    { id: 266, matriculaId: 34, programacionId: 25 },
    { id: 267, matriculaId: 34, programacionId: 26 },
    { id: 268, matriculaId: 34, programacionId: 27 },
    { id: 269, matriculaId: 34, programacionId: 28 },
    { id: 270, matriculaId: 34, programacionId: 29 },
    { id: 271, matriculaId: 34, programacionId: 30 },
    { id: 272, matriculaId: 34, programacionId: 31 },
    { id: 273, matriculaId: 34, programacionId: 32 },

    { id: 274, matriculaId: 35, programacionId: 25 },
    { id: 275, matriculaId: 35, programacionId: 26 },
    { id: 276, matriculaId: 35, programacionId: 27 },
    { id: 277, matriculaId: 35, programacionId: 28 },
    { id: 278, matriculaId: 35, programacionId: 29 },
    { id: 279, matriculaId: 35, programacionId: 30 },
    { id: 280, matriculaId: 35, programacionId: 31 },
    { id: 281, matriculaId: 35, programacionId: 32 },

    { id: 282, matriculaId: 36, programacionId: 25 },
    { id: 283, matriculaId: 36, programacionId: 26 },
    { id: 284, matriculaId: 36, programacionId: 27 },
    { id: 285, matriculaId: 36, programacionId: 28 },
    { id: 286, matriculaId: 36, programacionId: 29 },
    { id: 287, matriculaId: 36, programacionId: 30 },
    { id: 288, matriculaId: 36, programacionId: 31 },
    { id: 289, matriculaId: 36, programacionId: 32 },

    { id: 290, matriculaId: 37, programacionId: 25 },
    { id: 291, matriculaId: 37, programacionId: 26 },
    { id: 292, matriculaId: 37, programacionId: 27 },
    { id: 293, matriculaId: 37, programacionId: 28 },
    { id: 294, matriculaId: 37, programacionId: 29 },
    { id: 295, matriculaId: 37, programacionId: 30 },
    { id: 296, matriculaId: 37, programacionId: 31 },
    { id: 297, matriculaId: 37, programacionId: 32 },

    { id: 298, matriculaId: 38, programacionId: 25 },
    { id: 299, matriculaId: 38, programacionId: 26 },
    { id: 300, matriculaId: 38, programacionId: 27 },
    { id: 301, matriculaId: 38, programacionId: 28 },
    { id: 302, matriculaId: 38, programacionId: 29 },
    { id: 303, matriculaId: 38, programacionId: 30 },
    { id: 304, matriculaId: 38, programacionId: 31 },
    { id: 305, matriculaId: 38, programacionId: 32 },

    { id: 306, matriculaId: 39, programacionId: 25 },
    { id: 307, matriculaId: 39, programacionId: 26 },
    { id: 308, matriculaId: 39, programacionId: 27 },
    { id: 309, matriculaId: 39, programacionId: 28 },
    { id: 310, matriculaId: 39, programacionId: 29 },
    { id: 311, matriculaId: 39, programacionId: 30 },
    { id: 312, matriculaId: 39, programacionId: 31 },
    { id: 313, matriculaId: 39, programacionId: 32 },

    { id: 314, matriculaId: 40, programacionId: 25 },
    { id: 315, matriculaId: 40, programacionId: 26 },
    { id: 316, matriculaId: 40, programacionId: 27 },
    { id: 317, matriculaId: 40, programacionId: 28 },
    { id: 318, matriculaId: 40, programacionId: 29 },
    { id: 319, matriculaId: 40, programacionId: 30 },
    { id: 320, matriculaId: 40, programacionId: 31 },
    { id: 321, matriculaId: 40, programacionId: 32 },
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
