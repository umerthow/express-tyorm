import { Request, Response } from "express";
import AuthService from "../services/auth.service";

class AuthController {
  async login(req: Request, res: Response) {
    try {
      const response = await AuthService.login(req.body);
      return res.status(200).json(response);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Something went wrong on the server!" });
    }
  }

  async register(req: Request, res: Response) {
    try {
      const response = await AuthService.register(req.body);
      return res.status(200).json(response);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Something went wrong on the server!" });
    }
  }
}

export default new AuthController();
