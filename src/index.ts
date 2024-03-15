import express, { Request, Response } from "express";
import cors from "cors";
import User from "./models/User";
import Game from "./models/Game";
import UserRoutes from "./routes/UserRoutes"

const app = express();

const PORT = 3000;

app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:5000" }));
app.use(express.static("public"));
app.use('/users',UserRoutes)

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
