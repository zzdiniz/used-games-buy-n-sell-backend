import {sign} from 'jsonwebtoken'
import {Request,Response} from 'express'
import User from '../models/User';
interface CreateUserTokenProps {
    user: User;
    req: Request;
    res: Response;
}
const createUserToken = ({user,req,res}:CreateUserTokenProps) => {
    const token = sign({
        id: user.getId(),
        name: user.getName()
    }, "secretUGBS")
    res.status(200).json({
        message: 'User authenticated',
        token
    })
}

export default createUserToken