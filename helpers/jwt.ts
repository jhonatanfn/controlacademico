import jwt from 'jsonwebtoken';

export const generarJWT= (email:string)=>{
    return new Promise((resolve, reject)=>{
        const payload={
            email
        }
        jwt.sign(payload, process.env.JWT_SECRET || '@#FLORESHAAAXXX54266525',{
            expiresIn: '24h'
        }, (err, token)=>{
            if(err){
                console.log(err);
                reject('No se pudo generar el JWT');
            }else{
                resolve(token);
            }
        });
    });
}