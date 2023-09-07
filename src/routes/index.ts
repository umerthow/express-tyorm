
import { Router } from "express";
import authRoute from "./auth.route";
import postsRoute from "./posts.route";
import userRoute from "./users.route";

export class MainRouter {
  private route = Router()

  getRouter() {
    this.route.use('/auths', authRoute)
    this.route.use('/users', userRoute)
    this.route.use('/posts', postsRoute)

    return this.route
  }
}
