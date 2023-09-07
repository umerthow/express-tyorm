import { NextFunction, Request, Response } from "express";
import { BulkDeleteUserDto } from "../dto/user/delete.user.dto";
import UserService from "../services/users.service";
import { responseHandler } from "../utils/handler";

class UserController {
  async find(_req: Request, res: Response, next: NextFunction) {
    try {
      const response = await UserService.find();
      
      responseHandler(res, response)
    } catch (error) {
      next(error)
    }
  }

  async findAllConnection(req: Request, res: Response, next: NextFunction) {
    try {
      const query = req.query
      const response = await UserService.findAllConnection(query);
      responseHandler(res, response)
    } catch (error) {
      next(error)
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body
      const response = await UserService.create(body);
      responseHandler(res, response)
    } catch (error) {
      next(error)
    }
  }

  async bulkCreate(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body
      const response = await UserService.bulkCreate(body);
      responseHandler(res, response)
    } catch (error) {
      next(error)
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id
      const body = req.body
      const response = await UserService.update(id, body);
      responseHandler(res, response)
    } catch (error) {
      next(error)
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id
      const response = await UserService.delete(id);
      responseHandler(res, response)
    } catch (error) {
      next(error)
    }
  }

  async bulkDelete(req: Request, res: Response, next: NextFunction) {
    try {
      const body: BulkDeleteUserDto = req.body
      const response = await UserService.bulkDelete(body);
      responseHandler(res, response)
    } catch (error) {
      next(error)
    }
  }
}

export default new UserController();
