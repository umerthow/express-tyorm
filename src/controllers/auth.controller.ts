import { NextFunction, Request, Response } from "express";
import { responseHandler } from "../utils/handler";
import AuthService from "../services/auth.service";

class AuthController {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await AuthService.login(req.body);
      
      responseHandler(res, response)
    } catch (error) {

      console.log(error);
      return res
        .status(401)
        .json({ message: error.message });
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
