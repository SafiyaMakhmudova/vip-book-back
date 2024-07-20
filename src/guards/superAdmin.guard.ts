import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Admin } from '../admin/models/admin.model';

@Injectable()
export class SuperAdminGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new HttpException('Unauthorized user', HttpStatus.UNAUTHORIZED);
    }

    const bearer = authHeader.split(' ')[0];
    const token = authHeader.split(' ')[1];
    if (bearer != 'Bearer' || !token) {
      throw new HttpException('Unauthorized user', HttpStatus.UNAUTHORIZED);
    }

    async function verify(token: string, jwtService: JwtService) {
      const admin: Partial<Admin> = await jwtService.verify(token, {
        secret: process.env.ACCESS_TOKEN_KEY,
      });

      if (!admin) {
        throw new HttpException('Invalid token provided', HttpStatus.UNAUTHORIZED);
      }
      if (!admin.is_active) {
        throw new HttpException('Admin is not active', HttpStatus.BAD_REQUEST);
      }
      if (admin.role!=='SuperAdmin') {
        throw new HttpException('Unauthorized user', HttpStatus.UNAUTHORIZED);
      }
      return true;
    }

    return verify(token, this.jwtService);
  }
}
