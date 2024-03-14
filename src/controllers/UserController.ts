import User from "../models/User";
import { Request, Response } from "express";
import {genSalt,hash} from 'bcrypt'
import createUserToken from "../helpers/create-user-token";

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
        createUserToken({user,req,res})
        return
    } catch (error) {
        res.status(500).json({message:error})
    }
    res.send("User created");
    return;
  }
}

export default UserController;
