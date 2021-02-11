import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    BaseEntity
} from 'typeorm';
import {UserEntity} from "../User/user.entity";
import { EventInterface } from "./event.interface";

@Entity('events')
export class EventEntity extends BaseEntity implements EventInterface{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(type => UserEntity, user => user.events)
    user: UserEntity;

    @Column('timestamp')
    start: Date;

    @Column('timestamp')
    end: Date;

    @Column('text')
    description: string;

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
