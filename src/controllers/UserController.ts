import User from "../models/User";
import { Request, Response } from "express";
import {genSalt,hash,compare} from 'bcrypt'
import createUserToken from "../helpers/create-user-token";
import getUserToken from "../helpers/get-user-token";
import {JwtPayload, verify} from 'jsonwebtoken'

class UserController {
  static async register(req: Request, res: Response) {
    const { name, email, password, confirmedPassword, image, phone } = req.body;
    if (!name) {
      res.status(422).json({ message: "Name is required" });
      return;
    }
    if (!email) {
      res.status(422).json({ message: "Email is required" });
      return;
    }
    if (!password) {
      res.status(422).json({ message: "Password is required" });
      return;
    }
    if (!confirmedPassword) {
      res.status(422).json({ message: "Password confirmation is required" });
      return;
    }
    if (!phone) {
      res.status(422).json({ message: "Phone is required" });
      return;
    }
    if ( password !== confirmedPassword){
        res.status(422).json({ message: "Passwords must match" });
        return;
    }
    const userExists = await User.getUserByEmail(email)
    if(userExists){
        res.status(422).json({message: `An user with email '${userExists.email}' already exists`})
        return
    }
    const salt = await genSalt(12)
    const passwordHash = await hash(password,salt)
    
    const user = new User({name,email,password:passwordHash,image,phone})
    try {
        user.insert()
        createUserToken(user.getId(),user.getName(),req,res)
        return
    } catch (error) {
        res.status(500).json({message:error})
    }
    return;
  }
  
  static async login(req: Request, res: Response){

    const {email,password} = req.body

    if (!email) {
      res.status(422).json({ message: "Email is required" });
      return;
    }
    if (!password) {
      res.status(422).json({ message: "Password is required" });
      return;
    }

    const user = await User.getUserByEmail(email)
    if(!user){
      res.status(422).json({ message: `There is no user with email '${email}'`});
      return
    }

    const isCorrectPassword = await compare(password,user.password)
    if(!isCorrectPassword){
      res.status(422).json({ message: 'Password invalid'});
      return
    }
    createUserToken(user?.id,user.name,req,res)
    return
  }
  static async validate(req: Request, res: Response){
    if(req.headers.authorization){
        const token = getUserToken(req)
        const tokenDecoded = verify(token,'secretUGBS') as JwtPayload
        const currentUser = await User.getUserById(tokenDecoded.id)
        delete currentUser.password
        res.status(200).json({message:currentUser})
        return
    }
    res.status(422).json({message: 'Authorization token was not sent'})
    return
  }
  static async getUserById(req: Request, res: Response){
    if(!req.params.id){
      res.status(422).json({message: 'You must send an Id'})
      return
    }
    const id = parseInt(req.params.id)
    const user = await User.getUserById(id)
    delete user.password

    if(!user){
      res.status(422).json({message: `Ther is no user with id: ${id}`})
      return
    }
    res.status(200).json({user})
  }
}

export default UserController;
