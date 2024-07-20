import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Comment } from './models/comment.model';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { selfAdminGuard } from '../guards/selfAdmin.guard';
import { selfClientGuard } from '../guards/selfClient.guard';
import { AdminGuard } from '../guards/admin.guard';

@ApiTags('Comments')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  
  @ApiOperation({ summary: 'Create comment' })
  @ApiResponse({ status: 201, type: Comment })
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  @Post('create')
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto);
  }

  
  @ApiOperation({ summary: 'All Comment' })
  @ApiResponse({ status: 200, type: Comment })
  @Get('all')
  findAll() {
    return this.commentService.findAll();
  }

   
  @ApiOperation({ summary: 'update by admin' })
  @ApiResponse({ status: 202, type: Comment })
  @UseGuards(AdminGuard)
  @Get('status/:id')
  updateStatus(@Param('id') id: string ) {
    return this.commentService.updateCommentByAdmin(+id);
  }
  
  @ApiOperation({ summary: 'find by id' })
  @ApiResponse({ status: 200, type: Comment })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentService.findOneComment(+id);
  }

   

  @ApiOperation({ summary: 'yourself update by id' })
  @ApiResponse({ status: 202, type: Comment })
  @UseGuards(selfClientGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.updateComment(+id, updateCommentDto);
  }


  
  @ApiOperation({ summary: 'remove by id' })
  @ApiResponse({ status: 200, type: Number })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentService.removeComment(+id);
  }
}
