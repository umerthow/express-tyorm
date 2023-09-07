import * as express from "express";
import UsersController from "../controllers/users.controller";
import { CreateUserDto } from "../dto/user/create.user.dto";
import { BulkDeleteUserDto } from "../dto/user/delete.user.dto";
import { validateBody } from "../middlewares/validateBody";

const userRoute = express.Router();

userRoute.get("/", UsersController.find);
userRoute.get("/connection", UsersController.findAllConnection);
userRoute.post("/", validateBody(CreateUserDto), UsersController.create);
userRoute.post("/many", UsersController.bulkCreate);
userRoute.patch("/:id", UsersController.update);
userRoute.delete("/many", validateBody(BulkDeleteUserDto), UsersController.bulkDelete);
userRoute.delete("/:id", UsersController.delete);


export default userRoute;
