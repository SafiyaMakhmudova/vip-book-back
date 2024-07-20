import {
  ExecutionContext,
  HttpException,
  HttpStatus,
  createParamDecorator,
} from '@nestjs/common';

export const CookieGetter = createParamDecorator(
  (data: string, context: ExecutionContext): string => {
    const request = context.switchToHttp().getRequest();
    console.log("Cookies:", request.cookies); // Barcha cookies-ning ro'yxatini ko'rsating
    const refreshToken = request.cookies[data];
    console.log("Refresh Token:", refreshToken);
    
    if (!refreshToken) {
      throw new HttpException('Token is not found', HttpStatus.UNAUTHORIZED);
    }
    return refreshToken;
  },
);

