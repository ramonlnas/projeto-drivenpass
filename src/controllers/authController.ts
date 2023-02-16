import { Request, Response } from "express"
import httpStatus from "http-status";
import jwt from 'jsonwebtoken';
import { AuthEntity } from "protocols/authProtocols";
import authService from "service/authService";


export async function signUp (req: Request, res: Response){

    const {email, password} = req.body as AuthEntity
    
    try{
        const result = await authService.signUp({email, password}) 
        res.status(httpStatus.OK).send(result)
    }catch(err){
        console.log(err);
        res.sendStatus(404);
    }
}



export async function signIn (req,res){
   
    const userId = res.locals.userId;
    const userRows = await selectUser(userId);

    const user = userRows.rows[0];
   const userData = {username:user.username,image:user.image,userId:userId};
    const secretKey=process.env.JWT_SECRET;
    const config = { expiresIn: 60*60*24 }
  
    const token = jwt.sign(userData, secretKey,config);
   
    try {
       
         res.status(200).send({token:token,userId:userId,username:user.username,image:user.image})
       } catch (err) {
         console.log(err);
         res.sendStatus(500)
       }
}


const authController = {
    signIn,
    signUp
}

export default authController