import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Post } from "./post.entity";
import { Follows } from "./follow.entity";
import { Profile } from "./profile.entity";
import { Reply } from "./reply.entity";
import { Role } from "./role.entity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  name!: string;

  @Column()
  password!: string;

  @ManyToMany(() => Role)
  @JoinTable()
  roles!: Role[];

  @OneToOne(() => Profile, (profile) => profile.user)
  profile!: Profile;

  @OneToMany(() => Follows, (follows) => follows.follower)
  followedBy!: Follows[];

  @OneToMany(() => Follows, (follows) => follows.following)
  following!: Follows[];

  @OneToMany(() => Post, (post) => post.createdBy)
  posts!: Post[];

  @OneToMany(() => Post, (post) => post.updatedBy)
  updatedPosts!: Post[];

  @OneToMany(() => Reply, (reply) => reply.createdBy)
  replies!: Reply[];

  @OneToMany(() => Reply, (reply) => reply.updatedBy)
  updatedReplies!: Reply[];

  @Column({ default: () => "now()" })
  createdAt!: Date;

  @Column({ default: () => "now()", onUpdate: "now()" })
  updatedAt!: Date;
}
