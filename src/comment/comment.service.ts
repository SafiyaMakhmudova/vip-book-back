import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Comment } from './models/comment.model';

@Injectable()
export class CommentService {

  constructor(@InjectModel(Comment) private commentRepo: typeof Comment){}



  async create(createCommentDto: CreateCommentDto):Promise<Comment> {
    const comment = await this.commentRepo.create(createCommentDto);
    return comment;
  }

  async findAll():Promise<Comment[]> {
    const comments = await this.commentRepo.findAll({include:{all:true}}) 
    return comments;
  }

 async findOneComment(id: number):Promise<Comment> {
  
    const comment  =  await this.commentRepo.findOne({
      include: { all: true },
      where: { id },
    });
    
    if (!comment) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return comment;
   }

 async updateComment(id: number, updateCommentDto: UpdateCommentDto):Promise<Comment> {
  const comment = await this.commentRepo.findOne({
    where: { id },
    include: { all: true },
  });
  
  if (!comment) {
    throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }

  const commentUpdated = await this.commentRepo.update(updateCommentDto, {
    where: { id },
    returning: true,
  });

  return commentUpdated[1][0];
  }

  async updateCommentByAdmin(id: number,):Promise<Comment> {
    const comment = await this.commentRepo.findOne({
      where: { id },
      include: { all: true },
    });
  
    if (!comment) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  
    const commentUpdated = await this.commentRepo.update({status:!comment.status}, {
      where: { id },
      returning: true,
    });
  
    return commentUpdated[1][0];
    }


  async removeComment(id: number):Promise<Number> {
    
    const book = await this.commentRepo.destroy({ where: { id } });
    return book;
  }
}
