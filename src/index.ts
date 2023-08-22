import { AppDataSource } from "./data-source";
import * as express from "express";
import { Request, Response } from "express";
import { MainRouter } from "./routes";

import * as cors from "cors";
import "dotenv/config";
import errorMiddleware from "./middlewares/error";

AppDataSource.initialize()
  .then(async () => {
    const app = express();
    const port = process.env.SERVER_PORT;
    app.use(cors());
    app.use(express.json());
    app.use("/api/v1", new MainRouter().getRouter());

    app.get("/", (req: Request, res: Response) => {
      res.json({
        message: "Hello World! 😉",
      });
    });

    app.use((req, res, next) => {
      res.status(404).json({
        message: 'API Not Found'
      })
    })

    app.use(errorMiddleware)
  
    app.listen(port, () => {
      console.log("Server running in port " + port);
    });
  })
  .catch((error) => console.log(error));
