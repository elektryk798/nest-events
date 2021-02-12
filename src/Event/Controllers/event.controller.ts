import {
    Controller,
    Get,
    Put,
    Post,
    Delete,
    Request,
    Body,
    Query,
    Param,
    ParseUUIDPipe,
    UseGuards,
    BadRequestException,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import { EventService } from '../Services/event.service';
import { JwtAuthGuard } from '../../User/Passport/Guards/jwt-auth.guard';
import { Pagination } from 'nestjs-typeorm-paginate';
import { EventEntity } from '../event.entity';
import { EventDTO } from '../DTO/event.dto';
import {EventPaginateDTO} from "../DTO/event-paginate.dto";

@Controller('api/events')
export class EventController {
    constructor(private readonly eventService: EventService) {}

    @UseGuards(JwtAuthGuard)
    @UsePipes(ValidationPipe)
    @Post()
    async create(@Body() createDTO: EventDTO, @Request() req): Promise<EventEntity> {
        if (createDTO.start > createDTO.end) {
            throw new BadRequestException();
        }

        return await this.eventService.create(createDTO, req.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async list(@Request() req): Promise<EventEntity[]> {
        return await this.eventService.getAll(req.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @UsePipes(ValidationPipe)
    @Get('/list')
    async paginatedList(@Request() req, @Query() paginateDTO: EventPaginateDTO): Promise<Pagination<EventEntity>> {
        const paginationOptions = {page: paginateDTO.page ?? 1, limit: paginateDTO.limit ?? 10};

        return await this.eventService.getAllPaginated(paginationOptions, req.user.id, paginateDTO.filter);
    }

    @UseGuards(JwtAuthGuard)
    @UsePipes(ValidationPipe)
    @Put('/:id')
    async update(@Body() updateDTO: EventDTO, @Param('id', new ParseUUIDPipe()) id: string, @Request() req): Promise<EventEntity> {
        const event = await this.eventService.getOneById(id);

        const eventValidUser = event.user.id === req.user.id;

        const eventValidDates = updateDTO.start < updateDTO.end;

        if (!event || !eventValidUser || !eventValidDates) {
            throw new BadRequestException();
        }

        return await this.eventService.update(updateDTO, event);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    async getOne(@Param('id', new ParseUUIDPipe()) id: string, @Request() req): Promise<EventEntity> {
        const event = await this.eventService.getOneById(id);

        if (!event || !(event.user.id === req.user.id)) {
            throw new BadRequestException();
        }

        return event;
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/:id')
    async delete(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
        const event = await this.eventService.getOneById(id);

        if (!event) {
            throw new BadRequestException();
        }

        await this.eventService.delete(event);
    }
}
