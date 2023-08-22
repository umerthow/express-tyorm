
import { Router } from "express";
import authRoute from "./auth.route";
import userRoute from "./users.route";

export class MainRouter {
  private route = Router()

  getRouter() {
    this.route.use('/auths', authRoute)
    this.route.use('/users', userRoute)

    return this.route
  }
}
