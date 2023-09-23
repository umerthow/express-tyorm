
import { Router } from "express";
import authRoute from "./auth.route";
import postsRoute from "./posts.route";
import replyRoute from "./reply.routes";
import userRoute from "./users.route";

export class MainRouter {
  private route = Router()

  getRouter() {
    this.route.use('/auths', authRoute)
    this.route.use('/users', userRoute)
    this.route.use('/posts', postsRoute)
    this.route.use('/reply', replyRoute)
    
    return this.route
  }
}
