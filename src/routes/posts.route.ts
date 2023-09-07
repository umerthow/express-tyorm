import PostsController from "../controllers/posts.controller";
import * as express from "express";

const postsRoute = express.Router()

postsRoute.post("/", PostsController.create)

export default postsRoute;
