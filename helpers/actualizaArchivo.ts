import fs from 'fs';
import  path  from 'path';
import Persona from '../models/persona';

export const borrarArchivo=(path:string)=>{
    if(fs.existsSync(path)){
        fs.unlinkSync(path);
    }
}

export const actualizarArchivo= async (usuario:any,nombreArchivo:string)=>{
    let pathViejo='';
    
    try {
        pathViejo=path.join(__dirname,`../../uploads/${usuario.img}`);
        borrarArchivo(pathViejo);
        
        const persona:any=await Persona.findByPk(usuario.personaId);
        persona.img=nombreArchivo;
        await persona?.save();
        
        return true;
    } catch (error) {
        return false;
    }
    
}



