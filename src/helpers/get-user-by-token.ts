import { JwtPayload, verify } from "jsonwebtoken"
import User from "../models/User"
import { Response } from "express"

const getUserByToken = async (token:string,res:Response) => {
    if(!token){
        res.status(401).json({message:'Access denied'})
    }
    const tokenDecoded = verify(token,'secretUGBS') as JwtPayload

    const user = User.getUserById(tokenDecoded.id)

    return user
}

export default getUserByToken