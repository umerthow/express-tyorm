import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Role } from "../entities/role.entity";
import { User } from "../entities/user.entity.";
import { RoleEnum } from "../utils/roles";

class AuthService {
  private readonly authRepository: Repository<User> =
    AppDataSource.getRepository(User);

  private readonly roleRepository: Repository<Role> =
    AppDataSource.getRepository(Role);

  async login(loginData: any): Promise<any> {
    try {
      let user = await this.authRepository.findOne({
        where: {
          email: loginData.email,
        },
      });

      console.log("data user", user);

      if (!user) {
        throw new Error("Email / password is wrong!");
      }

      const isPasswordValid = await bcrypt.compare(
        loginData.password,
        user.password
      );

      if (!isPasswordValid) {
        throw new Error("Email / password is wrong!");
      }

      const secretKey = process.env.JWT_SECRET as jwt.Secret
      const token = jwt.sign(
        {
          user: {
            email: user.email,
            name: user.name,
            roles: user.roles,
            profile: user.profile,
          },
        },
        secretKey,
        { expiresIn: "1h" }
      );

      return {
        message: "Login successful!",
        user: {
          email: user.email,
          name: user.name,
          roles: user.roles,
          profile: user.profile,
        },
        token: token,
      };
    } catch (err) {
      throw new Error("Something went wrong on the server!");
    }
  }

  async register(userData: any): Promise<any> {
    try {
      const isEmailRegistered = await this.authRepository.count({
        where: {
          email: userData.email,
        },
      });

      if (isEmailRegistered > 0) {
        throw new Error("Email is already registered!");
      }

      const password = await bcrypt.hash(userData.password, 10);

      const role = await this.roleRepository.findOne({
        where: {
          name: RoleEnum.USER,
        },
        select: ["id"],
      });

      const user = this.authRepository.create({
        email: userData.email,
        name: userData.name,
        password: password,
        roles: [{ id: role?.id }],
        profile: { address: "" },
      });

      await this.authRepository.save(user);

      return {
        message: "Registration successful!",
        user: user,
      };
    } catch (err) {
      console.log(err);
      throw new Error("Something went wrong on the server!");
    }
  }
}

export default new AuthService();
