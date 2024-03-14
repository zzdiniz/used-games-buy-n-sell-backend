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
    images: ['https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.atogames.com.br%2Fghost-of-tsushima-ps4%2F&psig=AOvVaw30tS3XoQDc5da-LaaK6V6v&ust=1710526069380000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCNCu_aes9IQDFQAAAAAdAAAAABAE']
  });
  game.insert();
});
app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
