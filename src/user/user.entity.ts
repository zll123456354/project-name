import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ select: false }) // 查询时默认不携带密码，保障安全
  password: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  age: number;
}
