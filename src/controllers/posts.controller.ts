import PostsService from "../services/posts.service";
import { NextFunction, Request, Response } from "express";
import { responseHandler } from "../utils/handler";
import { UpdatePostsDto } from "dto/posts/update.posts.dto";
import { IQuery } from "interfaces/iquery.interface";

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

  async find(req: Request, res: Response, next: NextFunction) {
    try {
      const query = req.query as unknown as IQuery
      const response = await PostsService.find(query);
      responseHandler(res, response)
    } catch (error) {
      next(error)
    }
  }

  async findAllConnection(req: Request, res: Response, next: NextFunction) {
    try {
      const query = req.query as unknown as IQuery
      const response = await PostsService.findAllConnection(query);
      responseHandler(res, response)
    } catch (error) {
      next(error)
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id
      const body = req.body as unknown as UpdatePostsDto

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
