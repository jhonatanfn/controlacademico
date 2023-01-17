import  path  from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { Request, Response } from "express";
import { actualizarArchivo } from '../helpers/actualizaArchivo';
import Usuario from '../models/usuario';
import DatauriParser  from 'datauri/parser';
import Persona from '../models/persona';
import Area from '../models/area';
import Material from '../models/material';
import Institucion from '../models/institucion';
import { handleHttpError } from '../utils/handleError';

const parser = new DatauriParser();
var cloudinary = require('cloudinary').v2;
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'archivos', 
    api_key: process.env.CLOUDINARY_API_KEY || '229177161422146',
    api_secret: process.env.CLOUDINARY_API_SECRET || '50CFAia_nxawmNLcdUH7uIACHEU'
});

export const fileUpload= async (req:Request,res:Response)=>{
    
    const { id } = req.params;

    try {
        const usuario = await Usuario.findByPk(id,{
            include:[{
                model:Persona,
                as:'persona'
            }]
        });

        if(!usuario){
            return res.status(400).json({
                ok:false,
                msg: `No existe un usuario con el id: ${id}`
            });
        }
    
        if(!req.files || Object.keys(req.files).length ===0){
            return res.status(400).json({
                ok:false,
                msg:'No hay ningun archivo cargado'
            });
        }
        const file:any = req.files.imagen;
        const nombreCortado=file.name.split('.');
        const extensionArchivo=nombreCortado[nombreCortado.length-1];
    
        const extencionesValidas=['png','jpg','jpeg','gif','JPG','JPEG','PNG'];
        if( !extencionesValidas.includes(extensionArchivo)){
            return res.status(400).json({
                ok:false,
                msg:'No es una extension permitida'
            });
        }
        const nombreArchivo= `${uuidv4()}.${extensionArchivo}`;
        const pathImg=path.join(__dirname,`../../uploads/${nombreArchivo}`);
        
        file.mv(pathImg,(error:any)=>{
            if(error){
                return res.status(500).json({
                    ok:false,
                    msg:'Error al mover la imagen'
                });
            }
        });
        actualizarArchivo(usuario,nombreArchivo);
        
        res.json({
            ok: true,
            msg:'Archivo subido',
            nombreArchivo
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const retornaImagen=(req:Request,res:Response)=>{
    const foto= req.params.foto;
    const pathImg=path.join(__dirname,`../../uploads/${foto}`);
    if(fs.existsSync(pathImg)){
        res.sendFile(pathImg);
    }else{
        const pathDefault=path.join(__dirname,`../../uploads/no-img.jpg`);
        res.sendFile(pathDefault);
    }
}
export const fileUploadCloudinary= async (req:Request,res:Response)=>{
    
    const { id } = req.params;

    try {
        const usuario:any = await Usuario.findByPk(id,{
            include:[{
                model:Persona,
                as:'persona'
            }]
        });
        if(!usuario){
            return res.status(400).json({
                ok:false,
                msg: `No existe un usuario con el id: ${id}`
            });
        }
    
        if(!req.files || Object.keys(req.files).length ===0){
            return res.status(400).json({
                ok:false,
                msg:'No hay ningun archivo cargado'
            });
        }
        const file:any = req.files.imagen;
        const nombreCortado=file.name.split('.');
        const extensionArchivo=nombreCortado[nombreCortado.length-1];
    
        const extencionesValidas=['png','jpg','jpeg','gif','JPG','JPEG','PNG'];
        if( !extencionesValidas.includes(extensionArchivo)){
            return res.status(400).json({
                ok:false,
                msg:'No es una extension permitida'
            });
        }

        const persona:any= await Persona.findByPk(usuario.personaId);

        if(persona.img){
            const nombreArr= persona.img.split('/');
            const nombre=nombreArr[ nombreArr.length - 1];
            const [ public_id] =nombre.split('.');
            await cloudinary.uploader.destroy(public_id);
        }

        const file64 = parser.format('imagennombre', file.data);
        const {secure_url} = await cloudinary.uploader.upload(file64.content!);
        const nombreArchivo= secure_url;
        
        persona.img=secure_url;
        await persona.save();
        
        res.json({
            ok: true,
            msg:'Archivo subido exitosamente',
            nombreArchivo
        });

    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const fileUploadCloudinaryArea= async (req:Request,res:Response)=>{
    
    const { id } = req.params;

    try {
        const area:any = await Area.findByPk(id);
        if(!area){
            return res.status(400).json({
                ok:false,
                msg: `No existe un area con el id: ${id}`
            });
        }
        if(!req.files || Object.keys(req.files).length ===0){
            return res.status(400).json({
                ok:false,
                msg:'No hay ningun archivo cargado'
            });
        }
        const file:any = req.files.imagen;
        const nombreCortado=file.name.split('.');
        const extensionArchivo=nombreCortado[nombreCortado.length-1];
    
        const extencionesValidas=['png','jpg','jpeg','gif','JPG','JPEG','PNG'];
        if( !extencionesValidas.includes(extensionArchivo)){
            return res.status(400).json({
                ok:false,
                msg:'No es una extension permitida'
            });
        }

        if(area.img){
            const nombreArr= area.img.split('/');
            const nombre=nombreArr[ nombreArr.length - 1];
            const [ public_id] =nombre.split('.');
            await cloudinary.uploader.destroy(public_id);
        }

        const file64 = parser.format('imagennombre', file.data);
        const {secure_url} = await cloudinary.uploader.upload(file64.content!);
        const nombreArchivo= secure_url;
        
        area.img=secure_url;
        await area.save();
        
        res.json({
            ok: true,
            msg:'Archivo subido exitosamente',
            nombreArchivo
        });

    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const fileUploadPdf= async (req:Request,res:Response)=>{

    const { id } = req.params;
    try {
        
        const material:any= await Material.findByPk(id);
        if(!material || material.estado==false){
            return res.status(400).json({
                ok:false,
                msg: `No existe un material con el id: ${id}`
            });
        }
        if(!req.files || Object.keys(req.files).length ===0){
            return res.status(400).json({
                ok:false,
                msg:'No hay ningun archivo cargado'
            });
        }

        const file:any = req.files.archivo;
        const nombreCortado=file.name.split('.');
        const extensionArchivo=nombreCortado[nombreCortado.length-1];
    
        const extencionesValidas=['pdf','png','jpg','jpeg','gif','JPG','JPEG','PNG'];
        if( !extencionesValidas.includes(extensionArchivo)){
            return res.status(400).json({
                ok:false,
                msg:'No es una extension permitida'
            });
        }
        if(material.archivo){
            const nombreArr= material.archivo.split('/');
            const nombre=nombreArr[ nombreArr.length - 1];
            const [ public_id] =nombre.split('.');
            await cloudinary.uploader.destroy(public_id);
        }
        const file64 = parser.format('archivonombre', file.data);
        const {secure_url} = await cloudinary.uploader.upload(file64.content!,{ folder: "material" });
        const nombreArchivo= secure_url;
        
        material.archivo=secure_url;
        await material.save();
        
        res.json({
            ok: true,
            msg:'Archivo subido exitosamente',
            nombreArchivo
        });


    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }


}
export const retornaImagenInstitucion=(req:Request,res:Response)=>{
    const foto= req.params.foto;
    const pathImg=path.join(__dirname,`../../uploads/${foto}`);
    if(fs.existsSync(pathImg)){
        res.sendFile(pathImg);
    }else{
        const pathDefault=path.join(__dirname,`../../uploads/victorraulsullana.jpg`);
        res.sendFile(pathDefault);
    }
}

export const fileUploadCloudinaryInstitucion= async (req:Request,res:Response)=>{
    
    const { id } = req.params;

    try {
        const institucion:any = await Institucion.findByPk(id);
        if(!institucion){
            return res.status(400).json({
                ok:false,
                msg: `No existe una institucion con el id: ${id}`
            });
        }
        if(!req.files || Object.keys(req.files).length ===0){
            return res.status(400).json({
                ok:false,
                msg:'No hay ningun archivo cargado'
            });
        }
        const file:any = req.files.imagen;
        const nombreCortado=file.name.split('.');
        const extensionArchivo=nombreCortado[nombreCortado.length-1];
    
        const extencionesValidas=['pdf','png','jpg','jpeg','gif','JPG','JPEG','PNG'];
        if( !extencionesValidas.includes(extensionArchivo)){
            return res.status(400).json({
                ok:false,
                msg:'No es una extension permitida'
            });
        }

        if(institucion.img){
            const nombreArr= institucion.img.split('/');
            const nombre=nombreArr[ nombreArr.length - 1];
            const [ public_id] =nombre.split('.');
            await cloudinary.uploader.destroy(public_id);
        }

        const file64 = parser.format('imagennombre', file.data);
        const {secure_url} = await cloudinary.uploader.upload(file64.content!);
        const nombreArchivo= secure_url;
        
        institucion.img=secure_url;
        await institucion.save();
        
        res.json({
            ok: true,
            msg:'Archivo subido exitosamente',
            nombreArchivo
        });

    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}