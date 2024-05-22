import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/sequelize';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './models/user.model';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import * as PDFDocument from 'pdfkit';
import { createWriteStream } from 'fs';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userRepo: typeof User,
    private readonly jwtService: JwtService,
  ) {}

  async getTokens(user: User) {
    const jwtPayload = {
      id: user.id,
      is_active: user.is_active,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async create(createUserDto: CreateUserDto, res:Response) {
    const user = await this.userRepo.findOne({
      where: { phone_number: createUserDto.phone_number },
    });
    console.log("---", user);
    
    if (user) {
      throw new BadRequestException('Phone number already exists!');
    }

    const newUser = await this.userRepo.create(createUserDto)
    const token = await this.getTokens(newUser);

    const hashed_refresh_token = await bcrypt.hash(token.refresh_token, 7);

    const updateUser = await this.userRepo.update(
      {
        hashed_refresh_token: hashed_refresh_token,
      },
      { where: { id: newUser.id }, returning: true },
    );

    res.cookie('refresh_token', token.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 100,
      httpOnly: true,
    });

    const response = {
      status: 201,
      token,
      updateUser
    };

    return response;
  
  }

  findAll() {
    return this.userRepo.findAll();
  }

  async findOne(id: number) {
    const user = await this.userRepo.findByPk(id);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepo.update(updateUserDto, {
      where: { id },
      returning: true,
    });
    if (!user) {
      throw new BadRequestException('User not found');
    }

    return user;
  }

  async remove(id: number) {
    const user = await this.userRepo.findByPk(id);
    if (!user) {
      throw new BadRequestException('User not found');
    }


    return await this.userRepo.destroy({where:{id}});
  }
}
