import { UpdateReplyDto } from "dto/reply/update.reply.dto";
import { NextFunction, Request, Response } from "express";
import { IQuery } from "interfaces/iquery.interface";
import ReplyService from "../services/reply.service";
import { responseHandler } from "../utils/handler";

class ReplyController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body
      const response = await ReplyService.create(body);
      
      responseHandler(res, response)
    } catch (error) {
      next(error)
    }
  }

  async find(req: Request, res: Response, next: NextFunction) {
    try {
      const query = req.query as unknown as IQuery
      const response = await ReplyService.find(query);
      responseHandler(res, response)
    } catch (error) {
      next(error)
    }
  }

  async findAllConnection(req: Request, res: Response, next: NextFunction) {
    try {
      const query = req.query as unknown as IQuery
      const response = await ReplyService.findAllConnection(query);
      responseHandler(res, response)
    } catch (error) {
      next(error)
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id
      const body = req.body as unknown as UpdateReplyDto

      const response = await ReplyService.update(id, body);

      responseHandler(res, response)
    } catch (error) {
      next(error)
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id
      const response = await ReplyService.delete(id);
      responseHandler(res, response)
    } catch (error) {
      next(error)
    }
  }
}

export default new ReplyController();
