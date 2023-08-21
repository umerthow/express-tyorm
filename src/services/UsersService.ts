import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { CreateUserDto } from "../dto/user/create.user.dto";
import { User } from "../entities/User";
import { RoleEnum } from "../utils/roles";
import { passwordHash } from "../utils/transform";

class UsersService {
  private readonly userRepository: Repository<User> =
    AppDataSource.getRepository(User);

  async find(): Promise<any> {
    try {
      const response = await this.userRepository.find();
      return response;
    } catch (err) {
      throw new Error("Something went wrong on the server!");
    }
  }

  async create(body: CreateUserDto): Promise<any> {
    try {
      const payload: CreateUserDto = {
        role: body.role || RoleEnum.USER,
        email: body.email,
        name: body.name,
        password: passwordHash(body.password)
      }
      const response = await this.userRepository.save(payload);
      return response;
    } catch (err) {
      throw new Error("Something went wrong on the server!");
    }
  }
}

export default new UsersService();
