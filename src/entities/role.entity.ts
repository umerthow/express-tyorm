import { Column, Entity, ManyToMany } from "typeorm";
import { User } from "./user.entity.";

@Entity("roles")
export class Role {
  @Column({ length: 20, primary: true })
  id!: string;

  @Column()
  name!: string;

  @ManyToMany(() => User, (user) => user.roles)
  users!: User[];
}
