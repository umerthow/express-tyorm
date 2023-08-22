import * as express from "express";
import UsersController from "../controllers/UsersController";
import { CreateUserDto } from "../dto/user/create.user.dto";
import { validateBody } from "../middlewares/validateBody";

const userRoute = express.Router();

userRoute.get("/", UsersController.find);
userRoute.post("/", validateBody(CreateUserDto), UsersController.create);

export default userRoute;
