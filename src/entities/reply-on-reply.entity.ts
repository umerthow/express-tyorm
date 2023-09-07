import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Reply } from "./reply.entity";

@Entity("reply_on_reply")
export class ReplyOnReply {
  @PrimaryGeneratedColumn("uuid")
  replyId!: string;

  @ManyToOne(() => Reply, (reply) => reply.replies)
  @JoinColumn({ name: "replyId" })
  reply!: Reply;
}
