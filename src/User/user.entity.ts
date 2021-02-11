import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('users')
@Unique(['email'])
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  email: string;

  @Column('text')
  password: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;
}
