import path from 'path';
import express, { Application } from 'express';
import cors from 'cors';
import db from '../db/connection';
import usuarioRoutes from '../routes/usuario';
import authRoutes from '../routes/auth';
import areaRoutes from '../routes/area';
import rolRoutes from '../routes/role';
import uploadRoutes from '../routes/upload';
import docenteRoutes from '../routes/docente';
import tipodocumentoRoutes from '../routes/tipodocumento';
import nivelRoutes from '../routes/nivel';
import gradoRoutes from '../routes/grado';
import seccionRoutes from '../routes/seccion';
import personaRoutes from '../routes/persona';
import alumnoRoutes from '../routes/alumno';
import aulaRoutes from '../routes/aula';
import periodoRoutes from '../routes/periodo';
import programacionRoutes from '../routes/programacion';
import matriculaRoutes from '../routes/matricula';
import notaRoutes from '../routes/nota';
import cicloRoutes from '../routes/ciclo';
import evaluacionRoutes from '../routes/evaluacion';
import materialRoutes from '../routes/material';
import asistenciaRoutes from '../routes/asistencia';
import situacionRoutes from '../routes/situacion';
import institucionRoutes from '../routes/institucion';
import horasRoutes from '../routes/hora';
import horariosRoutes from '../routes/horario';
import rangosRoutes from '../routes/rango';
import { dbSeed } from '../seeders/semilla';
import pdfRoutes from '../routes/pdf';
import mensajeriaRoutes from '../routes/mensajeria';
import padreRoutes from '../routes/padre';
import madreRoutes from '../routes/madre';
import competenciaRoutes from '../routes/competencia';
import matriculadetalleRoutes from '../routes/matriculadetalle';
import auxiliarRoutes from '../routes/auxiliar';
import directorRoutes from '../routes/director';
import apreciacionRoutes from '../routes/apreciacion';
import responsableRoutes from '../routes/responsable';
import apreciaciondetalleRoutes from '../routes/apreciaciondetalle';

class Server {
    private app: Application;
    private port: string;
    private llave: boolean = false;
    private apiPaths = {
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

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';
        this.dbConnection();
        this.middlewares();
        this.routes();
    }

    async dbConnection() {
        try {
            await db.sync({ force: this.llave }).then(() => {
                if (this.llave) {
                    dbSeed();
                } else {
                    console.log("No execution seed");
                }
            });
            console.log('Database online');
        } catch (error: any) {
            throw new Error(error);
        }
    }

    middlewares() {
        // Cors
        this.app.use(cors());
        // Lectura del body
        this.app.use(express.json());
        // Carpeta publica
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.apiPaths.usuarios, usuarioRoutes);
        this.app.use(this.apiPaths.auth, authRoutes);
        this.app.use(this.apiPaths.areas, areaRoutes);
        this.app.use(this.apiPaths.roles, rolRoutes);
        this.app.use(this.apiPaths.uploads, uploadRoutes);
        this.app.use(this.apiPaths.docentes, docenteRoutes);
        this.app.use(this.apiPaths.tipodocumentos, tipodocumentoRoutes);
        this.app.use(this.apiPaths.niveles, nivelRoutes);
        this.app.use(this.apiPaths.grados, gradoRoutes);
        this.app.use(this.apiPaths.secciones, seccionRoutes);
        this.app.use(this.apiPaths.personas, personaRoutes);
        this.app.use(this.apiPaths.alumnos, alumnoRoutes);
        this.app.use(this.apiPaths.aulas, aulaRoutes);
        this.app.use(this.apiPaths.periodos, periodoRoutes);
        this.app.use(this.apiPaths.programaciones, programacionRoutes);
        this.app.use(this.apiPaths.matriculas, matriculaRoutes);
        this.app.use(this.apiPaths.notas, notaRoutes);
        this.app.use(this.apiPaths.ciclos, cicloRoutes);
        this.app.use(this.apiPaths.evaluaciones, evaluacionRoutes);
        this.app.use(this.apiPaths.materiales, materialRoutes);
        this.app.use(this.apiPaths.asistencias, asistenciaRoutes);
        this.app.use(this.apiPaths.situaciones, situacionRoutes);
        this.app.use(this.apiPaths.pdfs, pdfRoutes);
        this.app.use(this.apiPaths.instituciones, institucionRoutes);
        this.app.use(this.apiPaths.horas, horasRoutes);
        this.app.use(this.apiPaths.horarios, horariosRoutes);
        this.app.use(this.apiPaths.rangos, rangosRoutes);
        this.app.use(this.apiPaths.mensajerias, mensajeriaRoutes);
        this.app.use(this.apiPaths.padres, padreRoutes);
        this.app.use(this.apiPaths.madres, madreRoutes);
        this.app.use(this.apiPaths.competencias, competenciaRoutes);
        this.app.use(this.apiPaths.matriculadetalles, matriculadetalleRoutes);
        this.app.use(this.apiPaths.auxiliares, auxiliarRoutes);
        this.app.use(this.apiPaths.directores, directorRoutes);
        this.app.use(this.apiPaths.apreciaciones, apreciacionRoutes);
        this.app.use(this.apiPaths.responsables, responsableRoutes);
        this.app.use(this.apiPaths.apreciaciondetalles, apreciaciondetalleRoutes);

        this.app.get('*', (req, res) => {
            res.sendFile(path.resolve(__dirname, '../../public/index.html'));
        });
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Servidor corriendo en el puerto: " + this.port);
        });
    }
}

export default Server;

