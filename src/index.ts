import express, { Request, Response } from "express";
import cors from "cors";
import User from "./models/User";
import Game from "./models/Game";

const app = express();

const PORT = 5000;

app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.static("public"));

User.getUserByEmail("bruno7240@gmail.com").then((res) => {
  const game = new Game({
    name: "Ghost of Tsushima",
    description: "Um jogo bacana",
    platform: "Playstation",
    price: 80.0,
    sellerId: res.id,
    available: true,
  });
  game.insert();
});
app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
