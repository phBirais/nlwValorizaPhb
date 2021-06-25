import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import cors from "cors"
import { router } from "./routes";

import "./database";

//@types/express
const app = express();
/*app.use(cors({
  origin: "website especifico"
}));*/
app.use(cors());

app.use(express.json());//usar json para receber

app.use(router);//inserir rotas no express (no projeto)

//middleware para tratar os erros -> 4 parâmetros
app.use((err: Error, request: Request, response: Response, next: NextFunction) => {

  if (err instanceof Error) {
    return response.status(400).json({
      error: err.message,
    })
  }

  return response.status(500).json({
    status: "error",
    message: "Internal Server Error"
  })

})

// http://localhost:3000
app.listen(3000, () => console.log("Server is running"))