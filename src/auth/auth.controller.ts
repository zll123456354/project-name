import { Controller, Post, UseGuards, Request, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // 登录接口：使用 LocalAuthGuard 守卫
  // 如果用户名密码验证通过，则调用 authService.login 签发 JWT
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  // 受保护的个人信息接口：使用 JwtAuthGuard 守卫
  // 只有携带有效 JWT 的请求才能通过，并能获取到 req.user
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
