import { AppDataSource } from "../data-source";
import { Post } from "../entities/post.entity";
import { Repository } from "typeorm";
import { CreatePostsDto } from "dto/user/create.posts.dto";
import { Paginate } from "interfaces/icommon.interface";
import { filtering } from "../utils/filtering";

class PostsService {
  private readonly postsRepository: Repository<Post> = AppDataSource.getRepository(Post)
  
  async create(body: CreatePostsDto): Promise<any> {
    const payload: CreatePostsDto = {
      title: body.title,
      content: body.content,
      createdById: body.createdById,
      updatedById: body.createdById
    }

    const response = await this.postsRepository.save(payload)
    
    const getData = await this.postsRepository.find({
      where: {
        createdById: response.createdById
      },
      relations:['createdBy', 'updatedBy']
    })


    return getData;
  }

  async find(): Promise<any> {
    const response = await this.postsRepository.find({
      relations:['createdBy', 'updatedBy']
    });

    return response;
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

      const response = await this.postsRepository.findAndCount({
        select,
        where: {
          ...where
         }, order: { title: "DESC" },
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

    } catch (error) {
      throw new Error("Something went wrong on the server!");
    }
  }
}

export default new PostsService()