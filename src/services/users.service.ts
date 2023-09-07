import { In, Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { CreateUserDto } from "../dto/user/create.user.dto";
import { BulkDeleteUserDto } from "../dto/user/delete.user.dto";
import { Profile } from "../entities/profile.entity";
import { User } from "../entities/user.entity.";
import { Paginate } from "interfaces/icommon.interface";
import { filtering } from "../utils/filtering";
import { RoleEnum } from "../utils/roles";
import { passwordHash } from "../utils/transform";

class UsersService {
  private readonly userRepository: Repository<User> = AppDataSource.getRepository(User);
  private readonly profileRepository: Repository<Profile> = AppDataSource.getRepository(Profile)
 
  async find(): Promise<any> {
    try {
      const response = await this.userRepository.find({
        relations: ['profile']
      });
      return response;
    } catch (err) {
      console.log(err);
      throw new Error("Something went wrong on the server!");
    }
  }

  async findAllConnection(query: Record<string, any>): Promise<Paginate> {
    try {
      const take = query.take || 10
      const skip = query.skip || 0
      const select = query.select
      const filter = filtering(query)

      let where: Record<string, any> = {}

      if (filter) {
        where = { 
          ...where,
          ...filter
        }
      }

      const response = await this.userRepository.findAndCount({
        select,
        where: {
          ...where
         }, order: { name: "DESC" },
        take: take,
        skip: skip
      });
      
      const [data, count] = response
      
      return {
        data,
        count,
        skip,
        take
      };
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
        password: passwordHash(body.password),
      }

      let userId: string

      try {
        const response = await this.userRepository.save(payload);
        await this.profileRepository.save({
          address: '',
          userId: response.id
        })
        userId = response.id
      } catch (error) {
        console.log(error);
        throw error
      }

      const getUser = this.userRepository.find(
        {
         where: {
           id: userId
         },
         relations: ['profile']
        }
       )
      
      
       return getUser;
     
    } catch (err) {
      console.log(err);
      throw new Error("Something went wrong on the server!");
    }
    
  }

  async bulkCreate(body: CreateUserDto[]): Promise<any> {
    try {
      const payload: CreateUserDto[] = body.map(item => {
        return {
          role: item.role || RoleEnum.USER,
          email: item.email,
          name: item.name,
          password: passwordHash(item.password)
        }
      })

      const response = await this.userRepository.createQueryBuilder()
        .insert()
        .into(User)
        .values(payload)
        .execute()

      const returnIds = response?.generatedMaps.map(item => item.id)
      const getDataAffected = await this.userRepository.find(
       {
        where: {
          id: In(returnIds)
        }
       }
      )

      return getDataAffected

    } catch (err) {
      throw new Error("Something went wrong on the server!");
    }
    
  }

  async update(id: string, body: CreateUserDto): Promise<any> {
    try {

      const getUser = await this.userRepository.findOneBy({ id })

      if (!getUser) {
        throw new Error('user_not_found')
      }

      await this.userRepository.update({ id }, body)

      const response = await this.userRepository.findOneBy({ id })
      
      return response;
    } catch (err) {
      console.error(err);
      throw new Error("Something went wrong on the server!");
    }
    
  }

  async delete(id: string): Promise<any> {
    try {

      const getUser = await this.userRepository.findOneBy({ id })

      if (!getUser) {
        throw new Error('user_not_found')
      }

      const response = await this.userRepository.delete({ id })
      
      return response;
    } catch (err) {
      throw new Error("Something went wrong on the server!");
    }
    
  }

  async bulkDelete(datas: BulkDeleteUserDto): Promise<any> {
    try {

      const ids = datas.where.map(item => item.id)
      const getDataAffected = await this.userRepository.find(
        {
         where: {
           id: In(ids)
         }
        }
       )
 
      await this.userRepository.delete({ id: In(ids) })
      
      return getDataAffected;
    } catch (err) {
      throw new Error("Something went wrong on the server!");
    }
    
  }
}

export default new UsersService();
