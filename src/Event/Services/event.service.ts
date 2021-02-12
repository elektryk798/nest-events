import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEntity } from '../event.entity';
import { EventRepository } from '../Repositories/event.repository';
import { IPaginationOptions, Pagination } from "nestjs-typeorm-paginate";
import * as moment from 'moment';
import { EventDTO } from '../DTO/event.dto';

@Injectable()
export class EventService {
    constructor(
        @InjectRepository(EventRepository)
        private readonly events: EventRepository
    ) {}

    async getOneById(id: string): Promise<EventEntity | null> {
        return this.events.findOne({id: id}, {relations: ['user']});
    }

    async getAllPaginated(paginationOptions: IPaginationOptions, userId: string, filter: string): Promise<Pagination<EventEntity>> {
        let dateFilter: Date;

        switch (filter) {
            case 'day':
                dateFilter = new Date(moment().add(1, "days").format("YYYY-MM-DD"));
                break;
            case 'week':
                dateFilter = new Date(moment().add(7, "days").format("YYYY-MM-DD"));
                break;
            case 'month':
                dateFilter = new Date(moment().add(1, "months").format("YYYY-MM-DD"));
                break;
            default:
                dateFilter = undefined;
                break;
        }

        return this.events.paginate(paginationOptions, userId, dateFilter);
    }

    async getAll(userId: string): Promise<Array<EventEntity>> {
        return this.events.find({user: {id: userId}});
    }

    async update(eventData: EventDTO, event: EventEntity): Promise<EventEntity> {
        const eventToUpdate = {...event, ...eventData};

        await this.events.save(eventToUpdate);

        return await this.events.findOne({id: event.id})
    }

    async create(eventData: EventDTO, userId: string): Promise<EventEntity> {
        const event = this.events.create({...eventData, user: {id: userId}});

        await this.events.save(event);

        return event;
    }

    async delete(event: EventEntity): Promise<void> {
        await this.events.delete({id: event.id});
    }
}
