import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/models/user.model';

@Injectable()
export class selfClientGuard implements CanActivate {
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
      const user: Partial<User> = await jwtService.verify(token, {
        secret: process.env.ACCESS_TOKEN_KEY,
      });

      if (!user) {
      throw new HttpException('Unauthorized user', HttpStatus.UNAUTHORIZED);

      }

      if (String(user.id) !== req.params.id) {
        throw new HttpException('Unauthorized user', HttpStatus.FORBIDDEN);

      }

      return true;
    }

    return verify(token, this.jwtService);
  }
}
