import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async create() {
    // 学习点：在存储到数据库前，必须对明文密码进行哈希处理
    const saltOrRounds = 10;
    const password = 'password123';
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);

    const user = this.userRepo.create({
      username: 'admin' + Math.floor(Math.random() * 100),
      password: hashedPassword,
      name: '张三',
      age: 18,
    });
    return this.userRepo.save(user);
  }

  findAll() {
    return this.userRepo.find();
  }

  // 认证时使用：通过用户名查找用户
  findOneByUsername(username: string) {
    return this.userRepo.findOne({
      where: { username },
      select: ['id', 'username', 'password'], // 这里必须显式 select password，因为实体里设置了 select: false
    });
  }
}
