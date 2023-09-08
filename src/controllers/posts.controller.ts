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

  async find(_req: Request, res: Response, next: NextFunction) {
    try {
      const response = await PostsService.find();

      responseHandler(res, response)
    } catch (error) {
      next(error)
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id
      const body = req.body

      const response = await PostsService.update(id, body);

      responseHandler(res, response)
    } catch (error) {
      next(error)
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id
      const response = await PostsService.delete(id);
      responseHandler(res, response)
    } catch (error) {
      next(error)
    }
  }
}

export default new PostController();
