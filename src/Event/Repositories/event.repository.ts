import { Repository, EntityRepository } from 'typeorm';
import { EventEntity } from '../event.entity';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';

@EntityRepository(EventEntity)
export class EventRepository extends Repository<EventEntity> {
    public async paginate(options: IPaginationOptions, userId: string, startDate?: Date): Promise<Pagination<EventEntity>> {
        const query = this.createQueryBuilder('events');

        query.where('events.userId = :userId', {userId: userId});

        if (startDate) {
            query.where('events.start > :startDate', {startDate: startDate});
        }

        query.orderBy('events.createdAt', 'DESC');

        return paginate<EventEntity>(query, options);
    }
}
