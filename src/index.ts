import express, { Request, Response } from "express";
import cors from "cors";
import UserRoutes from "./routes/UserRoutes"
import GameRoutes from "./routes/GameRoutes"

const app = express();

const PORT = 3000;

app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.static("public"));
app.use('/users',UserRoutes)
app.use('/games',GameRoutes)

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
