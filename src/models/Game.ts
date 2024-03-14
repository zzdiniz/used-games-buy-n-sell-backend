import conn from "../db/conn";
interface GameData {
  name: string;
  description: string;
  platform: "Playstation" | "Xbox" | "Nintendo";
  price: number;
  sellerId: number;
  buyerId?: number;
  available: boolean;
  images: Array<String>;
}
class Game {
  private gameData: GameData;
  constructor(gameData: GameData) {
    this.gameData = gameData;
  }
  public insert() {
    const query = `INSERT INTO Games (name,description,platform,price,sellerId,available,images) VALUES ('${
      this.gameData.name
    }','${this.gameData.description}','${this.gameData.platform}','${
      this.gameData.price
    }','${this.gameData.sellerId}','${
      this.gameData.available === true ? 1 : 0
    }','${JSON.stringify(this.gameData.images)}')`;
    conn.query(query, (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
}

export default Game;
