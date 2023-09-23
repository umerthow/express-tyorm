import { AppDataSource } from "../data-source"
import { CreateReplyDto } from "../dto/reply/create.reply.dto"
import { Reply } from "../entities/reply.entity"
import { Repository } from "typeorm"
import { IQuery } from "interfaces/iquery.interface"
import { filtering } from "../utils/filtering"
import { Paginate } from "interfaces/icommon.interface"
import { UpdateReplyDto } from "dto/reply/update.reply.dto"

class ReplyService {
private readonly replyRepository: Repository<Reply> = AppDataSource.getRepository(Reply)

  async create(body: CreateReplyDto): Promise<any> {
    const payload: CreateReplyDto = {
      content: body.content,
      postId: body.postId,
    }

    const response = await this.replyRepository.save(payload)
    
    const getData = await this.replyRepository.find({
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
    const response = await this.replyRepository.find({
      select,
      where: {
        ...where
       }, order: { id: "DESC" },
      take: take,
      skip: skip,
      relations:['createdBy', 'updatedBy', 'post']
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
      
      const response = await this.replyRepository.findAndCount({
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

  async update(id: string, body: UpdateReplyDto) {
    const getReply = await this.replyRepository.findOneBy({ id })
    
    if (!getReply) {
      throw new Error('reply_not_found')
    }

    await this.replyRepository.update({ id }, body)

    const response = await this.replyRepository.findOneBy({ id })

    return response

  }

  async delete(id: string): Promise<any> { 
    const getReply = await this.replyRepository.findOneBy({ id })

      if (!getReply) {
        throw new Error('reply_not_found')
      }

      const response = await this.replyRepository.delete({ id })
      
      return response;
  }
}

export default new ReplyService()