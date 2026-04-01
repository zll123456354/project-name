import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    UserModule, // 导入用户模块以访问 UserService
    PassportModule, // 导入 Passport 模块支持认证
    JwtModule.register({
      // 秘钥，通常应该放在环境变量中（.env）
      secret: 'secretKey_trae',
      // Token 过期时间，比如 1 小时
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService], // 导出以备后续其他模块使用
})
export class AuthModule {}
