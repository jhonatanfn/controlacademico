import { Request, Response } from "express";
import Role from "../models/role";
import Usuario from '../models/usuario';
import { handleHttpError } from "../utils/handleError";

export const getRoles= async (req:Request, res:Response)=>{

    try {
        const roles= await Role.findAll({
            include:{
                model: Usuario,
                as:'usuario',
                attributes:['id','nombre','email']
            },
            attributes:['id','nombre','bgcolor']
        });
        res.json({
            ok: true,
            msg: 'Lista de Roles',
            roles
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
    
}

export const getRole= async (req:Request, res:Response)=>{
    const { id } = req.params;
    try {
        const role:any = await Role.findByPk(id);
        if(!role){
            return res.status(400).json({
                ok:false,
                msg: `No existe un rol con el id: ${id}`
            });
        }
        res.json({
            ok: true,
            role
        });

    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}

export const postRole= async (req:Request, res:Response)=>{

    const { body } = req;

    try {
        const role= Role.build(body);
        await role.save();
        res.json({
            ok:true,
            msg:'Rol creado exitosamente',
            role
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}

export const putRole= async (req:Request, res:Response)=>{
    
    const { id } = req.params;
    const { body }= req;
    
    try {
        const role:any = await Role.findByPk(id);
        if(!role){
            return res.status(400).json({
                ok:false,
                msg: `No existe un rol con el id: ${id}`
            });
        }
        await role?.update(body);
        res.json({
            ok:true,
            msg:'Rol actualizado exitosamente',
            role
        });

    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}


export const deleteRole= async (req:Request, res:Response)=>{
    const { id } = req.params;
    try {
        const role:any = await Role.findByPk(id);
        if(!role){
            return res.status(400).json({
                ok:false,
                msg: `No existe un rol con el id: ${id}`
            });
        }
        await role?.update({ estado:false});
        res.json({
            ok:true,
            msg:'Rol eliminado exitosamente',
            role
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
