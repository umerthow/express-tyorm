import { AppDataSource } from "./data-source";
import * as express from "express";
import { Request, Response } from "express";
import router from "./routes";

import * as cors from "cors";
import "dotenv/config";
import routerV1 from "./routes/v1";

AppDataSource.initialize()
  .then(async () => {
    const app = express();
    const port = process.env.SERVER_PORT;
    app.use(cors());
    app.use(express.json());
    app.use("/api/v1", router);
    app.use("/api/v1", routerV1);
    app.get("/", (req: Request, res: Response) => {
      res.json({
        message: "Hello World! 😉",
      });
    });
    app.listen(port, () => {
      console.log("Server running in port " + port);
    });
  })
  .catch((error) => console.log(error));
