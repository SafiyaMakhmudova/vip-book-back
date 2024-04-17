import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './models/user.model';


@ApiTags("User")
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  
  @ApiOperation({ summary: 'Create User' })
  @ApiResponse({
    status: 201,
    type: User,
  })
  @Post('create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiOperation({ summary: 'View all User' })
  @ApiResponse({
    status: 200,
    description: 'List of User',
    type: [User],
  })
  @Get('all')
  findAll() {
    return this.userService.findAll();
  }

  
  @ApiOperation({ summary: 'Find by id' })
  @ApiResponse({
    status: 200,
    type: User,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  
  @ApiOperation({ summary: 'update by yourself' })
  @ApiResponse({
    status: 202,
    type: User,
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

}
