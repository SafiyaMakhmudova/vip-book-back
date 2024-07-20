import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { Admin } from '../admin/models/admin.model';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new HttpException('Unauthorized user', HttpStatus.UNAUTHORIZED);
    }

    const bearer = authHeader.split(' ')[0];
    const token = authHeader.split(' ')[1];
    if (bearer !== 'Bearer' || !token) {
      throw new HttpException('Unauthorized user', HttpStatus.UNAUTHORIZED);
    }


    try {
      const admin: Partial<Admin> = await this.jwtService.verifyAsync(token, {
        secret: process.env.ACCESS_TOKEN_KEY,
      });

      if (!admin) {
        throw new HttpException('Invalid token provided', HttpStatus.UNAUTHORIZED);
      }
      if (!admin.is_active) {
        throw new HttpException('Admin is not active', HttpStatus.BAD_REQUEST);
      }
      return true;
    } catch (err) {
      console.log(err.message);
      
      if (err instanceof TokenExpiredError) {
        throw new HttpException('Token expired', HttpStatus.UNAUTHORIZED);
      }
      throw new HttpException('Unauthorized user', HttpStatus.UNAUTHORIZED);
    }
  }
}
