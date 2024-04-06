import { OkPacket } from "mysql";
import conn from "../db/conn";

interface GameData {
  id?: number;
  name: string;
  description: string;
  platform: "Playstation" | "Xbox" | "Nintendo";
  price: number;
  sellerId: number;
  buyerId?: number;
  available: boolean;
  images?: Array<String>;
}
class Game {
  private gameData: GameData;
  constructor(gameData: GameData) {
    this.gameData = gameData;
  }

  async insert(): Promise<OkPacket> {
    const query = `INSERT INTO Games (name,description,platform,price,available,images,sellerId) VALUES ('${this.gameData.name}','${this.gameData.description}','${this.gameData.platform}','${this.gameData.price}','${this.gameData.available === true? 1 : 0}','${JSON.stringify(this.gameData.images)}','${this.gameData.sellerId}')`;

    return new Promise((resolve, reject) => {
      conn.query(query, (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    });
  }
}

export default Game;
