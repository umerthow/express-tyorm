import { AppDataSource } from "../data-source";
import { Post } from "../entities/post.entity";
import { Repository } from "typeorm";
import { CreatePostsDto } from "dto/posts/create.posts.dto";
import { Paginate } from "interfaces/icommon.interface";
import { filtering } from "../utils/filtering";
import { UpdatePostsDto } from "dto/posts/update.posts.dto";
import { IQuery } from "interfaces/iquery.interface";

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

  async find(query: IQuery): Promise<any> {
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
    const response = await this.postsRepository.find({
      select,
      where: {
        ...where
       }, order: { title: "DESC" },
      take: take,
      skip: skip,
      relations:['createdBy', 'updatedBy']
    });

    return response;
  }

  async findAllConnection(query: IQuery): Promise<Paginate> {
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
         }, order: { id: "DESC" },
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

  async update(id: string, body: UpdatePostsDto) {
    const getPost = await this.postsRepository.findOneBy({ id })
    
    if (!getPost) {
      throw new Error('posts_not_found')
    }

    await this.postsRepository.update({ id }, body)

    const response = await this.postsRepository.findOneBy({ id })

    return response

  }

  async delete(id: string): Promise<any> { 
    const getPost = await this.postsRepository.findOneBy({ id })

      if (!getPost) {
        throw new Error('posts_not_found')
      }

      const response = await this.postsRepository.delete({ id })
      
      return response;
  }
}

export default new PostsService()