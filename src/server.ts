import "reflect-metadata";
import express, { request, response } from "express";
import { router } from "./routes";

import "./database";

//@types/express
const app = express();

app.use(express.json());//usar json para receber

app.use(router);//inserir rotas no express (no projeto)

// http://localhost:3000
app.listen(3000, () => console.log("Server is running"))