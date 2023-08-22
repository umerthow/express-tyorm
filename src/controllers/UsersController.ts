import { Request, Response } from "express";
import { BulkDeleteUserDto } from "../dto/user/delete.user.dto";
import UserService from "../services/UsersService";

class UserController {
  async find(req: Request, res: Response) {
    try {
      const response = await UserService.find();
      return res.status(200).json(response);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Something went wrong on the server!" });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const body = req.body
      const response = await UserService.create(body);
      return res.status(200).json(response);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Something went wrong on the server!" });
    }
  }

  async bulkCreate(req: Request, res: Response) {
    try {
      const body = req.body
      const response = await UserService.bulkCreate(body);
      return res.status(200).json(response);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Something went wrong on the server!" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = req.params.id
      const body = req.body
      const response = await UserService.update(id, body);
      return res.status(200).json(response);
    } catch (error) {
      return res
        .status(500)
        .json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = req.params.id
      const response = await UserService.delete(id);
      return res.status(200).json(response);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Something went wrong on the server!" });
    }
  }

  async bulkDelete(req: Request, res: Response) {
    try {
      const body: BulkDeleteUserDto = req.body
      const response = await UserService.bulkDelete(body);
      return res.status(200).json(response);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Something went wrong on the server!" });
    }
  }
}

export default new UserController();
