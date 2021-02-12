import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  OneToMany
} from 'typeorm';
import { UserInterface } from './user.interface';
import {EventEntity} from "../Event/event.entity";

@Entity('users')
@Unique(['email'])
export class UserEntity extends BaseEntity implements UserInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(type => EventEntity, event => event.user)
  events: EventEntity[];

  @Column('text')
  email: string;

  @Column('text')
  password: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  token: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
}
