import {Request,Response} from 'express'

const getUserToken = (req:Request) => {
    const token = req.headers.authorization.split(" ")[1]
    return token
}

export default getUserToken