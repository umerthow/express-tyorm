import PostsController from "../controllers/posts.controller";
import * as express from "express";

const postsRoute = express.Router()

postsRoute.post("/", PostsController.create)
postsRoute.get("/", PostsController.find)
postsRoute.get("/connection", PostsController.find)
postsRoute.patch("/:id", PostsController.update);
postsRoute.delete("/:id", PostsController.delete);

export default postsRoute;
