import { Response } from "express";

export const handleHttpError= (res:Response, message:string, code:number, error?:any)=>{
    res.status(code).json({
        ok: false,
        msg: message,
        error:error
    });
}