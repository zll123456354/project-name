import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  // 验证用户身份
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByUsername(username);

    if (user) {
      // 学习点：使用 bcrypt.compare 将前端传入的明文密码 pass
      // 与数据库中存储的哈希哈希值 user.password 进行安全比对
      const isMatch = await bcrypt.compare(pass, user.password);

      if (isMatch) {
        // 比对成功，将密码字段从结果中剔除后返回
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }

  // 生成 JWT Token
  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
