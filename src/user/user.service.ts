import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
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

  create(createUserDto: CreateUserDto, res:Response) {
    try {
      const doc = new PDFDocument();
      // PDF yaratish uchun kerakli kod
      // JSON ma'lumotlarini PDFga qo'shish
      doc.fontSize(12).text(JSON.stringify(createUserDto, null, 2));
      // PDF faylini yaratish
      doc.pipe(createWriteStream('output.pdf'));
      doc.end();
      // PDF faylini javob sifatida qaytarish
      res.download('output.pdf');
      console.log("fayle", res.download('output.pdf'));
      
    } catch (error) {
      console.log("---", error);
      
      // res.json({ error: 'Failed to convert JSON to PDF' });
    }
  
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
