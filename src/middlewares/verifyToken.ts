import { Request, Response, NextFunction } from "express";
import getUserToken from "../helpers/get-user-token";
import { verify } from "jsonwebtoken";

const verifyToken = (req:Request,res:Response,next:NextFunction) => {
    if(!req.headers.authorization){
        return res.status(401).json({message: 'You must send a valid token'})
    }
    try {
        verify(getUserToken(req),"secretUGBS")
        next()
    } catch (error) {
        return res.status(400).json({message: 'Token invalid'})
    }
}

export default verifyToken