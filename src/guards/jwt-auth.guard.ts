import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException({
        message: 'You are not registered!',
      });
    }
    const bearer = authHeader.split(' ')[0];
    const token = authHeader.split(' ')[1];
    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException({
        message: 'You are not registered!',
      });
    }

    let user: any;
    try {
      user = this.jwtService.verify(token);
    } catch (error) {
      throw new UnauthorizedException({
        message: 'You are not registered!',
      });
    }

    req.user = user;
    return true;
  }
}
