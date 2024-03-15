import {sign} from 'jsonwebtoken'
import {Request,Response} from 'express'

const createUserToken = (userId:number,userName:string,req:Request,res:Response) => {
    const token = sign({
        id: userId,
        name: userName
    }, "secretUGBS")
    res.status(200).json({
        message: 'User authenticated',
        token
    })
}

export default createUserToken