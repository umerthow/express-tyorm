import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./user.entity.";
import { Post } from "./post.entity";
import { ReplyOnReply } from "./reply-on-reply.entity";

@Entity("replies")
export class Reply {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  content!: string;

  @ManyToOne(() => Post, (post) => post.replies)
  @JoinColumn({ name: "postId" })
  post!: Post;

  @OneToMany(() => ReplyOnReply, (replyOnReply) => replyOnReply.reply)
  replies!: ReplyOnReply[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne(() => User, (user) => user.replies)
  @JoinColumn({ name: "createdById" })
  createdBy!: User;

  @Column({ nullable: true })
  createdById!: string;

  @ManyToOne(() => User, (user) => user.updatedReplies)
  @JoinColumn({ name: "updatedById" })
  updatedBy!: User;

  @Column({ nullable: true })
  updatedById!: string;
}
