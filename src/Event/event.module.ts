import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventService} from './Services/event.service';
import { EventRepository } from './Repositories/event.repository';
import { EventController } from './Controllers/event.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([EventRepository]),
    ],
    providers: [EventService],
    controllers: [EventController],
    exports: [EventService],
})
export class EventModule {}
