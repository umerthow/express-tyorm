import PostsService from "../services/posts.service";
import { NextFunction, Request, Response } from "express";
import { responseHandler } from "../utils/handler";

class PostController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body
      const response = await PostsService.create(body);
      responseHandler(res, response)
    } catch (error) {
      next(error)
    }
  }
}

export default new PostController();
