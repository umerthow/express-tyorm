import { AppDataSource } from "../data-source";
import { Post } from "../entities/post.entity";
import { Repository } from "typeorm";
import { CreatePostsDto } from "dto/user/create.posts.dto";

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
}

export default new PostsService()