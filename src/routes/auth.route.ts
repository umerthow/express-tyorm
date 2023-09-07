import * as express from "express";
import AuthController from "../controllers/auth.controller";

const authRoute = express.Router();

authRoute.post("/login", AuthController.login);
authRoute.post("/register", AuthController.register);

export default authRoute;
