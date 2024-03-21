import User from "../models/User";
import { Request, Response } from "express";
import { genSalt, hash, compare } from "bcrypt";
import createUserToken from "../helpers/create-user-token";
import getUserToken from "../helpers/get-user-token";
import { JwtPayload, verify } from "jsonwebtoken";
import getUserByToken from "../helpers/get-user-by-token";
import imageUpload from "../middlewares/imageUpload";

class UserController {
  static async register(req: Request, res: Response) {
    const { name, email, password, confirmedPassword, image, phone } = req.body;
    if (!name) {
      return res.status(422).json({ message: "Name is required" });
    }
    if (!email) {
      return res.status(422).json({ message: "Email is required" });
    }
    if (!password) {
      return res.status(422).json({ message: "Password is required" });
    }
    if (!confirmedPassword) {
      return res
        .status(422)
        .json({ message: "Password confirmation is required" });
    }
    if (!phone) {
      return res.status(422).json({ message: "Phone is required" });
    }
    if (password !== confirmedPassword) {
      return res.status(422).json({ message: "Passwords must match" });
    }
    const userExists = await User.getUserByEmail(email);
    if (userExists) {
      return res.status(422).json({
        message: `An user with email '${userExists.email}' already exists`,
      });
    }
    const salt = await genSalt(12);
    const passwordHash = await hash(password, salt);

    const user = new User({
      name,
      email,
      password: passwordHash,
      image,
      phone,
    });
    try {
      user.insert();
      createUserToken(user.getId(), user.getName(), req, res);
      return;
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email) {
      return res.status(422).json({ message: "Email is required" });
    }
    if (!password) {
      return res.status(422).json({ message: "Password is required" });
    }

    const user = await User.getUserByEmail(email);
    if (!user) {
      return res
        .status(422)
        .json({ message: `There is no user with email '${email}'` });
    }

    const isCorrectPassword = await compare(password, user.password);
    if (!isCorrectPassword) {
      return res.status(422).json({ message: "Password invalid" });
    }
    createUserToken(user?.id, user.name, req, res);
    return;
  }

  static async validate(req: Request, res: Response) {
    if (req.headers.authorization) {
      const token = getUserToken(req);
      const tokenDecoded = verify(token, "secretUGBS") as JwtPayload;
      const currentUser = await User.getUserById(tokenDecoded.id);
      delete currentUser.password;
      return res.status(200).json({ message: currentUser });
    }
    return res
      .status(422)
      .json({ message: "Authorization token was not sent" });
  }

  static async getUserById(req: Request, res: Response) {
    if (!req.params.id) {
      return res.status(422).json({ message: "You must send an Id" });
    }
    const id = parseInt(req.params.id);
    const user = await User.getUserById(id);
    delete user.password;

    if (!user) {
      return res
        .status(422)
        .json({ message: `Ther is no user with id: ${id}` });
    }
    return res.status(200).json({ user });
  }

  static async edit(req: Request, res: Response) {
    const { name, email, phone, password,confirmedPassword } = req.body;
    const token = getUserToken(req);
    const user = await getUserByToken(token, res);

    if (!user) {
      return res.status(422).json({ message: `User not found` });
    }
    const userAlreadyExists = await User.getUserByEmail(email);
    if (email) {
      if (userAlreadyExists || email === user.email) {
        return res.status(422).send({
          message: `Invalid email: ${
            email === user.email
              ? "The new email must be different than the current one"
              : "An user with this email already exists"
          }`,
        });
      }
    }
    if (password && password !== confirmedPassword) {
      return res.status(422).json({ message: "Passwords must match" });
    }
    const salt = await genSalt(12);
    const passwordHash = password ? await hash(password, salt) : "";
    const image = req.file? req.file.filename : ''
    try {
      await User.edit({
        id: user.id,
        name,
        email,
        password: passwordHash,
        image,
        phone,
      });
      res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
      res.status(500).json({ message: error });
    }
    return;
  }
}

export default UserController;
