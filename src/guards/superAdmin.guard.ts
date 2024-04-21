import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
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
      throw new UnauthorizedException('Admin unauthorized');
    }

    const bearer = authHeader.split(' ')[0];
    const token = authHeader.split(' ')[1];
    if (bearer != 'Bearer' || !token) {
      throw new UnauthorizedException('Admin unauthorized');
    }

    async function verify(token: string, jwtService: JwtService) {
      const admin: Partial<Admin> = await jwtService.verify(token, {
        secret: process.env.ACCESS_TOKEN_KEY,
      });

      if (!admin) {
        throw new UnauthorizedException('Invalid token provided');
      }
      if (!admin.is_active) {
        throw new BadRequestException('admin is not active');
      }
      if (admin.role!=='SuperAdmin') {
        throw new BadRequestException('This admin is not authorized');
      }
      return true;
    }

    return verify(token, this.jwtService);
  }
}
