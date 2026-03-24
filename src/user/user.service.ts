import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './user.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  create() {
    const user = this.userRepo.create({ name: '张三', age: 18 })
    return this.userRepo.save(user)
  }

  findAll() {
    return this.userRepo.find()
  }
}