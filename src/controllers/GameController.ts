import getUserToken from "../helpers/get-user-token";
import getUserByToken from "../helpers/get-user-by-token";
import Game from "../models/Game";
import { Request, Response } from "express";
interface MulterImage {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    destination: string;
    filename: string;
    path: string;
    size: number;
}

class GameController {
  static async create(req: Request, res: Response) {

    const { name, description, platform, price } = req.body;
    const images = req.files as Array<MulterImage>

    if (!name) {
      return res.status(422).json({ message: "Name is required" });
    }

    if (!description) {
      return res.status(422).json({ message: "Description is required" });
    }

    if (!platform) {
      return res.status(422).json({ message: "Platform is required" });
    }

    if (!price) {
      return res.status(422).json({ message: "Price is required" });
    }

    const availablePlatforms = ["Playstation", "Xbox", "Nintendo"];

    if (!availablePlatforms.includes(platform)) {
      return res
        .status(422)
        .json({
          message: "Available platforms are: Playstation, Xbox or Nintendo",
        });
    }

    if(images.length === 0){
        return res.status(422).json({message: "You must send at least one image of the game"})
    }

    if(images.length > 5){
        return res.status(422).json({message: "You have reached the limit of photos that can be sent"})
    }

    const available = true;

    const token = getUserToken(req)
    const seller = await getUserByToken(token,res)

    const game = new Game({
      name,
      description,
      platform,
      price: parseFloat(price),
      available,
      images: images.map(image => image.filename),
      sellerId: seller.id
    });

    try {
      await game.insert();
      return res.status(201).json({ message: "Game added successfully", game });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
        const games = await Game.getAll()
        return res.status(200).json({games})
    } catch (error) {
        return res.status(500).json({ message: error });
    }
  } 

  static async getUserGames(req: Request, res: Response) {
    const token = getUserToken(req)
    
    try {
        const seller = await getUserByToken(token,res)
        const games = await Game.getUserGames(seller.id)
        return res.status(200).json({games})
    } catch (error) {
        return res.status(500).json({ message: error });
    }
  }

  static async getUserPurchases(req: Request, res: Response) {
    const token = getUserToken(req)
    
    try {
        const buyer = await getUserByToken(token,res)
        const games = await Game.getUserPurchases(buyer.id)
        return res.status(200).json({games})
    } catch (error) {
        return res.status(500).json({ message: error });
    }
  }

  static async getGameById(req: Request, res: Response) {
    const gameId = req.params.id
    try {
        const game = await Game.getGameById(parseInt(gameId))
        if(!game){
          return res.status(404).json({message: 'Game not found'})
        }
        return res.status(200).json({game})
    } catch (error) {
        return res.status(500).json({ message: error });
    }
  }

  static async deleteGameById(req: Request, res: Response) {
    const gameId = req.params.id
    const token = getUserToken(req)
    try {
        const game = await Game.getGameById(parseInt(gameId))

        if(!game){
          return res.status(404).json({message: 'Game not found'})
        }

        const user = await getUserByToken(token,res)
        
        if(user.id !== game.sellerId){
          return res.status(401).json({message: 'Users can only delete their own games'})
        }
        await Game.deleteGameById(game.id)
        return res.status(200).json({message: 'Game deleted'})

    } catch (error) {
        return res.status(500).json({ message: error });
    }
  }

}

export default GameController;
