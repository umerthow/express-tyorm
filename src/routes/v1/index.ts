import * as express from "express";
import UsersController from "../../controllers/UsersController";
import { CreateUserDto } from "../../dto/user/create.user.dto";
import { validateBody } from "../../middlewares/validateBody";


const routerV1 = express.Router();

routerV1.get("/users", UsersController.find);
routerV1.post("/users",
  validateBody(CreateUserDto),
  UsersController.create);

export default routerV1;
