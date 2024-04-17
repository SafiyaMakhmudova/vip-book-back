import { BadRequestException, ForbiddenException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';

import { CreateAdminDto } from './dto/create-admin.dto';
import { Admin } from './models/admin.model';
import { LoginAdminDto } from './dto/login-admin.dto';
import { UpdateAdminYourselfDto } from './dto/update-admin-yourself.dto';
import { UpdateAdminDto } from './dto/update-admin.dto copy';


@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin) private readonly adminRepo:typeof Admin, 
  private readonly jwtService:JwtService,
  ){}


  async getTokens(admin: Admin) {
    const jwtPlayload = {
      id: admin.id,
      is_active: admin.is_active,
      role: admin.role,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPlayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(jwtPlayload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async registration(createAdminDto: CreateAdminDto, res: Response) {
    const admin = await this.adminRepo.findOne({
      where: { email: createAdminDto.email },
    });

    if (admin) {
      throw new BadRequestException('Email already exists!');
    }

    if (createAdminDto.password !== createAdminDto.confirim_password) {
      throw new BadRequestException('Password is not match');
    }

    const hashed_password = await bcrypt.hash(createAdminDto.password, 7);
    const newAdmin = await this.adminRepo.create({
      ...createAdminDto,
      password: hashed_password,
    });
    const token = await this.getTokens(newAdmin);

    const hashed_refresh_token = await bcrypt.hash(token.refresh_token, 7);

    const updateAdmin = await this.adminRepo.update(
      {
        hashed_refresh_token: hashed_refresh_token,
      },
      { where: { id: newAdmin.id }, returning: true },
    );

    res.cookie('refresh_token', token.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 100,
      httpOnly: true,
    });

    const response = {
      status: 201,
      message: 'Admin registered',
      token,
    };

    return response;
  }

  async login(loginadminDto: LoginAdminDto, res: Response) {
    const { email, password } = loginadminDto;
    const admin = await this.adminRepo.findOne({ where: { email } });

    if (!admin) {
      throw new UnauthorizedException('Admin not registered');
    }

    if (!admin.is_active) {
      throw new BadRequestException('Admin is not active');
    }

    const isMatchPass = await bcrypt.compare(password, admin.password);

    if (!isMatchPass) {
      throw new UnauthorizedException('Admin not registered(pass)');
    }

    const tokens = await this.getTokens(admin);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);

    const updatedAdmin = await this.adminRepo.update(
      {
        hashed_refresh_token: hashed_refresh_token,
      },
      { where: { id: admin.id }, returning: true },
    );

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 100,
      httpOnly: true,
    });

    const adminWithoutPassword = {
      id: updatedAdmin[1][0].id,
      full_name: updatedAdmin[1][0].full_name,
      email: updatedAdmin[1][0].email,
      address: updatedAdmin[1][0].address,
      phone_number: updatedAdmin[1][0].phone_number,
      role: updatedAdmin[1][0].role,
      is_active: updatedAdmin[1][0].is_active,
      hashed_refresh_token: updatedAdmin[1][0].hashed_refresh_token,
      createdAt: updatedAdmin[1][0].createdAt,
      updatedAt: updatedAdmin[1][0].updatedAt
    };

    const response = {
      message: 'Admin logged in',
      user: adminWithoutPassword,
      tokens,
    };

    return response;
  }

  async logout(refreshToken: string, res: Response) {
    const AdminData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });

    if (!AdminData) {
      throw new ForbiddenException('Admin not found');
    }

    const updatedAdmin = await this.adminRepo.update(
      { hashed_refresh_token: null },
      { where: { id: AdminData.id }, returning: true },
    );

    res.clearCookie('refresh_token');
    const response = {
      message: 'Admin logged out successfully',
      user: updatedAdmin[1][0],
    };

    return response;
  }

  async findAllAdmin( limit:number, skip:number): Promise<Object> {
    const admins = await this.adminRepo.findAll({order:[['createdAt', 'DESC']]});

    if (admins.length === 0) {
      return {
        message: 'Admin Not Found',
        status: HttpStatus.NOT_FOUND,
      };
    }

    let limit_admins = [];
    if (skip === 1 || skip < 1) {
      let num = 0;
      for (let index = num; index < num + limit; index++) {
        if (admins[index] === undefined) break;

        limit_admins.push(admins[index]);
      }
    } else {
      let num = (skip - 1) *limit;
      for (let index = num; index < num +limit; index++) {
        if (admins[index] === undefined) break;

        limit_admins.push(admins[index]);
      }
    }

    if (limit_admins.length === 0)
      return {
        message: 'Admins Not Found',
        status: HttpStatus.NOT_FOUND,
      };
    
    const total  = admins.length 
 
    return {
      status: HttpStatus.OK,
      limit_admins,
      total,
    };
  }

  async SearchAdmin({ full_name, email }) {
    let where = {};

    if (full_name) {
      where['full_name'] = { [Op.like]: `%${full_name}%` };
    }

    if (email) {
      where['email'] = { [Op.like]: `%${email}%` };
    }


    const admin = await this.adminRepo.findAll({
      where,
      order: [['createdAt', 'ASC']],
    });
    if (!admin || admin.length == 0) {
      throw new BadRequestException('admin not found');
    }

    return admin;
  }

  async updateYourself(
    id: number,
    updateAdminYourselfDto: UpdateAdminYourselfDto,
  ) {
    const updatedAdmin = await this.adminRepo.update(
      { ...updateAdminYourselfDto },
      {
        where: { id },
        returning: true,
      },
    );
    if (!updatedAdmin) {
      throw new BadRequestException('Admin not found');
    }

    const adminWithoutPassword = {
      id: updatedAdmin[1][0].id,
      full_name: updatedAdmin[1][0].full_name,
      email: updatedAdmin[1][0].email,
      address: updatedAdmin[1][0].address,
      phone_number: updatedAdmin[1][0].phone_number,
      role: updatedAdmin[1][0].role,
      is_active: updatedAdmin[1][0].is_active,
      hashed_refresh_token: updatedAdmin[1][0].hashed_refresh_token,
      createdAt: updatedAdmin[1][0].createdAt,
      updatedAt: updatedAdmin[1][0].updatedAt
    };


    return adminWithoutPassword;
  }

  async updateByAdmin(id: number, updateAdminDto: UpdateAdminDto) {
    const updatedAdmin = await this.adminRepo.update(
      { ...updateAdminDto },
      {
        where: { id },
        returning: true,
      },
    );
    if (!updatedAdmin) {
      throw new BadRequestException('Admin not found');
    }

    const adminWithoutPassword = {
      id: updatedAdmin[1][0].id,
      full_name: updatedAdmin[1][0].full_name,
      email: updatedAdmin[1][0].email,
      address: updatedAdmin[1][0].address,
      phone_number: updatedAdmin[1][0].phone_number,
      role: updatedAdmin[1][0].role,
      is_active: updatedAdmin[1][0].is_active,
      hashed_refresh_token: updatedAdmin[1][0].hashed_refresh_token,
      createdAt: updatedAdmin[1][0].createdAt,
      updatedAt: updatedAdmin[1][0].updatedAt
    };

    return adminWithoutPassword;
  }

  async refreshToken(admin_id: number, refreshToken: string, res: Response) {
    const decodedToken = this.jwtService.decode(refreshToken);

    if (admin_id != decodedToken['id']) {
      throw new BadRequestException('Admin not found');
    }

    const admin = await this.adminRepo.findOne({ where: { id: admin_id } });
    if (!admin || !admin.hashed_refresh_token) {
      throw new BadRequestException('Admin not found');
    }

    const tokentMatch = await bcrypt.compare(
      refreshToken,
      admin.hashed_refresh_token,
    );
    if (!tokentMatch) {
      throw new ForbiddenException('Forbidden');
    }

    const token = await this.getTokens(admin);
    const hashed_refresh_token = await bcrypt.hash(token.refresh_token, 7);

    const updateAdmin = await this.adminRepo.update(
      {
        hashed_refresh_token: hashed_refresh_token,
      },
      { where: { id: admin.id }, returning: true },
    );

    res.cookie('refresh_token', token.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 100,
      httpOnly: true,
    });

    const response = {
      message: 'Refresh token successfully',
      user: updateAdmin[1][0],
      token,
    };

    return response;
  }

  async findByAdmin(id: number) {
    const admin = await this.adminRepo.findByPk(id);
    if (!admin) {
      throw new BadRequestException('Admin not found');
    }
    return admin;
  }


  async removeByAdmin(id: number) {
    const admin = await this.adminRepo.findByPk(id);
    if (!admin) {
      throw new NotFoundException('Admin not found');
    }
    const removeAdmin = await this.adminRepo.destroy({ where: { id } });
    const response = {
      removeAdmin,
      status: 204,
    };
    return response;
  }

}
