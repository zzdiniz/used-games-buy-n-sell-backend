import { OkPacket } from "mysql";
import conn from "../db/conn";

interface GameData {
  readonly id?: number;
  name: string;
  description: string;
  platform: "Playstation" | "Xbox" | "Nintendo";
  price: number;
  sellerId: number;
  buyerId?: number;
  available: boolean;
  images?: Array<String>;
  readonly created_at?: Date;
  readonly updated_at?: Date;
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

  static async getAll(): Promise<GameData> {
    const query = `SELECT * FROM Games WHERE available=1 ORDER BY updated_at DESC`;

    return new Promise((resolve, reject) => {
      conn.query(query, (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    });
  }

  static async getUserGames(userId:number): Promise<GameData> {
    const query = `SELECT * FROM Games WHERE sellerId=${userId} ORDER BY updated_at DESC`;

    return new Promise((resolve, reject) => {
      conn.query(query, (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    });
  }

  static async getUserPurchases(userId:number): Promise<GameData> {
    const query = `SELECT * FROM Games WHERE buyerId=${userId} ORDER BY updated_at DESC`;

    return new Promise((resolve, reject) => {
      conn.query(query, (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    });
  }
  
  static async getGameById(gameId:number): Promise<GameData> {
    const query = `SELECT * FROM Games WHERE id=${gameId}`;

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
