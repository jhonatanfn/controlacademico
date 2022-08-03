import { Request, Response} from "express";
import jwt from 'jsonwebtoken';
import Usuario from "../models/usuario";

export const validarJWT= async (req:any, res:Response, next:any)=>{

    //Leer el token
    const token= req.header('x-token');
    if(!token){
        return res.status(401).json({
            ok:false,
            msg:'No hay token en la peticion'
        });
    }
    try {
        const { email }=jwt.verify(token, process.env.JWT_SECRET || '@#FLORESHAAAXXX54266525');
        const usuario:any= await Usuario.findOne({
            where:{
                email: email
            }
        });
        req.email= email;
        req.usuarioauth=usuario.id;
        next();
    } catch (error) {
        return res.status(401).json({
            ok:false,
            msg:'Token no valido'
        });
    }

  

}