import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // 从请求头的 Authorization: Bearer <token> 中提取 JWT
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // 这里的秘钥应与 AuthModule 中配置的一致
      secretOrKey: 'secretKey_trae', 
      // 是否忽略过期时间
      ignoreExpiration: false,
    });
  }

  // 这是 JWT 认证策略的核心
  // 验证成功后，Passport 会把这个 payload 返回给 Request 对象（req.user）
  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
