import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Res,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NUMBER } from 'sequelize';
import { LoginAdminDto } from './dto/login-admin.dto';
import { UpdateAdminYourselfDto } from './dto/update-admin-yourself.dto';
import { UpdateAdminDto } from './dto/update-admin.dto copy';
import { CookieGetter } from '../decorators/cookieGetter.decorator';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { Admin } from './models/admin.model';
import { SuperAdminGuard } from '../guards/superAdmin.guard';
import { AdminGuard } from '../guards/admin.guard';
import { selfAdminGuard } from '../guards/selfAdmin.guard';


@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiOperation({ summary: 'Register Admin' })
  @ApiResponse({ status: 201, type: Admin })
  @HttpCode(HttpStatus.CREATED)
  // @UseGuards(SuperAdminGuard)
  @Post('sign-up')
  create(
    @Body() createAdminDto: CreateAdminDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.registration(createAdminDto, res);
  }

  @ApiOperation({ summary: 'Login Admin' })
  @ApiResponse({ status: 200, type: Admin })
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  login(
    @Body() loginAdminDto: LoginAdminDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.login(loginAdminDto, res);
  }

  @ApiOperation({ summary: 'Logout Admin' })
  @ApiResponse({ status: 200, type: Admin })
  @HttpCode(HttpStatus.OK)
  @UseGuards(AdminGuard)
  @Post('signout')
  logout(
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.logout(refreshToken, res);
  }

  @ApiOperation({ summary: 'All Admin' })
  @ApiResponse({ status: 200, type: Admin })
  // @UseGuards(SuperAdminGuard)
  @Get('all')
  findAll(@Query('limit') limit: number, @Query('skip') skip: number) {
    return this.adminService.findAllAdmin(limit, skip);
  }

  @ApiOperation({ summary: 'Search Admin' })
  @ApiResponse({ status: 200, type: Admin })
  @HttpCode(HttpStatus.OK)
  // @UseGuards(SuperAdminGuard)
  @Get('search')
  findAllFilter(
    @Query('full_name') full_name?: string,
    @Query('email') email?: string,
  ) {
    return this.adminService.SearchAdmin({ full_name, email });
  }

  @ApiOperation({ summary: 'RefreshToken Admin' })
  @ApiResponse({ status: 200, type: Admin })
  @HttpCode(HttpStatus.OK)
  @Post(':id/refresh')
  refresh(
    @Param('id') id: string,
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.refreshToken(+id, refreshToken, res);
  }

  @ApiOperation({ summary: 'Update by id yourself' })
  @ApiResponse({ status: 201, type: Admin })
  @HttpCode(HttpStatus.OK)
  @UseGuards(selfAdminGuard)
  @Patch('yourself/:id')
  update(
    @Param('id') id: string,
    @Body() updateAdminYourselfDto: UpdateAdminYourselfDto,
  ) {
    return this.adminService.updateYourself(+id, updateAdminYourselfDto);
  }

  @ApiOperation({ summary: 'Update by id by Admin' })
  @ApiResponse({ status: 201, type: Admin })
  @HttpCode(HttpStatus.OK)
  // @UseGuards(SuperAdminGuard)
  @Patch('update/:id')
  updateAdmin(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.updateByAdmin(+id, updateAdminDto);
  }

  @ApiOperation({ summary: 'find One by Admin' })
  @ApiResponse({ status: 200, type: Admin })
  @HttpCode(HttpStatus.OK)
  @Get(':id/findOne')
  findOne(@Param('id') id: string) {
    return this.adminService.findByAdmin(+id);
  }

  @ApiOperation({ summary: 'delete by id by Admin' })
  @ApiResponse({ status: 200, type: NUMBER })
  @HttpCode(204)
  // @UseGuards(SuperAdminGuard)
  @Delete('remove/:id')
  remove(@Param('id') id: string) {
    return this.adminService.removeByAdmin(+id);
  }
}
