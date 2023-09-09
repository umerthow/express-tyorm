import PostsController from "../controllers/posts.controller";
import * as express from "express";
import { validateBody } from "../middlewares/validateBody";
import { CreatePostsDto } from "../dto/posts/create.posts.dto";
import { UpdatePostsDto } from "../dto/posts/update.posts.dto";

const postsRoute = express.Router()

postsRoute.post("/", validateBody(CreatePostsDto), PostsController.create)
postsRoute.get("/", PostsController.find)
postsRoute.get("/connection", PostsController.findAllConnection)
postsRoute.patch("/:id", validateBody(UpdatePostsDto), PostsController.update);
postsRoute.delete("/:id", PostsController.delete);

export default postsRoute;
