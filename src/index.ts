import express, { Request, Response } from "express";
import cors from "cors";
import User from "./models/User";

const app = express();

const PORT = 5000;

app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.static("public"));

const bruno = new User({
  name: "Bruno",
  email: "bruno7240@gmail.com",
  image: "/",
  password: "1234",
  phone: "19983503751",
});
bruno.insert()
app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
