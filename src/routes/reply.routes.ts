import * as express from "express";

import { UpdateReplyDto } from "../dto/reply/update.reply.dto";
import ReplyController from "../controllers/reply.controller";
import { CreateReplyDto } from "../dto/reply/create.reply.dto";
import { validateBody } from "../middlewares/validateBody";

const replyRoute = express.Router()

replyRoute.post("/", validateBody(CreateReplyDto), ReplyController.create)
replyRoute.get("/", ReplyController.find)
replyRoute.get("/connection", ReplyController.findAllConnection)
replyRoute.patch("/:id", validateBody(UpdateReplyDto), ReplyController.update);
replyRoute.delete("/:id", ReplyController.delete);


export default replyRoute;
